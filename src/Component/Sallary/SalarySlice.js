import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import BaseUrl from '../../Url/BaseUrl';

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

export const fetchAllSalaries = createAsyncThunk('salary/fetchAllSalaries', async () => {
  const response = await axios.get(BaseUrl.getAllSalaryUrl, {
    headers: {
      Authorization: getAuthToken(), 
    },
  });
  return response.data;
});

export const insertSalary = createAsyncThunk('salary/insertSalary', async (newSalary) => {
  const response = await axios.post(BaseUrl.insertSalaryUrl, newSalary, {
    headers: {
      Authorization: getAuthToken(), 
    },
  });
  return response.data;
});

export const updateSalaryById = createAsyncThunk('salary/updateSalaryById', async ({ id, updatedProperties }) => {
  try {
    const response = await axios.put('https://localhost:7127/api/Salary/updateSalary', {
      id: id,
      ...updatedProperties,
    }, {
      headers: {
        Authorization: getAuthToken(), 
      },
    });
  return { id, updatedProperties };
  } catch (error) {
    console.error('Error updating salary:', error);
    throw error;
  }
});
export const deleteSalary = createAsyncThunk('salary/deleteSalary', async (id) => {
  await axios.delete(`${BaseUrl.deleteSalaryUrl}?id=${id}`, {
    headers: {
      Authorization: getAuthToken(), 
    },
  });
  return id;
});
const initialState = {
  salaries: [],
  status: 'idle',
  error: null,
};

export const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllSalaries.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllSalaries.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salaries = action.payload;
      })
      .addCase(fetchAllSalaries.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(insertSalary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.salaries.push(action.payload);
      })
      .addCase(updateSalaryById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { id, updatedProperties } = action.payload;
        const index = state.salaries.findIndex((salary) => salary.empId === id);
        if (index !== -1) {
          state.salaries[index] = { ...state.salaries[index], ...updatedProperties };
        }
      })
      .addCase(deleteSalary.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const empIdToRemove = action.payload;
        state.salaries = state.salaries.filter((salary) => salary.empId !== empIdToRemove);
      });
  },
});

export default salarySlice.reducer;
