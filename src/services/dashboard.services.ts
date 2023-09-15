import axios from 'axios';
import { CardData } from '../types/dashboard.types';
import { BASE_API_URL } from './serverConfig';

export const getCardData = () => {
  const url = `${BASE_API_URL}/user/count`;
  type ResponseType = {
    message: string;
    data: CardData;
  };

  return axios
    .get<ResponseType>(url, { withCredentials: true })
    .then((response) => response.data.data);
};

export default {};
