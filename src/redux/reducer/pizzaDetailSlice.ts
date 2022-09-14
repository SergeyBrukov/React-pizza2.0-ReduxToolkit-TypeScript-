import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { useAppDispatch } from '../../hooks';
import { IPizza } from '../../interface/interface';
import { MAIN_API } from '../../utils/api';
import { changeLoading } from './loadingSlice';

interface IPizzaDetails {
  pizza: IPizza | null;
  status: string;
}

const initialState: IPizzaDetails = {
  pizza: null,
  status: '',
};

type testFetchProp = {
  id: string;
};

export const pizzaFetchDetail = createAsyncThunk<IPizza, testFetchProp>(
  'pizzaDetail/pizzaFetchDetail',
  async ({ id }, thunkAPI) => {
    const { data } = await axios.get<IPizza>(`${MAIN_API}/${id}`);
    return data;
  },
);

const fetchPizzaDetail = createSlice({
  name: 'fetchPizzaDetail',
  initialState,
  reducers: {},
  extraReducers: {
    [pizzaFetchDetail.pending.type]: (state) => {},
    [pizzaFetchDetail.fulfilled.type]: (state, action: PayloadAction<IPizza>) => {
      state.pizza = action.payload;
    },
    [pizzaFetchDetail.rejected.type]: (state) => {
      state.status = 'error';
    },
  },
});

export default fetchPizzaDetail.reducer;
