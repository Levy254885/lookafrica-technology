export type Client = { name: string; logo?: string; url?: string; domain?: string; note?: string; dark?: boolean }
// Add clients you have worked with AND have permission to show.
// 1. Put the logo in public/images/clients/ (PNG, SVG or WebP).
// 2. Add an entry below. Set dark: true if the logo has a black background.
export const clients: Client[] = [
  { name: 'Trendspot', logo: '/images/clients/trendspot.webp', url: 'https://trendspot.co.ke', domain: 'trendspot.co.ke', note: 'News website' },
  { name: 'Executive Interior Design', logo: '/images/clients/executive-interior-design.webp', url: 'https://executiveinteriordesign.com', domain: 'executiveinteriordesign.com' },
  { name: 'Geitech Contractors', logo: '/images/clients/geitech-contractors.webp', url: 'https://geitechcontractors.co.ke', domain: 'geitechcontractors.co.ke' },
  { name: 'Property Masters', logo: '/images/clients/property-masters.webp', url: 'https://propertymasters.co.ke', domain: 'propertymasters.co.ke', dark: true },
  { name: 'Agritech Farmstead', logo: '/images/clients/agritech-farmstead.webp', url: 'https://agritechnology.co.ke', domain: 'agritechnology.co.ke' },
]
