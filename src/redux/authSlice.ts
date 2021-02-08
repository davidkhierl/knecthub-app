import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppThunk } from './store';
import { getAuthLogout } from 'services/auth.services';
import { getCurrentUser } from 'services/user.services';
import { queryClient } from 'index';
import useUserStore from 'store/useUserStore';

interface AuthReducer {
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthReducer = {
  isAuthenticated: false,
  loading: true
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loading(state) {
      state.loading = true;
    },
    success(state, action: PayloadAction<User>) {
      state.loading = false;
      state.isAuthenticated = true;
      useUserStore.setState({ user: action.payload });
    },
    removed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      window.localStorage.removeItem('user');
      queryClient.clear();
    }
  }
});

export const reloadAuth = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startAuth());
    const res = await getCurrentUser();
    dispatch(authSuccess(res.data.data));
  } catch (error) {
    dispatch(authFailed());
  }
};

export const revokeAuth = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startAuth());
    await getAuthLogout();
    dispatch(authRemoved());
  } catch (error) {
    console.error(error);
  }
};

const { loading, removed, success } = authSlice.actions;

export const startAuth = loading;
export const authSuccess = success;
export const authFailed = removed;
export const authRemoved = removed;

export default authSlice.reducer;
