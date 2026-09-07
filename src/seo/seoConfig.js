// Central SEO and Brand Configuration for PENTA PRIZM
export const SEO_CONFIG = {
  siteName: 'Penta Prizm',
  alternateNames: [
    'Penta Prizm Official',
    'PENTA PRIZM',
    'pentaprizm',
    'pentaprizm.in',
    'Penta-Prizm',
    'Penta Prizm Studio',
  ],
  siteUrl: 'https://pentaprizm.in',
  defaultTitle: 'Penta Prizm | Official Website | Branding, Tech & Digital Studio',
  titleTemplate: '%s | Penta Prizm',
  defaultDescription:
    'Official website of Penta Prizm. We are a creative and technology-driven studio in Kochi, Kerala specializing in branding, content creation, 4K video production, web development, app development, and digital marketing.',
  defaultKeywords:
    'Penta Prizm, Penta Prizm Official, PENTA PRIZM, pentaprizm, pentaprizm.in, Penta Prizm Kochi, Penta Prizm Kerala, branding agency Kochi, video production Kerala, web development Kochi, digital marketing agency Kochi, creative tech studio',
  defaultImage: 'https://pentaprizm.in/Hero.png',
  locale: 'en_IN',
  twitterHandle: '@pentaprizm',
  
  // Real business contact information
  business: {
    name: 'Penta Prizm',
    legalName: 'Penta Prizm Studio',
    telephone: '+917306043445',
    email: 'pentaprizmofficial@gmail.com',
    whatsapp: 'https://wa.me/+917306043445',
    address: {
      streetAddress: 'Kaloor',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682017',
      addressCountry: 'IN',
    },
    geo: {
      latitude: '9.9984',
      longitude: '76.2929',
    },
    openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
    priceRange: '$$',
  },

  socialProfiles: [
    'https://www.instagram.com/penta_prizm/',
    'https://www.facebook.com/profile.php?id=61594139094021&mibextid=LQQzGN',
    'https://www.linkedin.com/company/penta-prizm/',
  ],

  // Google Search Console & Google Analytics (GA4) configuration
  verification: {
    googleSiteVerification: import.meta.env?.VITE_GSC_VERIFICATION || '',
    bingSiteVerification: import.meta.env?.VITE_BING_VERIFICATION || '',
  },
  analytics: {
    gaMeasurementId: import.meta.env?.VITE_GA_MEASUREMENT_ID || '',
  },
};
