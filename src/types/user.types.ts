export type UserRole = 'admin' | 'teacher' | 'staff';

export type User = {
  _id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  designation: string;
  department: string;
  role: UserRole;
};

export type UserCreateForm = {
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
