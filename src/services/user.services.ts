import axios from 'axios';
import { User, UserReduxState } from '../types/user.types';
import { BASE_API_URL } from './serverConfig';

// TODO: Routes

export const getUserStatus = () => {
  const url = `${BASE_API_URL}/user/status`;
  return {
    isLoading: false,
    isLoggedIn: false,
    user: null,
  };

  return axios
    .get<UserReduxState>(url, { withCredentials: true })
    .then((response) => response.data);
};

export const registerUser = (user: User) => {
  const url = `${BASE_API_URL}/user/register`;
  return { message: 'register' };

  return axios
    .post<{ message: string }>(url, user, { withCredentials: true })
    .then((response) => response.data);
};

export const loginUser = (email: string, password: string) => {
  const url = `${BASE_API_URL}/user/login`;
  const user = { email, password };
  return { message: 'register' };

  return axios
    .post<{ message: string }>(url, user, { withCredentials: true })
    .then((response) => response.data);
};

export const logoutUser = () => {
  const url = `${BASE_API_URL}/user/logout`;
  return { message: 'register' };

  return axios.post<{ message: string }>(url, {}, { withCredentials: true });
};

export const sendForgotPasswordMail = (email: string) => {
  const url = `${BASE_API_URL}/user/forgot-password`;
  const body = { email };
  return { message: 'register' };

  return axios
    .post<{ message: string }>(url, body, { withCredentials: true })
    .then((response) => response.data);
};

export const resetUserPassword = (
  email: string,
  newPassword: string,
  token: string,
) => {
  const url = `${BASE_API_URL}/user/reset-password/${token}`;
  const body = { email, newPassword };
  return { message: 'register' };

  return axios
    .post<{ message: string }>(url, body)
    .then((response) => response.data);
};
