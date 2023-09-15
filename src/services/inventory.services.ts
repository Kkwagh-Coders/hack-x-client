import { InventoryLog, Item, ItemCreateForm } from '../types/inventory.types';
import { User } from '../types/user.types';
import fakeRequest from './fakeRequest';
import { BASE_API_URL } from './serverConfig';

// TODO: Routes
const user: User = {
  userId: 'user2',
  firstName: 'user2',
  middleName: 'user2',
  lastName: 'user2',
  email: 'user2',
  designation: 'user2',
  department: 'user2',
  role: 'Teacher',
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
    userId: 'name',
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
  console.log('Item');
  console.log(sortBy, search, pageNumber);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { items }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.items,
  ) as Promise<Item[]>;
};

export const deleteItem = (itemId: string) => {
  console.log('Item');
  console.log(itemId);

  const url = `${BASE_API_URL}/user/status`;
  return fakeRequest({ url }, { message: 'Deleted' }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.message,
  ) as Promise<string>;
};

export const editItem = (item: Item) => {
  console.log('Item');
  console.log(item);

  const url = `${BASE_API_URL}/item/status`;
  return fakeRequest({ url }, { message: 'Edited' }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => response.data.message,
  ) as Promise<string>;
};

export const createItem = (item: ItemCreateForm) => {
  console.log('Item');
  console.log(item);

  const url = `${BASE_API_URL}/item/status`;
  return fakeRequest({ url }, { message: 'Created' }, false).then(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (response: any) => {
      return { message: response.data.message };
    },
  ) as Promise<{ message: string }>;
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
