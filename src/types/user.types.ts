export type UserRole = 'Admin' | 'Teacher' | 'Staff';

export type User = {
  userId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  designation: string;
  department: string;
  role: UserRole;
};

export type UserReduxState = {
  isLoading: boolean;
  isLoggedIn: boolean;
  user: User | null;
};
