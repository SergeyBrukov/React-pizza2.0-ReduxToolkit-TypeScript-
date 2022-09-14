import { IBasketItem } from '../interface/interface';

export const getBasketItemLS = () => {
  const storageBasket = localStorage.getItem('basket');
  if (storageBasket) {
    return {
      basketItem: JSON.parse(storageBasket),
      totalCount: JSON.parse(storageBasket).reduce((prev: IBasketItem, current: IBasketItem) => {
        return current.price * current.count + +prev;
      }, 0),
    };
  } else {
    return {
      basketItem: [],
      totalCount: 0,
    };
  }
};
