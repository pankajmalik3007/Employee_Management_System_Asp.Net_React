// // EmployeeSlice.js
// import { createSlice } from '@reduxjs/toolkit';
// import BaseUrl from '../Url/BaseUrl';

// export const employeeSlice = createSlice({
//   name: 'employee',
//   initialState: {
//     employees: [],
//   },
//   reducers: {
//     setEmployees: (state, action) => {
//       state.employees = action.payload;
//     },
//     addEmployee: (state, action) => {
//       state.employees.push(action.payload);
//     },
//     updateEmployee: (state, action) => {
//       const updatedEmployee = action.payload;
//       const index = state.employees.findIndex((emp) => emp.id === updatedEmployee.id);
//       if (index !== -1) {
//         state.employees[index] = updatedEmployee;
//       }
//     },
//     removeEmployee: (state, action) => {
//       const employeeIdToRemove = action.payload;
//       state.employees = state.employees.filter((emp) => emp.id !== employeeIdToRemove);
//     },
//   },
// });

// export const { setEmployees, addEmployee, updateEmployee, removeEmployee } = employeeSlice.actions;

// // Asynchronous thunk to fetch all employees
// export const fetchAllEmployees = () => async (dispatch) => {
//   try {
//     const response = await fetch(BaseUrl.getAllEmployeeUrl);
//     const data = await response.json();
//     dispatch(setEmployees(data));
//   } catch (error) {
//     console.error('Error fetching employees:', error);
//   }
// };

// // Asynchronous thunk to insert a new employee
// export const insertEmployee = (employeeData) => async (dispatch) => {
//   try {
//     const response = await fetch(BaseUrl.insertEmployeeUrl, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(employeeData),
//     });

//     const newEmployee = await response.json();
//     dispatch(addEmployee(newEmployee));
//   } catch (error) {
//     console.error('Error inserting employee:', error);
//   }
// };

// export const updateEmployeeById = (employeeId, updatedEmployeeData) => async (dispatch) => {
//   try {
//     const response = await fetch(`${BaseUrl.updateEmployeeUrl}?id=${employeeId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(updatedEmployeeData),
//     });

//     const updatedEmployee = await response.json();
//     dispatch(updateEmployee(updatedEmployee));
//   } catch (error) {
//     console.error('Error updating employee:', error);
//   }
// };

// export const deleteEmployee = (employeeId) => async (dispatch) => {
//   try {
//     await fetch(`${BaseUrl.deleteEmployeeUrl}?id=${employeeId}`, {
//       method: 'DELETE',
//     });

//     dispatch(removeEmployee(employeeId));
//   } catch (error) {
//     console.error('Error deleting employee:', error);
//   }
// };

// export default employeeSlice.reducer;









// EmployeeSlice.js
import { createSlice } from '@reduxjs/toolkit';
import BaseUrl from '../Url/BaseUrl';

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
    const response = await fetch(BaseUrl.getAllEmployeeUrl);
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
    const response = await fetch(`${BaseUrl.updateEmployeeUrl}?id=${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEmployeeData),
    });

    const updatedEmployee = await response.json();
    dispatch(updateEmployee({ id: employeeId, ...updatedEmployee }));
  } catch (error) {
    console.error('Error updating employee:', error);
  }
};

export const deleteEmployee = (employeeId) => async (dispatch) => {
  try {
    await fetch(BaseUrl.deleteEmployeeUrl(employeeId), {
      method: 'DELETE',
    });

    dispatch(removeEmployee(employeeId));
  } catch (error) {
    console.error('Error deleting employee:', error);
  }
};

export default employeeSlice.reducer;
