import axios from 'axios';
import { User, UserCreateForm } from '../types/user.types';
import fakeRequest from './fakeRequest';
import { BASE_API_URL } from './serverConfig';

export const getUsers = (
  pageNumber: number,
  search: string,
  sortBy: string | null,
) => {
  const limit = 10;
  let sort = 'name';
  let type = 1;
  if (sortBy) {
    sort = sortBy[0] === '-' ? sortBy?.substring(1) : sortBy;
    type = sortBy[0] === '-' ? -1 : 1;
  }

  const url = new URL(`${BASE_API_URL}/user/all`);
  url.searchParams.set('search', search);
  url.searchParams.set('page', pageNumber.toString());
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('sortBy', sort);
  url.searchParams.set('type', type.toString());

  type ResponseType = {
    message: string;
    data: User[];
    page: { previousPage: number; nextPage: number };
  };

  return axios
    .get<ResponseType>(url.href, { withCredentials: true })
    .then((res) => res.data.data);
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

export const createUser = (user: UserCreateForm) => {
  const url = `${BASE_API_URL}/user/register`;
  return axios
    .post<{ message: string }>(url, user, { withCredentials: true })
    .then((response) => response.data);
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
