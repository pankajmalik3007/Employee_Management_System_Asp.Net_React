import { createSlice } from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    user: null,
    isAuthenticated: localStorage.getItem('token') ? true : false,
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

export const userlogin = (email, password) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44311/api/Account/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Email: email,
        Password: password,
      }),
      credentials: 'include',
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
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

export const register = (firstName, lastName, email, password) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44311/api/Account/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        FirstName: firstName,
        LastName: lastName,
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