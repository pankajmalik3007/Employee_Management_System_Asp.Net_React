import { createSlice } from '@reduxjs/toolkit';
import BaseUrl from '../Url/BaseUrl';

const getAuthToken = () => {
  const authToket = localStorage.getItem('token');
  return authToket ? `Bearer ${authToket}` : '';
};

export const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    employees: [],
  },
  reducers: {
    setEmployees: (state, action) => {
      state.employees = action.payload;
    },
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action) => {
      const updatedEmployee = action.payload;
      const index = state.employees.findIndex((emp) => emp.id === updatedEmployee.id);
      if (index !== -1) {
        state.employees[index] = updatedEmployee;
      }
    },
    removeEmployee: (state, action) => {
      const employeeIdToRemove = action.payload;
      state.employees = state.employees.filter((emp) => emp.id !== employeeIdToRemove);
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, removeEmployee } = employeeSlice.actions;

export const fetchAllEmployees = () => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44311/api/Employee/getAllEmployee`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        Authorization: getAuthToken(), 
      },
    });

    const data = await response.json();
    dispatch(setEmployees(data));
  } catch (error) {
    console.error('Error fetching employees:', error);
  }
};


export const insertEmployee = (employeeData) => async (dispatch) => {
  try {
    const response = await fetch(BaseUrl.insertEmployeeUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthToken(),
      },
      body: JSON.stringify(employeeData),
    });

    const newEmployee = await response.json();
    dispatch(addEmployee(newEmployee));
  } catch (error) {
    console.error('Error inserting employee:', error);
  }
};

export const updateEmployeeById = (employeeId, updatedEmployeeData) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44311/api/Employee/UpdateEmployee`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthToken(), 
      },
      body: JSON.stringify({ ...updatedEmployeeData, id: employeeId }),
    });

    console.log('Request Payload:', JSON.stringify({ ...updatedEmployeeData, id: employeeId }));

    if (!response.ok) {
      const responseBody = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Body:', responseBody);
      return;
    }

    const updatedEmployee = await response.json();
    console.log('Updated Employee:', updatedEmployee);

    dispatch(updateEmployee(updatedEmployee));
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    await fetch(`${BaseUrl.deleteEmployeeUrl}?id=${employeeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: getAuthToken(), 
      },
    });

    dispatch(removeEmployee(employeeId));
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

export default employeeSlice.reducer;
