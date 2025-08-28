import { Profile } from "@/types/user";

export const PERMISSIONS = {
  // Booking permissions
  BOOKING_VIEW_ALL: "booking:view:all",
  BOOKING_VIEW_OWN: "booking:view:own",
  BOOKING_CREATE: "booking:create",
  BOOKING_UPDATE: "booking:update",
  BOOKING_DELETE: "booking:delete",

  // User management permissions
  USER_VIEW_ALL: "user:view:all",
  USER_VIEW_OWN: "user:view:own",
  USER_CREATE: "user:create",
  USER_UPDATE: "user:update",
  USER_DELETE: "user:delete",

  // Content management permissions
  CONTENT_VIEW: "content:view",
  CONTENT_CREATE: "content:create",
  CONTENT_UPDATE: "content:update",
  CONTENT_DELETE: "content:delete",
  CONTENT_PUBLISH: "content:publish",

  // Horoscope permissions
  HOROSCOPE_VIEW: "horoscope:view",
  HOROSCOPE_CREATE: "horoscope:create",
  HOROSCOPE_UPDATE: "horoscope:update",
  HOROSCOPE_DELETE: "horoscope:delete",
  HOROSCOPE_PUBLISH: "horoscope:publish",

  // Service management permissions
  SERVICE_VIEW: "service:view",
  SERVICE_CREATE: "service:create",
  SERVICE_UPDATE: "service:update",
  SERVICE_DELETE: "service:delete",

  // Analytics permissions
  ANALYTICS_VIEW: "analytics:view",
  REPORTS_VIEW: "reports:view",
} as const;

export const ROLE_PERMISSIONS = {
  client: [
    PERMISSIONS.BOOKING_VIEW_OWN,
    PERMISSIONS.BOOKING_CREATE,
    PERMISSIONS.USER_VIEW_OWN,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.HOROSCOPE_VIEW,
    PERMISSIONS.SERVICE_VIEW,
  ],
  astrologer: [
    PERMISSIONS.BOOKING_VIEW_ALL,
    PERMISSIONS.BOOKING_UPDATE,
    PERMISSIONS.USER_VIEW_ALL,
    PERMISSIONS.CONTENT_VIEW,
    PERMISSIONS.CONTENT_CREATE,
    PERMISSIONS.CONTENT_UPDATE,
    PERMISSIONS.CONTENT_PUBLISH,
    PERMISSIONS.HOROSCOPE_VIEW,
    PERMISSIONS.HOROSCOPE_CREATE,
    PERMISSIONS.HOROSCOPE_UPDATE,
    PERMISSIONS.HOROSCOPE_PUBLISH,
    PERMISSIONS.SERVICE_VIEW,
    PERMISSIONS.ANALYTICS_VIEW,
  ],
  admin: [
    // Admin has all permissions
    ...Object.values(PERMISSIONS),
  ],
} as const;

export function hasPermission(userRole: string, permission: string): boolean {
  const rolePermissions =
    ROLE_PERMISSIONS[userRole as keyof typeof ROLE_PERMISSIONS];
  return rolePermissions?.includes(permission as any) || false;
}

export function canAccessResource(
  profile: Profile | null,
  permission: string
): boolean {
  if (!profile) return false;
  return hasPermission(profile.role, permission);
}

export function getUserPermissions(role: string): readonly string[] {
  return ROLE_PERMISSIONS[role as keyof typeof ROLE_PERMISSIONS] || [];
}
