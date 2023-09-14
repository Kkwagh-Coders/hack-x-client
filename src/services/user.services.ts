import { User } from '../types/user.types';
import fakeRequest from './fakeRequest';
import { BASE_API_URL } from './serverConfig';

// TODO: Routes
const users: User[] = [
  {
    userId: 'user1',
    firstName: 'user1',
    middleName: 'user1',
    lastName: 'user1',
    email: 'user1',
    designation: 'user1',
    department: 'user1',
    role: 'Admin',
  },
  {
    userId: 'user2',
    firstName: 'user2',
    middleName: 'user2',
    lastName: 'user2',
    email: 'user2',
    designation: 'user2',
    department: 'user2',
    role: 'Teacher',
  },
  {
    userId: 'user3',
    firstName: 'user3',
    middleName: 'user3',
    lastName: 'user3',
    email: 'user3',
    designation: 'user3',
    department: 'user3',
    role: 'Staff',
  },
];

export const getUsers = (
  pageNumber: number,
  search: string,
  sortBy: string | null,
) => {
  console.log('User');
  console.log(sortBy, search, pageNumber);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { users }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.users,
  ) as Promise<User[]>;
};

export const deleteUser = (userId: string) => {
  console.log('User');
  console.log(userId);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { message: 'Deleted' }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.message,
  ) as Promise<string>;
};

export const editUser = (user: User) => {
  console.log('User');
  console.log(user);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { message: 'Edited' }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.message,
  ) as Promise<string>;
};
