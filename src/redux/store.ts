import { Action, combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducer, { authFailed, authSuccess } from './authSlice';
import { createStateSyncMiddleware, initStateWithPrevTab } from 'redux-state-sync';

import { ThunkAction } from 'redux-thunk';
import { withReduxStateSync } from 'redux-state-sync';

// import profileReducer, { clearProfile, loadProfileSuccess } from './profileSlice';

const rootReducer = combineReducers({
  auth: authReducer
});

const stateSync = () =>
  createStateSyncMiddleware({
    whitelist: [authSuccess.type, authFailed.type]
  });

const store = configureStore({
  reducer: withReduxStateSync(rootReducer),
  middleware: [stateSync(), ...getDefaultMiddleware()],
  devTools: process.env.NODE_ENV !== 'production'
});

initStateWithPrevTab(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
