import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import i18n from '../../i18n';
import { DEFAULT_LANGUAGER } from '../../utils/const';
import { addProduct } from './cartSlice';

type TSort = {
  name: string;
  sortProperty: string;
};

interface IInitialStateFilter {
  categoryId: number;
  page: number;
  sort: TSort;
  searchValue: string;
  lang: string;
}

export const initialState: IInitialStateFilter = {
  categoryId: 0,
  page: 1,
  sort: { name: 'популярности (DESK)', sortProperty: 'rating' },
  searchValue: '',
  lang: DEFAULT_LANGUAGER,
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSort: (state, action: PayloadAction<TSort>) => {
      state.sort = action.payload;
    },
    setPagination: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setFilter: (state, action: PayloadAction<IInitialStateFilter>) => {
      console.log(action.payload);

      state.page = Number(action.payload.page);
      state.categoryId = Number(action.payload.categoryId);
      state.sort = action.payload.sort;
      state.searchValue = action.payload.searchValue;
    },
    setLocationTranskate: (state, action: PayloadAction<string>) => {
      i18n.changeLanguage(action.payload);
      state.lang = action.payload;
    },
  },
  // extraReducers: (builder) => {
  //   builder.addCase(addProduct, (state, action) => {
  //     console.log('state>>>', state);
  //     console.log('action>>>', action);
  //   });
  // },
  // extraReducers: {
  //   [addProduct.type]: (state, action) => {
  //     console.log('state>>>', state);
  //     console.log('action>>>', action);
  //   },
  // },
});

export const {
  setCategoryId,
  setSort,
  setPagination,
  setSearchValue,
  setFilter,
  setLocationTranskate,
} = filterSlice.actions;

export default filterSlice.reducer;
