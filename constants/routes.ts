export const ROUTES = {
  HOME: '/',
  BOOKING: '/booking',
  BLOG: '/blog',
  CONTACT: '/contact',
  ADMIN: '/admin',
  SERVICES: {
    BASE: '/services',
    KUNDALI: '/services/kundali',
    MARRIAGE: '/services/marriage',
    CAREER: '/services/career',
    HEALTH: '/services/health'
  },
  API: {
    SERVICES: '/api/services',
    BOOKINGS: '/api/bookings',
    CONTACTS: '/api/contacts',
    BLOG: '/api/blog',
    UPLOAD: '/api/upload'
  }
} as const;