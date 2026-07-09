import nodemailer from 'nodemailer'
import { env } from '../config/env'
import type { ContactPayload } from '../types/contact'
import type { ApplicationAttachment, ApplicationPayload } from '../types/application'

const hasSmtpConfig = Boolean(env.smtp.host && env.smtp.user && env.smtp.pass)

const transporter = hasSmtpConfig
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    })
  : null

export async function sendContactNotification(payload: ContactPayload): Promise<void> {
  if (!transporter) {
    console.info('[mailer] SMTP not configured — logging contact submission instead:', payload)
    return
  }

  await transporter.sendMail({
    from: `"Pomelo Casting Website" <${env.smtp.user}>`,
    to: env.contactRecipient,
    replyTo: payload.email,
    subject: `[Website] ${payload.subject} — ${payload.name}`,
    text: [
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      `Subject: ${payload.subject}`,
      '',
      payload.message,
    ]
      .filter(Boolean)
      .join('\n'),
  })
}

export async function sendApplicationNotification(payload: ApplicationPayload, photos: ApplicationAttachment[]): Promise<void> {
  if (!transporter) {
    console.info('[mailer] SMTP not configured — logging model application instead:', payload, `${photos.length} photo(s)`)
    return
  }

  await transporter.sendMail({
    from: `"Pomelo Casting Website" <${env.smtp.user}>`,
    to: env.contactRecipient,
    replyTo: payload.email || undefined,
    subject: `[Model Application] ${payload.fullName}`,
    text: [
      `Full name: ${payload.fullName}`,
      `Age: ${payload.age}`,
      `Phone: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : null,
      `Height: ${payload.height}`,
      `Weight: ${payload.weight}`,
      `Hair color: ${payload.hairColor}`,
      `Eye color: ${payload.eyeColor}`,
      `Shoe size: ${payload.shoeSize}`,
      `Shirt size: ${payload.shirtSize}`,
      `Languages spoken: ${payload.languages}`,
      '',
      `${photos.length} photo(s) attached.`,
    ]
      .filter(Boolean)
      .join('\n'),
    attachments: photos.map((p) => ({ filename: p.filename, content: p.content, contentType: p.contentType })),
  })
}
