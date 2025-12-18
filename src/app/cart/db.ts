import {Dexie, Table} from 'dexie';
import {CartItem} from './cart.model';


export class AppDB extends Dexie {
  cartItems!: Table<CartItem, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({todoItems: '++id'});
  }
}

export const db = new AppDB();
