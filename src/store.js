import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './Employee/EmployeeSlice';
import departmentReducer from './Component/Department/DepartmentSlice';
import salaryReducer from './Component/Sallary/SalarySlice';
import conditionReducer from './Component/Condition/ConditionSlice';
import loginReducer from './Component/Authentication/LoginSlice';

const store = configureStore({
  reducer: {
    employee: employeeReducer,
    department: departmentReducer,
    salary: salaryReducer,
    condition: conditionReducer,
    login: loginReducer,
    
  },
});

export default store;
