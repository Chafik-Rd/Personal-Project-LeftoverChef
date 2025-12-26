// All roles
export const USER_ROLES = ["user", "admin"] as const;

// Create type from array
export type UserRoles = (typeof USER_ROLES)[number];

// Type for login
export interface loginType {
  email: string;
  password: string;
}

// Type for register
export interface registerType extends loginType {
  firstName: string;
  lastName: string;
  role?: UserRoles;
}
