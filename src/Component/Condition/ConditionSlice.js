
import { createSlice } from '@reduxjs/toolkit';
import BaseUrl from '../../Url/BaseUrl';

export const conditionSlice = createSlice({
  name: 'condition',
  initialState: {
    minSalary: 0,
    maxSalary: 0,
    salariesInRange: [],
    monthlySalariesByDepartment: {},
    employeesByName: [],
  },
  reducers: {
    setMinSalary: (state, action) => {
      state.minSalary = action.payload;
    },
    setMaxSalary: (state, action) => {
      state.maxSalary = action.payload;
    },
    setSalariesInRange: (state, action) => {
      state.salariesInRange = action.payload;
    },
    setMonthlySalariesByDepartment: (state, action) => {
      state.monthlySalariesByDepartment = action.payload;
    },
    setEmployeesByName: (state, action) => {
      state.employeesByName = action.payload;
    },
  },
});

export const { setMinSalary, setMaxSalary, setSalariesInRange, setMonthlySalariesByDepartment, setEmployeesByName } = conditionSlice.actions;

export const fetchEmployeeByName = (name) => async (dispatch) => {
  try {
    const response = await fetch(`${BaseUrl.searchEmployeeByNameUrl}?name=${name}`);
    const data = await response.json();
    dispatch(setEmployeesByName(data));
  } catch (error) {
    console.error('Error fetching employees by name:', error);
  }
};

export const fetchSalariesInSalaryRange = (minSalary, maxSalary) => async (dispatch) => {
  try {
    const response = await fetch(`${BaseUrl.getSalariesInSalaryRangeUrl}?minSalary=${minSalary}&maxSalary=${maxSalary}`);
    const data = await response.json();
    dispatch(setSalariesInRange(data));
  } catch (error) {
    console.error('Error fetching salaries in salary range:', error);
  }
};

export const fetchMonthlySalariesByDepartment = (year) => async (dispatch) => {
  try {
    const response = await fetch(`${BaseUrl.getMonthlySalaryByDepartmentUrl}?year=${year}`);
    const data = await response.json();
    dispatch(setMonthlySalariesByDepartment(data));
  } catch (error) {
    console.error('Error fetching monthly salaries by department:', error);
  }
};

export default conditionSlice.reducer;
