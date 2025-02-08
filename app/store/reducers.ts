import { authSlice } from '@containers/Auth/slice';
import { combineSlices } from '@reduxjs/toolkit';
import { userApi } from '@store/services/userApi';

export default combineSlices({
  [authSlice.name]: authSlice.reducer,
  [userApi.reducerPath]: userApi.reducer,
});
