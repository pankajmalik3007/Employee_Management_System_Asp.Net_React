import { createSlice } from '@reduxjs/toolkit';
import BaseUrl from '../../Url/BaseUrl';

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

export const departmentSlice = createSlice({
  name: 'department',
  initialState: {
    departments: [],
  },
  reducers: {
    setDepartments: (state, action) => {
      state.departments = action.payload;
    },
    addDepartment: (state, action) => {
      state.departments.push(action.payload);
    },
    updateDepartment: (state, action) => {
      const updatedDepartment = action.payload;
      const index = state.departments.findIndex((dept) => dept.id === updatedDepartment.id);
      if (index !== -1) {
        state.departments[index] = updatedDepartment;
      }
    },
    removeDepartment: (state, action) => {
      const departmentIdToRemove = action.payload;
      state.departments = state.departments.filter((dept) => dept.id !== departmentIdToRemove);
    },
  },
});

export const { setDepartments, addDepartment, updateDepartment, removeDepartment } = departmentSlice.actions;

export const fetchAllDepartments = () => async (dispatch) => {
  try {
    const response = await fetch(BaseUrl.getAllDepartmentUrl, {
      method: 'GET',
      headers: {
        Authorization: getAuthToken(),
      },
    });

    const data = await response.json();
    dispatch(setDepartments(data));
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
};

export const insertDepartment = (departmentData) => async (dispatch) => {
  try {
    const response = await fetch(BaseUrl.insertDepartmentUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthToken(), 
      },
      body: JSON.stringify(departmentData),
    });

    const newDepartment = await response.json();
    dispatch(addDepartment(newDepartment));
  } catch (error) {
    console.error('Error inserting department:', error);
  }
};

export const updateDepartmentById = (departmentId, updatedDepartmentData) => async (dispatch) => {
  try {
    const response = await fetch(`https://localhost:44311/api/Department/updateDepartment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthToken(), 
      },
      body: JSON.stringify({ ...updatedDepartmentData, id: departmentId }),
    });

    if (!response.ok) {
      const responseBody = await response.text();
      console.error('Error updating department:', responseBody);
      return;
    }

    const updatedDepartment = await response.json();
    dispatch(updateDepartment(updatedDepartment));
  } catch (error) {
    console.error('Error updating department:', error);
  }
};

export const deleteDepartment = (departmentId) => async (dispatch) => {
  try {
    await fetch(`${BaseUrl.deleteDepartmentUrl}?id=${departmentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: getAuthToken(), 
      },
    });

    dispatch(removeDepartment(departmentId));
  } catch (error) {
    console.error('Error deleting department:', error);
  }
};

export default departmentSlice.reducer;
