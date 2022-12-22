import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  api: '',
};

export const SliceUser = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addUserData: (state, {payload}) => {
      state.list = payload;
    },
    addApiData: (state, {payload}) => {
      state.api = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUserData, addApiData, checkUser} = SliceUser.actions;
export const getAllData = state => state.list.list;
export const getApi = state => state.list.api;
export default SliceUser.reducer;
