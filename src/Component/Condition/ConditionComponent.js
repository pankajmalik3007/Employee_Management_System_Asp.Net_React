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

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import './ConditionComponent.css';

const ConditionComponent = () => {
  const dispatch = useDispatch();
  const salariesInRange = useSelector((state) => state.condition.salariesInRange);
  const minSalary = useSelector((state) => state.condition.minSalary);
  const maxSalary = useSelector((state) => state.condition.maxSalary);
  const monthlySalariesByDepartment = useSelector((state) => state.condition.monthlySalariesByDepartment);
  const employeesByName = useSelector((state) => state.condition.employeesByName);

  const [searchYear, setSearchYear] = useState('');
  const [searchName, setSearchName] = useState('');

  const handleMinSalaryChange = (e) => {
    dispatch(setMinSalary(e.target.value));
  };

  const handleMaxSalaryChange = (e) => {
    dispatch(setMaxSalary(e.target.value));
  };

  const handleFetchSalariesInSalaryRange = () => {
    dispatch(fetchSalariesInSalaryRange(minSalary, maxSalary));
  };

  const handleSearchYearChange = (e) => {
    setSearchYear(e.target.value);
  };

  const handleSearchNameChange = (e) => {
    setSearchName(e.target.value);
  };

  const handleFetchMonthlySalariesByDepartment = () => {
    dispatch(fetchMonthlySalariesByDepartment(searchYear));
  };

  const handleFetchEmployeeByName = () => {
    dispatch(fetchEmployeeByName(searchName));
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
                </TableRow>
              </TableHead>
              <TableBody>
                {employeesByName.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ConditionComponent;
