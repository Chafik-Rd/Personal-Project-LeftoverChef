// Type for login
export interface loginType {
  email: string;
  password: string;
}

// Type for register
export interface registerType extends loginType {
  firstName: string;
  lastName: string;
//   role?: UserRoles;
}