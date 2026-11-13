export const process = [
  ['Discover', 'We learn how your business works and where it is held back.'],
  ['Strategise', 'We define scope, priorities and the right technical approach.'],
  ['Design', 'We shape the experience before any code is written.'],
  ['Engineer', 'We build with maintainable, tested, purposeful code.'],
  ['Deploy', 'We launch securely and verify everything in production.'],
  ['Support', 'We maintain and improve what we deliver over time.'],
] as const
export const principles = [
  ['Business-first thinking', 'Every decision starts from the problem your business needs solved.', 'Target'],
  ['Purposeful engineering', 'We build what is needed, and nothing that is only there for show.', 'Wrench'],
  ['Practical digital solutions', 'Technology your team can use, run and grow with.', 'Compass'],
  ['Quality-focused delivery', 'Careful design, review and testing before anything ships.', 'Eye'],
  ['Long-term technology thinking', 'Foundations chosen to last, not to impress for a quarter.', 'Rocket'],
] as const
export const faqs = [
  ['What kind of businesses do you work with?', 'Businesses, institutions, entrepreneurs and organisations of different sizes. We are based in Kenya and East Africa and serve clients globally.'],
  ['Can you build something custom, or only websites?', 'Both. We build corporate and e-commerce websites as well as custom software, web applications, mobile apps and integrations.'],
  ['How does a project start?', 'You send an enquiry through the contact page or WhatsApp. We then discuss your goals, scope and timeline, and propose an approach before any work begins.'],
  ['How is pricing decided?', 'Pricing depends on scope. The contact form lets you choose an estimated budget range in USD, or tell us it is not yet determined, and we respond with a considered proposal.'],
  ['Do you provide support after launch?', 'Yes. Support is the last step of our process, and we offer maintenance and hosting care under Cloud & Infrastructure.'],
  ['Who owns the finished work?', 'Ownership, licences and handover are agreed in writing at the start of each project.'],
  ['Do you work with healthcare organisations?', 'We build healthcare websites, booking platforms and patient-facing tools. Regulated medical systems need specialist compliance, which we handle with qualified partners.'],
  ['How do I contact you quickly?', 'Message us on WhatsApp at +254 115 082 284 or email levymukolwe9@gmail.com.'],
] as const
export const about = {
  mission: 'To help businesses operate smarter, compete effectively and grow through well-engineered digital solutions.',
  vision: 'To be a technology partner that organisations anywhere trust to build what moves them forward.',
  values: [['Clarity', 'Plain language, honest scope and no surprises.'], ['Craft', 'Careful design and engineering that holds up over time.'], ['Integrity', 'We claim only what we can deliver.'], ['Partnership', 'We work alongside your team, not around it.']],
  philosophy: 'We believe technology earns its place only when it solves a real business problem. We prefer simple, dependable systems over impressive ones, and we are open about what we can deliver ourselves and where specialist partners are the better choice.',
  founder: { name: 'Levy Makomere', role: 'Founder & Technology Lead', bio: 'Levy leads technology at LOOK AFRICA TECHNOLOGY, overseeing how products are designed, engineered and delivered for clients. A fuller biography will be added here.' },
}
export const legal = {
  privacy: { title: 'Privacy Policy', sections: [
    ['Who we are', 'This website is operated by LOOK AFRICA TECHNOLOGY, the technology division of LOOK AFRICA GROUP LIMITED. Contact: levymukolwe9@gmail.com.'],
    ['What we collect', 'When you send an enquiry we collect the details you enter: name, organisation, email, country, service interest, project description, budget range, timeline and preferred contact method. We do not collect payment details through this website.'],
    ['How we use it', 'We use your enquiry only to respond to you and to discuss your project. We do not sell your information.'],
    ['Where it is stored', 'Enquiries are stored in Google Firebase Firestore, accessible only to authorised staff. Messages you send by WhatsApp or email are handled through those services.'],
    ['Retention and your rights', 'We keep enquiries only as long as needed to respond and follow up. You may ask us to access, correct or delete your information by emailing us.'],
    ['Changes', 'We may update this policy. The latest version will always be on this page.'],
  ] },
  terms: { title: 'Terms of Service', sections: [
    ['Using this website', 'This website provides information about LOOK AFRICA TECHNOLOGY and lets you send enquiries. Please use it lawfully and do not attempt to disrupt it.'],
    ['Services', 'Content on this website is general information, not an offer. Services are provided under a written agreement or proposal agreed for each project.'],
    ['Intellectual property', 'The content and design of this website belong to LOOK AFRICA TECHNOLOGY or its licensors. Ownership of project deliverables is set out in each project agreement.'],
    ['Liability', 'We aim to keep information accurate but provide this website as is, without warranties to the extent permitted by law.'],
    ['Contact', 'Questions about these terms can be sent to levymukolwe9@gmail.com.'],
  ] },
}

import type { IconName } from '../lib/icons'
export const processMeta: { icon: IconName; gets: string[] }[] = [
  { icon: 'Compass', gets: ['A conversation about your goals, users and constraints', 'A review of your existing site, tools and data', 'A shared definition of the problem to solve'] },
  { icon: 'Target', gets: ['Agreed scope, priorities and timeline', 'A recommended technical approach', 'A clear estimate and next steps'] },
  { icon: 'PenTool', gets: ['Wireframes and screen flows', 'Visual design for the key screens', 'Your feedback built in before development'] },
  { icon: 'Code2', gets: ['Working software delivered in stages', 'Code review and testing as we go', 'Regular progress you can see and try'] },
  { icon: 'Rocket', gets: ['A secure launch on reliable hosting', 'Domain, SSL and analytics configured', 'Post-launch checks in production'] },
  { icon: 'Wrench', gets: ['Maintenance, updates and fixes', 'Performance and security review', 'A route for the next improvements'] },
]
