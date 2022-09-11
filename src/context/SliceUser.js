import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const SliceUser = createSlice({
  name: 'list',
  initialState,
  reducers: {
    addUserData: (state, {payload}) => {
      state.list = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {addUserData, checkUser} = SliceUser.actions;
export const getAllData = state => state.list.list;
export default SliceUser.reducer;
