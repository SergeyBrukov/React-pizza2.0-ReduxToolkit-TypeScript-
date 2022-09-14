import { configureStore } from '@reduxjs/toolkit';
import filterSlice from '../reducer/filterSlice';
import cartSlice from '../reducer/cartSlice';
import pizzasSlice from '../reducer/pizzasSlice';
import fetchPizzaDetail from '../reducer/pizzaDetailSlice';
import loadingSlice from '../reducer/loadingSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
    pizzasSlice,
    fetchPizzaDetail,
    loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
