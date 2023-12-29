
import { createSlice } from '@reduxjs/toolkit';
import BaseUrl from '../../Url/BaseUrl';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setError: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const { setUser, setError, logout } = loginSlice.actions;

export const login = (email, password) => async (dispatch) => {
  try {
    console.log('Login Payload:', { Email: email, Password: password });

    const response = await fetch(`${BaseUrl.apiBaseUrl}Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData));
    }
  } catch (error) {
    dispatch(
      setError({
        Message: 'An error occurred during login',
        Errors: [error.message],
      })
    );
  }
};

// New registration action
export const register = (email, password) => async (dispatch) => {
  try {
    console.log('Registration Payload:', { Email: email, Password: password });

    const response = await fetch(`${BaseUrl.apiBaseUrl}Account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(setUser(data));
    } else {
      const errorData = await response.json();
      dispatch(setError(errorData));
    }
  } catch (error) {
    dispatch(
      setError({
        Message: 'An error occurred during registration',
        Errors: [error.message],
      })
    );
  }
};

export default loginSlice.reducer;
