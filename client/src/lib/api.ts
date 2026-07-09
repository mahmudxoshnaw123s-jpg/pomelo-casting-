export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message: string
}

export async function submitContact(payload: ContactPayload): Promise<ContactResponse> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  const data = (await res.json().catch(() => null)) as ContactResponse | null

  if (!res.ok || !data) {
    throw new Error(data?.message ?? 'Something went wrong. Please try again.')
  }

  return data
}

export interface ApplicationResponse {
  success: boolean
  message: string
}

export function submitApplication(formData: FormData, onProgress?: (percent: number) => void): Promise<ApplicationResponse> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open('POST', '/api/apply')

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100))
      }
    }

    xhr.onload = () => {
      let data: ApplicationResponse | null = null
      try {
        data = JSON.parse(xhr.responseText)
      } catch {
        data = null
      }
      if (xhr.status >= 200 && xhr.status < 300 && data) {
        resolve(data)
      } else {
        reject(new Error(data?.message ?? 'Something went wrong. Please try again.'))
      }
    }

    xhr.onerror = () => reject(new Error('Network error. Please check your connection and try again.'))

    xhr.send(formData)
  })
}
