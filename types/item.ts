export default interface ItemDetails {
  name: string;
  price: number;
  description: string;
  image: string;
  nameCategory: string;
  nameMenu: string;
  imageMenu: string;
  id?: string;
}

export interface Item {
  name: string;
  price: number;
  description: string;
  image: string;
  rating?: number;
  category: string;
  menu: string;
  id?: string;
  createdAt?: string;
  updatedAt?: string;
}
