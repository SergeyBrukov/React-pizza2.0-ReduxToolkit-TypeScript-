import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { EStatusLoading } from '../../enums/enums';
import { IPizza } from '../../interface/interface';
import { MAIN_API } from '../../utils/api';

// type IFetchPizzas = {
//   [key: string]: string;
// };
type IFetchPizzas = Record<string, string>;

interface TInitialState {
  pizzas: IPizza[];
  status: EStatusLoading;
}

export const fetchPizzas = createAsyncThunk<IPizza[], IFetchPizzas>(
  'pizzasSlice/fetchPizzas',
  async ({ order, category, search, pagePagination, sortParams }, thunkAPI) => {
    const { data } = await axios.get<IPizza[]>(
      `${MAIN_API}${category}sortBy=${sortParams}&order=${order}${search}${pagePagination}`,
    );
    if (data.length === 0) {
      console.log('gggg');
      return thunkAPI.rejectWithValue('Ggg');
    }

    return data;
  },
);

const initialState: TInitialState = {
  pizzas: [],
  status: EStatusLoading.loading, // loading | success | error,
};

const pizzasSlice = createSlice({
  name: 'pizzasSlice',
  initialState,
  // reducers: {
  //   setPizzaItems: (state, action) => {
  //     state.pizzas = action.payload;
  //   },
  // },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = EStatusLoading.loading;
        state.pizzas = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<IPizza[]>) => {
        console.log(action.payload);
        state.pizzas = action.payload;
        state.status = EStatusLoading.success;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        console.log('error');
        state.status = EStatusLoading.error;
        state.pizzas = [];
      });
  },
  // extraReducers: {
  //   [fetchPizzas.pending.type]: (state) => {
  //     state.status = 'loading';
  //     state.pizzas = [];
  //   },
  //   [fetchPizzas.fulfilled.type]: (state, action: PayloadAction<IPizza[]>) => {
  //     console.log(action.payload);
  //     state.pizzas = action.payload;
  //     state.status = 'success';
  //   },
  //   [fetchPizzas.rejected.type]: (state) => {
  //     console.log('error');
  //     state.status = 'error';
  //     state.pizzas = [];
  //   },
  // },
});

// export const { setPizzaItems, testInput } = pizzasSlice.actions;

export default pizzasSlice.reducer;
