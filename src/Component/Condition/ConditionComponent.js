import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSalariesInSalaryRange,
  setMinSalary,
  setMaxSalary,
  fetchMonthlySalariesByDepartment,
  fetchEmployeeByName,
} from './ConditionSlice';
import './ConditionComponent.css';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
} from '@mui/material';
import './ConditionComponent.css';

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

const ConditionComponent = () => {
  const dispatch = useDispatch();
  const salariesInRange = useSelector((state) => state.condition.salariesInRange);
  const minSalary = useSelector((state) => state.condition.minSalary);
  const maxSalary = useSelector((state) => state.condition.maxSalary);
  const monthlySalariesByDepartment = useSelector((state) => state.condition.monthlySalariesByDepartment);
  const employeesByName = useSelector((state) => state.condition.employeesByName);

  const [searchYear, setSearchYear] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleMinSalaryChange = (e) => {
    dispatch(setMinSalary(e.target.value));
  };

  const handleMaxSalaryChange = (e) => {
    dispatch(setMaxSalary(e.target.value));
  };

  const handleFetchSalariesInSalaryRange = () => {
    dispatch(fetchSalariesInSalaryRange(minSalary, maxSalary, getAuthToken()));
  };

  const handleSearchYearChange = (e) => {
    setSearchYear(e.target.value);
  };

  const handleFetchMonthlySalariesByDepartment = () => {
    dispatch(fetchMonthlySalariesByDepartment(searchYear, getAuthToken()));
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleFetchEmployeeByName = () => {
    dispatch(fetchEmployeeByName(searchName, getAuthToken()))
      .then((result) => {
        setSelectedEmployee(result[0]);
      })
      .catch((error) => {
        console.error('Error fetching employee by name:', error);
        setSelectedEmployee(null);
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="condition-controller">
        <h2>Salary Range</h2>
        <div className="range-input">
          <TextField label="Min Salary" type="number" value={minSalary} onChange={handleMinSalaryChange} fullWidth />
        </div>
        <div className="range-input">
          <TextField label="Max Salary" type="number" value={maxSalary} onChange={handleMaxSalaryChange} fullWidth />
        </div>
        <Button variant="contained" onClick={handleFetchSalariesInSalaryRange} fullWidth>
          Fetch Salaries
        </Button>
        <div className="result-container">
          <h2>Result</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {salariesInRange.map((salary) => (
                  <TableRow key={salary.empId}>
                    <TableCell>{salary.empName}</TableCell>
                    <TableCell>{salary.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="condition-controller">
        <h2>Monthly Salaries by Department</h2>
        <div className="year-input">
          <TextField label="Enter Year" type="number" value={searchYear} onChange={handleSearchYearChange} fullWidth />
        </div>
        <Button variant="contained" onClick={handleFetchMonthlySalariesByDepartment} fullWidth>
          Fetch Monthly Salaries
        </Button>
        <div className="result-container">
          <h2>Result</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Department</TableCell>
                  <TableCell>Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(monthlySalariesByDepartment).map(([department, amount]) => (
                  <TableRow key={department}>
                    <TableCell>{department}</TableCell>
                    <TableCell>{amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

      <div className="condition-controller">
        <h2>Search Employee by Name</h2>
        <div className="name-input">
          <TextField label="Enter Name" type="text" value={searchName} onChange={handleSearchNameChange} fullWidth />
        </div>
        <Button variant="contained" onClick={handleFetchEmployeeByName} fullWidth>
          Search Employee
        </Button>
        <div className="result-container">
          <h2>Result</h2>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Employee Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>DOB</TableCell>
                  <TableCell>Department Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesByName.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.phone}</TableCell>
                    <TableCell>{employee.gender}</TableCell>
                    <TableCell>{employee.dob}</TableCell>
                    <TableCell>{employee.departementName}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

        {selectedEmployee && (
          <div className="additional-info-container">
            <h2>Additional Information</h2>
            <div>ID: {selectedEmployee.id}</div>
            <div>Password: {selectedEmployee.password}</div>
            <div>Phone: {selectedEmployee.phone}</div>
            <div>Gender: {selectedEmployee.gender}</div>
            <div>DOB: {selectedEmployee.dob}</div>
            <div>Department Name: {selectedEmployee.departementName}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConditionComponent;
