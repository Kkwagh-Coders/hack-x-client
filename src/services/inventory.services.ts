import axios from 'axios';
import {
  InventoryLog,
  Item,
  ItemCreateForm,
  ItemEditForm,
} from '../types/inventory.types';
import { User } from '../types/user.types';
import fakeRequest from './fakeRequest';
import { BASE_API_URL } from './serverConfig';

// TODO: Routes
const user: User = {
  _id: 'user2',
  firstName: 'user2',
  middleName: 'user2',
  lastName: 'user2',
  email: 'user2',
  designation: 'user2',
  department: 'user2',
  role: 'teacher',
};

const items: Item[] = [
  {
    itemId: 'name',
    name: 'name',
    description: 'name',
    working: 10,
    notWorking: 5,
    location: 'name',
    category: 'name',
    createdAt: 'name',
    updatedAt: 'name',
    expiry: 'name',
  },
];

const logItems: InventoryLog[] = [
  {
    logId: 'k',
    _id: 'name',
    user,
    oldItem: {
      itemId: 'name',
      name: 'name',
      description: 'name',
      working: 10,
      notWorking: 0,
      location: 'name',
      category: 'name',
      createdAt: 'name',
      updatedAt: 'name',
      expiry: 'name',
    },
    newItem: {
      itemId: 'name',
      name: 'name',
      description: 'name',
      working: 5,
      notWorking: 5,
      location: 'name',
      category: 'name',
      createdAt: 'name',
      updatedAt: 'name',
      expiry: 'name',
    },
    createdAt: 'name',
    action: 'updated',
  },
];

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
  console.log('Item');
  console.log(item, itemId);

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
    notWorking: 0,
    quantity: undefined,
  };

  return axios
    .post<{ message: string }>(url, data, { withCredentials: true })
    .then((response) => response.data);
};

export const getInventoryLog = (
  pageNumber: number,
  search: string,
  sortBy: string | null,
) => {
  console.log('Item');
  console.log(sortBy, search, pageNumber);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { logItems }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.logItems,
  ) as Promise<InventoryLog[]>;
};
