import {configureStore} from '@reduxjs/toolkit';
import userReducer from './SliceUser';

export const FavoriteContext = configureStore({
  reducer: {
    list: userReducer,
  },
});
