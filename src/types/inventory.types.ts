import { User } from './user.types';

export type Item = {
  _id: string;
  name: string;
  description: string;
  working: number;
  notWorking: number;
  location: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  expiry: string;
};

export type ItemCreateForm = {
  name: string;
  description: string;
  quantity: number;
  location: string;
  category: string;
  expiry: string;
};

export type ItemEditForm = {
  notWorking: number;
};

type ActionType = 'created' | 'updated' | 'deleted';

export type InventoryLog = {
  _id: string;
  userId: User;
  oldItem: Item;
  newItem: Item;
  createdAt: string;
  action: ActionType;
};
