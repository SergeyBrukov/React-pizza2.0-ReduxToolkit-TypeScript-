export interface IRouteses {
  path: string;
  element: JSX.Element;
}

export interface ILoading {
  loading: boolean;
}

export interface IPizza {
  id: string;
  name: string;
  price: number;
  sizes: number[];
  types: number[];
  imageUrl: string;
}
// extends IPizza
export interface IBasketItem {
  count: number;
}

export interface ISortItem {
  name: string;
  sortProperty: string;
}

export interface IBasketItem {
  id: string;
  name: string;
  price: number;
  count: number;
  sizes: number;
  types: string;
  imageUrl: string;
}
