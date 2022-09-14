import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILoading } from '../../interface/interface';

const initialState: ILoading = {
  loading: false,
};

const loadingSlice = createSlice({
  name: 'loadingSlice',
  initialState,
  reducers: {
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { changeLoading } = loadingSlice.actions;

export default loadingSlice.reducer;
