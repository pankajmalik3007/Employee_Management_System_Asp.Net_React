import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Employee/EmployeeSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});

export default store;
