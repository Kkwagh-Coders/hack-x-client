import { User } from './user.types';

export type Item = {
  itemId: string;
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

type ActionType = 'Update';

export type InventoryLog = {
  logId: string;
  userId: string;
  user: User;
  oldItem: Item;
  newItem: Item;
  createdAt: string;
  action: ActionType;
};
