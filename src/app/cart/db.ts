import {Dexie, Table} from 'dexie';
import {CartItem} from './cart.model';


export class AppDB extends Dexie {
  cartItems!: Table<CartItem, number>;

  constructor() {
    super('CartDB');
    this.version(3).stores({cartItems: '++id'});
  }
}

export const db = new AppDB();
