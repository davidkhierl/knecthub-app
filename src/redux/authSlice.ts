import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { AppThunk } from './store';
import { getAuthLogout } from 'services/auth.services';
import { getCurrentUser } from 'services/user.services';
import useUserStore from 'store/useUserStore';

// export interface UserRegisterData {
//   firstName: string;
//   lastName: string;
//   company: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
//   termsOfServices: boolean;
// }

// export interface LoginUser {
//   email: string;
//   password: string;
// }

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
      window.localStorage.setItem('user', action.payload.id);
      useUserStore.setState({ user: action.payload });
    },
    removed(state) {
      state.loading = false;
      state.isAuthenticated = false;
      window.localStorage.removeItem('user');
    }
  }
});

// function startAuthLoading(state: AuthReducer) {
//   state.loading = true;
// }

// function setAuthSuccess(state: AuthReducer, action: PayloadAction<User>) {
//   state.loading = false;
//   state.isAuthenticated = true;
//   window.localStorage.setItem('user', action.payload.id);
//   useUserStore.setState({ user: action.payload });
// }

// function setAuthFail(state: AuthReducer) {
//   state.loading = false;
//   state.isAuthenticated = false;
// }

export const reloadAuth = (): AppThunk => async (dispatch) => {
  try {
    dispatch(startAuth());
    const res = await getCurrentUser();
    dispatch(authSuccess(res.data));
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

// const userAuthSuccess = (state: AuthReducer, action: PayloadAction<User>) => {
//   state.isAuthenticated = true;
//   state.loading = false;
//   useUserStore.setState({ user: action.payload });
// };

// const userAuthFail = (state: AuthReducer, action: PayloadAction<ResponseError[] | undefined>) => {
//   state.isAuthenticated = false;
//   state.loading = false;
//   useUserStore.setState({ user: null });
//   state.errors = action.payload;
// };

// const authSlice = createSlice({
//   name: 'auth',
//   initialState,
//   reducers: {
//     loadUserStart: startAuthLoading,
//     loginUserFail: userAuthFail,
//     loginUserStart: startAuthLoading,
//     loginUserSuccess: userAuthSuccess,
//     loginViaLinkedInFail: userAuthFail,
//     loginViaLinkedInStart: startAuthLoading,
//     loginViaLinkedInSuccess: userAuthSuccess,
//     logoutUserSuccess: userAuthFail,
//     registerUserFail: userAuthFail,
//     registerUserStart: startAuthLoading,
//     registerUserSuccess: userAuthSuccess,
//     userExpired: userAuthFail,
//     userFound: userAuthSuccess,
//     clearAuthErrors(state) {
//       delete state.errors;
//     }
//   }
// });

// export const loginUser = (payload: LoginUser): AppThunk => async (dispatch) => {
//   try {
//     dispatch(loginUserStart());
//     const res = await api.post('/auth/login', payload);
//     dispatch(loginUserSuccess(res.data));
//     window.localStorage.setItem('user', 'true');
//   } catch (err) {
//     if (err.response) {
//       dispatch(loginUserFail(err.response.data.errors));
//     } else {
//       dispatch(loginUserFail([{ message: err.message }]));
//     }
//     window.localStorage.removeItem('user');
//   }
// };

// export const logoutUser = (): AppThunk => async (dispatch) => {
//   try {
//     await api.get('/auth/logout');
//     dispatch(logoutUserSuccess());
//     window.localStorage.removeItem('user');
//   } catch (err) {
//     console.error(err.message);
//   }
// };

// export const loadUser = (
//   opt: { loadProfileOnSuccess?: boolean } = { loadProfileOnSuccess: false }
// ): AppThunk => async (dispatch) => {
//   try {
//     dispatch(loadUserStart());
//     const res = await api.get('/users/me');
//     dispatch(userFound(res.data));
//     window.localStorage.setItem('user', 'true');
//   } catch (err) {
//     dispatch(userExpired());
//     window.localStorage.removeItem('user');
//   }
// };

// export const loginViaLinkedIn = (payload: {
//   code: string;
//   state?: string;
//   callbackUrl: string;
// }): AppThunk => async (dispatch) => {
//   try {
//     dispatch(loginViaLinkedInStart());
//     const res = await api.post('auth/linkedin', payload);
//     dispatch(loginViaLinkedInSuccess(res.data.user));
//     window.localStorage.setItem('user', 'true');
//   } catch (err) {
//     if (err.response) {
//       dispatch(
//         loginViaLinkedInFail([
//           {
//             message: err.response.data.error_description || err.response.data
//           }
//         ])
//       );
//     } else {
//       dispatch(loginViaLinkedInFail([{ message: err.message }]));
//     }
//   }
// };

// export const registerUser = (payload: UserRegisterData): AppThunk => async (dispatch) => {
//   try {
//     dispatch(registerUserStart());
//     const res = await api.post('/users', payload);
//     dispatch(registerUserSuccess(res.data));
//     window.localStorage.setItem('user', 'true');
//   } catch (err) {
//     if (err.response) {
//       dispatch(registerUserFail(err.response.data.errors));
//     } else {
//       dispatch(registerUserFail([{ message: err.message }]));
//     }
//   }
// };

// export const {
//   loginUserStart,
//   loginUserSuccess,
//   loginUserFail,
//   loginViaLinkedInStart,
//   loginViaLinkedInSuccess,
//   loginViaLinkedInFail,
//   logoutUserSuccess,
//   loadUserStart,
//   userFound,
//   userExpired,
//   registerUserStart,
//   registerUserSuccess,
//   registerUserFail,
//   clearAuthErrors
// } = authSlice.actions;

const { loading, removed, success } = authSlice.actions;

export const startAuth = loading;
export const authSuccess = success;
export const authFailed = removed;
export const authRemoved = removed;

export default authSlice.reducer;
