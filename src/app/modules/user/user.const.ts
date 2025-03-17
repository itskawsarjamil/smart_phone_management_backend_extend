export const userSearchableFields = [
  'name.firstName',
  'name.lastName',
  'bio',
  'presentAddress',
  'permanentAddress',
];

export const USER_ROLE = {
  superAdmin: 'superAdmin',
  branchManager: 'branchManager',
  seller: 'seller',
} as const;

export const UserRole = ['superAdmin', 'branchManager', 'seller'];

export const UserStatus = ['in-progress', 'blocked'];
