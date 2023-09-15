import axios from 'axios';
import { Notification } from '../types/notification.types';
import { BASE_API_URL } from './serverConfig';

export const getUnreadNotification = () => {
  const url = `${BASE_API_URL}/notification/count`;
  return axios
    .get<{ data: number }>(url, { withCredentials: true })
    .then((res) => res.data.data);
};

export const getNotifications = () => {
  const url = `${BASE_API_URL}/notification/all`;
  return axios
    .get<{ data: Notification[] }>(url, { withCredentials: true })
    .then((res) => res.data.data);
};

export default {};
