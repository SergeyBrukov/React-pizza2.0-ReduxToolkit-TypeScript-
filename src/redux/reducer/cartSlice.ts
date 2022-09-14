import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { IBasketItem, IPizza } from '../../interface/interface';
import { getBasketItemLS } from '../../utils/getBasketItemLS';

interface IInitialState {
  totalCount: number;
  basketItem: IBasketItem[];
}

const storageBasket = getBasketItemLS();

const initialState: IInitialState = {
  totalCount: storageBasket.totalCount,
  basketItem: storageBasket.basketItem,
};

const addProductBasket = (state: IInitialState, action: IBasketItem) => {
  const findItem = state.basketItem.find((item) => item.id === action.id);

  if (findItem) {
    // return {
    //   ...findItem,
    //   count: findItem.count++,
    // };
    findItem.count++;
    // const newArr: IBasketItem[] = state.basketItem.map((item) => {
    //   if (item.id === action.id) {
    //     return {
    //       ...item,
    //       count: item.count++,
    //     };
    //   }
    //   return item;
    // });
    // state.basketItem = newArr;
  } else {
    state.basketItem.push({
      ...action,
      count: 1,
    });
  }
};

const removeProductBasket = (state: IInitialState, action: string) => {
  state.basketItem = state.basketItem.filter((item) => item.id !== action);
};

const minusCountItemHendler = (state: IInitialState, action: string) => {
  const findItem = state.basketItem.find((item) => item.id === action);
  if (findItem && findItem.count > 1) {
    findItem.count--;
  }
};

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IBasketItem>) => {
      addProductBasket(state, action.payload);
      state.totalCount = state.basketItem.reduce(
        (prev, current) => current.count * current.price + prev,
        0,
      );
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      removeProductBasket(state, action.payload);
      state.totalCount = state.basketItem.reduce((prev, current) => {
        return current.count * current.price + prev;
      }, 0);
    },
    clearProductBasket: (state) => {
      state.basketItem = [];
      state.totalCount = 0;
    },
    minusCountItem: (state, action: PayloadAction<string>) => {
      minusCountItemHendler(state, action.payload);
      state.totalCount = state.basketItem.reduce((prev, current) => {
        return current.count * current.price + prev;
      }, 0);
    },
  },
});

export const { addProduct, removeProduct, clearProductBasket, minusCountItem } = cartSlice.actions;

export default cartSlice.reducer;
