export const nav = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Insights', href: '#insights' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
]

export const hero = {
  eyebrow: 'Talent & Model Casting Agency',
  headlineLead: 'We find the',
  rotatingWords: ['faces', 'models', 'actors', 'creators'],
  headlineTail: 'behind the brand.',
  subhead:
    'Pomelo Casting connects brands, agencies, and productions with the right talent — models, actors, and creators who bring campaigns to life.',
  cta: 'Start casting',
}

export const marquee = ['Models', 'Actors', 'Creators', 'Talent', 'Editorial', 'Campaigns']

export const about = {
  label: 'About',
  heading: 'Casting with an eye for the right fit, not just the right face.',
  body: 'Pomelo Casting is a talent agency built around one idea: the right person makes the campaign. We work with brands, agencies, and production teams to source, vet, and place models, actors, and creators for shoots, campaigns, and productions of every scale.',
  stats: [
    { value: 250, suffix: '+', label: 'Talent placed' },
    { value: 8, suffix: '', label: 'Years casting' },
    { value: 60, suffix: '+', label: 'Brands served' },
  ],
}

export const services = {
  label: 'Services',
  heading: 'What we do',
  subhead: 'Four ways we get the right talent in front of the right camera.',
  items: [
    {
      title: 'Talent Casting',
      slug: 'talent-casting',
      icon: 'spotlight',
      description: 'Sourcing and vetting models, actors, and creators matched to your brief.',
      overview:
        'We start with your brief and dig into our roster and open network to build a shortlist that actually fits — not just headshots that photograph well, but people with the right energy, availability, and experience for the project.',
      workflow: [
        'Brief intake & scope call',
        'Roster + open-call sourcing',
        'Internal shortlist review',
        'Client shortlist delivery',
        'Callback coordination',
      ],
      deliverables: ['Curated talent shortlist with portfolios', 'Availability & rate confirmation', 'Callback scheduling support'],
      timeline: '3–7 business days',
      tools: ['Talent database', 'Digital portfolios', 'Video callback review'],
      relatedWork: ['New Faces Wanted'],
    },
    {
      title: 'Campaign & Editorial Casting',
      slug: 'campaign-editorial-casting',
      icon: 'hanger',
      description: 'Full casting management for fashion, ad, and commercial shoots.',
      overview:
        'For campaign and editorial work we manage casting end-to-end — briefing, sourcing, fittings, and being on-set as the point of contact for talent, so your creative team can focus on the shoot.',
      workflow: [
        'Creative brief alignment',
        'Look-book sourcing',
        'Client selection & approval',
        'Fittings & confirmations',
        'On-set talent coordination',
      ],
      deliverables: ['Look-matched shortlist', 'Fitting schedule', 'Signed talent releases', 'On-set support'],
      timeline: '1–2 weeks',
      tools: ['Mood-board matching', 'Digital contracts', 'Fitting logistics'],
      relatedWork: ['Editorial Feature'],
    },
    {
      title: 'Production Casting',
      slug: 'production-casting',
      icon: 'clapper',
      description: 'Talent placement for film, TV, and video productions.',
      overview:
        'From background talent to featured roles, we cast for film, TV, and branded video productions — coordinating auditions, tapes, and scheduling around your production timeline.',
      workflow: ['Role breakdown review', 'Audition tape collection', 'Director callback rounds', 'Contract & schedule lock'],
      deliverables: ['Audition tapes', 'Callback shortlist', 'Signed contracts', 'Production-ready schedule'],
      timeline: '2–4 weeks, depending on scope',
      tools: ['Self-tape review', 'Scheduling coordination', 'Contract management'],
      relatedWork: ['On Set'],
    },
    {
      title: 'Talent Management',
      slug: 'talent-management',
      icon: 'star',
      description: 'Ongoing representation and booking support for our roster.',
      overview:
        'For talent on our roster, we handle ongoing representation — surfacing the right opportunities, negotiating bookings, and managing the relationship with brands and productions over time.',
      workflow: ['Roster onboarding', 'Opportunity matching', 'Booking negotiation', 'Ongoing career support'],
      deliverables: ['Booking opportunities', 'Negotiated contracts', 'Career guidance'],
      timeline: 'Ongoing',
      tools: ['Roster management', 'Booking pipeline', 'Direct brand relationships'],
      relatedWork: ['Behind the Scenes'],
    },
  ],
}

export const work = {
  label: 'Work',
  heading: 'Selected work',
  items: [
    {
      title: 'New Faces Wanted',
      tag: 'Casting Call',
      description: 'An open call campaign inviting new talent to submit for upcoming projects.',
      image: 'work-casting-call.jpg',
    },
    {
      title: 'Editorial Feature',
      tag: 'Press',
      description: 'Pomelo Casting featured across print and digital editorial coverage.',
      image: 'work-press-feature.jpg',
    },
    {
      title: 'On Set',
      tag: 'Production',
      description: 'Behind the clapperboard on a Pomelo Casting production shoot.',
      image: 'work-on-set.jpg',
    },
    {
      title: 'Behind the Scenes',
      tag: 'Process',
      description: 'Contact sheets, mood boards, and coffee — a look at how we cast.',
      image: 'work-behind-scenes.jpg',
    },
  ],
}

export const contact = {
  label: 'Contact',
  heading: "Let's cast your next project.",
  subhead: "Tell us about your brief — we usually reply within 1 business day.",
  email: 'support@pomeloagency.com',
  phoneDisplay: '+964 750 765 7877',
  phoneHref: 'tel:+9647507657877',
  whatsappHref: 'https://wa.me/9647507657877',
  address: 'Ankawa, 120m Road, Erbil, Kurdistan Region, Iraq',
  mapPlaceName: 'Pomelo Agency',
  mapCoords: { lat: 36.2409381, lng: 43.9977745 },
  instagramHandle: '@pomelo.casting',
  instagramHref: 'https://www.instagram.com/pomelo.casting',
  hours: [
    { day: 'Saturday – Thursday', time: '9:00 AM – 5:00 PM' },
    { day: 'Friday', time: 'Closed' },
  ],
  subjects: ['Casting inquiry', 'Talent submission', 'Brand partnership', 'Press', 'Other'],
  faq: [
    {
      question: 'How do I apply as a model or actor?',
      answer:
        'Send us your details and a few recent photos through the contact form, or reach out on Instagram. Our team reviews every submission and follows up if there’s a fit for an upcoming project.',
    },
    {
      question: 'Do you charge talent to join your roster?',
      answer: 'No. Pomelo Casting never charges talent for representation, submissions, or castings.',
    },
    {
      question: 'How long does a typical casting take?',
      answer:
        'It depends on scope, but most campaign castings are completed within 1–2 weeks from brief to shortlist, faster for smaller productions.',
    },
    {
      question: 'Can brands request specific talent types?',
      answer:
        'Yes — tell us the look, age range, and vibe you need in your brief and we’ll put together a tailored shortlist from our roster and network.',
    },
    {
      question: 'Do you work outside Erbil?',
      answer:
        'Yes, we cast for productions and campaigns across the region and can coordinate travel for the right project.',
    },
  ],
}

export const insights = {
  label: 'Insights',
  heading: 'Stories from the studio',
  subhead: 'Casting tips, behind-the-scenes notes, and perspective from the Pomelo team.',
  featured: {
    title: 'What We Actually Look for in a Casting Call',
    excerpt:
      'Great casting isn’t about the most striking headshot — it’s about fit. Here’s how our directors evaluate submissions before a single audition happens.',
    category: 'Casting Tips',
    author: 'Pomelo Team',
    date: 'June 24, 2026',
    readTime: '6 min read',
    image: 'work-on-set.jpg',
  },
  posts: [
    {
      title: '5 Things to Prepare Before Your First Audition',
      excerpt: 'From wardrobe basics to how to walk into the room — small details that change how a casting director sees you.',
      category: 'For Talent',
      author: 'Layla Hassan',
      date: 'June 12, 2026',
      readTime: '4 min read',
      image: 'work-casting-call.jpg',
    },
    {
      title: 'Behind the Lens: Casting an Editorial Feature',
      excerpt: 'A look at how we sourced and shortlisted talent for a recent regional press feature, start to finish.',
      category: 'Behind the Scenes',
      author: 'Pomelo Team',
      date: 'May 28, 2026',
      readTime: '5 min read',
      image: 'work-press-feature.jpg',
    },
    {
      title: 'Why Authentic Casting Wins Campaigns',
      excerpt: 'Audiences can tell when a face doesn’t fit the brand. Here’s why we push brands toward authenticity over familiarity.',
      category: 'Industry',
      author: 'Ahmed Karim',
      date: 'May 14, 2026',
      readTime: '7 min read',
      image: 'hero-crosswalk-purple.jpg',
    },
    {
      title: 'Building a Portfolio That Actually Books Work',
      excerpt: 'What casting directors skip past, and what makes them stop scrolling. A practical guide for new talent.',
      category: 'For Talent',
      author: 'Layla Hassan',
      date: 'April 30, 2026',
      readTime: '5 min read',
      image: 'hero-crosswalk-blue.jpg',
    },
    {
      title: 'From Erbil Outward: Casting Across the Region',
      excerpt: 'How we coordinate multi-city castings and what brands should know before booking talent across borders.',
      category: 'Industry',
      author: 'Pomelo Team',
      date: 'April 9, 2026',
      readTime: '6 min read',
      image: 'work-behind-scenes.jpg',
    },
    {
      title: 'Inside Our Process: From Brief to Shortlist',
      excerpt: 'A transparent walk-through of what happens in the days between a client brief landing and a shortlist going out.',
      category: 'Process',
      author: 'Ahmed Karim',
      date: 'March 22, 2026',
      readTime: '4 min read',
      image: 'work-on-set.jpg',
    },
  ],
}

export const faqSection = {
  label: 'FAQ',
  heading: 'Common questions',
  subhead: 'Everything brands typically ask before starting a project with us.',
  items: [
    {
      category: 'Services',
      question: 'What services does Pomelo Casting offer?',
      answer:
        'We handle talent casting, campaign and editorial casting, production casting for film/TV/video, and ongoing talent management — see the Services section above for the full breakdown.',
    },
    {
      category: 'Getting started',
      question: 'How do we get started on a project?',
      answer:
        'Send us your brief through the contact form or WhatsApp. We’ll usually schedule a short call to understand the look, budget, and timeline before starting the search.',
    },
    {
      category: 'Pricing',
      question: 'How does pricing work?',
      answer:
        'Pricing depends on project scope — number of talent needed, usage rights, and production complexity. We provide a custom quote after reviewing your brief, with no hidden fees.',
    },
    {
      category: 'Timeline',
      question: 'How long does a typical project take?',
      answer:
        'Most campaign castings go from brief to shortlist within 1–2 weeks. Smaller productions can move faster, and we also support rush timelines when needed.',
    },
    {
      category: 'Timeline',
      question: 'Do you offer rush or expedited casting?',
      answer:
        'Yes. Tell us your deadline up front and we’ll let you know honestly whether it’s achievable and what a rushed timeline looks like for your brief.',
    },
    {
      category: 'Revisions',
      question: 'What if the shortlist isn’t quite right?',
      answer:
        'We’ll revise it based on your feedback at no extra cost. Tell us what’s missing — look, energy, experience level — and we’ll refine the options.',
    },
    {
      category: 'Support',
      question: 'What support do you provide after casting is finalized?',
      answer:
        'We stay involved through the shoot — handling scheduling, contracts, and any last-minute swaps — so you have one point of contact from brief to wrap.',
    },
    {
      category: 'Getting started',
      question: 'What should we include in our casting brief?',
      answer:
        'The more detail the better: project type, target look and age range, number of talent needed, shoot dates and location, and usage/budget expectations.',
    },
  ],
}

export const footer = {
  line: `© ${new Date().getUTCFullYear()} Pomelo Casting. All rights reserved.`,
}

export const featuredTalent = {
  label: 'Talent',
  heading: 'Faces ready for your next campaign.',
  subhead: 'A glimpse of the talent, editorial work, and studio energy behind every Pomelo casting.',
  images: [
    { image: 'talent-feature-press.png', caption: 'Press Day', tag: 'Campaign' },
    { image: 'talent-feature-cover.png', caption: 'Cover Story', tag: 'Editorial' },
    { image: 'talent-feature-walk.png', caption: 'Studio Walk', tag: 'Commercial' },
    { image: 'talent-feature-bts.png', caption: 'Behind the Scenes', tag: 'Studio' },
  ],
  showTalentCta: 'Show Talent',
  applyCta: 'Apply Now',
}

export const talentPage = {
  label: 'Talent',
  heading: 'The faces behind every campaign.',
  subhead: 'A curated look at the talent, editorial work, and studio energy Pomelo Casting brings to every brief.',
  gallery: [
    {
      id: 'campaign-press',
      image: 'talent-feature-press.png',
      title: 'Press Day',
      category: 'Campaign',
      description: 'On-brand press coverage, styled and cast for a national campaign push.',
    },
    {
      id: 'editorial-cover',
      image: 'talent-feature-cover.png',
      title: 'Cover Story',
      category: 'Editorial',
      description: 'Editorial styling for a cover feature, cast for tone and presence.',
    },
    {
      id: 'commercial-walk',
      image: 'talent-feature-walk.png',
      title: 'Studio Walk',
      category: 'Commercial',
      description: 'Commercial lookbook talent, cast for movement and confidence on camera.',
    },
    {
      id: 'studio-bts',
      image: 'talent-feature-bts.png',
      title: 'Behind the Scenes',
      category: 'Studio',
      description: 'A look inside the studio — how we direct and light every casting test.',
    },
  ],
  spotlight: {
    label: 'Inside the studio',
    heading: 'Every casting starts with a real studio session.',
    body: 'Before talent ever reaches a client shortlist, we run them through real studio conditions — lighting, direction, and camera presence — so what you see is what you get on set.',
    image: 'talent-feature-bts.png',
  },
  cta: {
    heading: 'See yourself here?',
    body: 'If you have the look and the presence, we want to see your submission.',
  },
}

export const application = {
  label: 'Apply',
  heading: 'Start your casting journey.',
  subhead: 'Tell us about yourself and share a few recent photos — our team reviews every submission personally.',
  hairColors: ['Black', 'Brown', 'Blonde', 'Red', 'Gray / Silver', 'Other'],
  eyeColors: ['Brown', 'Blue', 'Green', 'Hazel', 'Gray', 'Other'],
  shirtSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  success: {
    heading: 'Application received',
    body: "Thanks for applying — our casting team reviews every submission and will reach out if there's a fit.",
  },
}
