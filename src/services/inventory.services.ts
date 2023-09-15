import axios from 'axios';
import {
  InventoryLog,
  Item,
  ItemCreateForm,
  ItemEditForm,
} from '../types/inventory.types';
import { BASE_API_URL } from './serverConfig';

export const getInventory = (
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

  const url = new URL(`${BASE_API_URL}/item`);
  url.searchParams.set('search', search);
  url.searchParams.set('page', pageNumber.toString());
  url.searchParams.set('limit', limit.toString());
  url.searchParams.set('sortBy', sort);
  url.searchParams.set('type', type.toString());

  type ResponseType = {
    message: string;
    data: Item[];
    page: { previousPage: number; nextPage: number };
  };

  return axios
    .get<ResponseType>(url.href, { withCredentials: true })
    .then((res) => res.data.data);
};

export const deleteItem = (itemId: string) => {
  const url = `${BASE_API_URL}/item`;
  return axios
    .delete<{ message: string }>(url, {
      data: { itemId },
      withCredentials: true,
    })
    .then((response) => response.data.message);
};

export const editItem = (itemId: string, item: ItemEditForm) => {
  const url = `${BASE_API_URL}/item`;
  return axios
    .put<{ message: string }>(
      url,
      { ...item, itemId },
      { withCredentials: true },
    )
    .then((response) => response.data);
};

export const createItem = (item: ItemCreateForm) => {
  const url = `${BASE_API_URL}/item`;

  const data = {
    ...item,
    working: item.quantity,
    notWorking: item.quantity,
    quantity: undefined,
  };

  return axios
    .post<{ message: string }>(url, data, { withCredentials: true })
    .then((response) => response.data);
};

export const getInventoryLog = (pageNumber: number) => {
  const limit = 10;

  const url = new URL(`${BASE_API_URL}/item/logs`);
  url.searchParams.set('page', pageNumber.toString());
  url.searchParams.set('limit', limit.toString());

  type ResponseType = {
    message: string;
    data: InventoryLog[];
    page: { previousPage: number; nextPage: number };
  };

  return axios
    .get<ResponseType>(url.href, { withCredentials: true })
    .then((res) => res.data.data);
};
