import { Item } from '../types/inventory.types';
import fakeRequest from './fakeRequest';
import { BASE_API_URL } from './serverConfig';

// TODO: Routes
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
