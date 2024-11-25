import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure, signup, signupSuccess, signupFailure } from './auth.actions';

export interface AuthState {
  user: any;
  loggedIn: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  loggedIn: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { user }) => ({
    ...state,
    user,
    loggedIn: true,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(signupSuccess, (state, { user }) => ({
    ...state,
    user,
    loggedIn: true,
    error: null,
  })),
  on(signupFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
