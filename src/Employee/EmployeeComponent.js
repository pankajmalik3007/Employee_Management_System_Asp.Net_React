import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllEmployees,
  insertEmployee,
  updateEmployeeById,
  deleteEmployee,
} from './EmployeeSlice';

import { useAuth } from '../Component/Auth/authContext';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';


const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};
const EmployeeComponent = () => {
  const dispatch = useDispatch();
  const {  authToken } = useAuth(); 

  const employees = useSelector((state) => state.employee.employees);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    departementName: '',
  });
  useEffect(() => {
    console.log("Fetching employees...");
    console.log("Auth Token:", authToken); 
    dispatch(fetchAllEmployees(getAuthToken()));
  }, [dispatch, authToken]);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewEmployee({
      name: '',
      password: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      departementName: '',
    });
  };

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleInsertEmployee = () => {
    dispatch(insertEmployee(newEmployee, authToken));
    handleCloseDialog();
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployeeId) {
      dispatch(updateEmployeeById(selectedEmployeeId, newEmployee, authToken));
      setSelectedEmployeeId(null);
      handleCloseDialog();
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id, authToken));
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployeeId(employee.id);
    setNewEmployee({
      name: employee.name,
      password: employee.password,
      email: employee.email,
      phone: employee.phone,
      gender: employee.gender,
      dob: employee.dob,
      departementName: employee.departementName,
    });
    handleOpenDialog();
  };
  
  return (
    <div>
      <h1>Employee List</h1>

     
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Employee
      </Button>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Employee</DialogTitle>
        <DialogContent>
          <div>
            <label>Name:</label>
            <TextField type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
          </div>
          <div>
            <label>Password:</label>
            <TextField type="text" name="password" value={newEmployee.password} onChange={handleInputChange} />
          </div>
          <div>
            <label>Email:</label>
            <TextField type="text" name="email" value={newEmployee.email} onChange={handleInputChange} />
          </div>
          <div>
            <label>Phone:</label>
            <TextField type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
          </div>
          <div>
            <label>Gender:</label>
            <TextField type="text" name="gender" value={newEmployee.gender} onChange={handleInputChange} />
          </div>
          
          <div>
          <label>DOB:</label>
          <TextField
            type="date"
            name="dob"
            value={newEmployee.dob}
            onChange={handleInputChange}
          />
        </div>
          <div>
            <label>Department Name:</label>
            <TextField type="text" name="departementName" value={newEmployee.departementName} onChange={handleInputChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleInsertEmployee}>Insert Employee</Button>
          <Button onClick={handleUpdateEmployee}>Edit Employee</Button>
       </DialogActions>
      </Dialog>

     
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
             
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>DOB</TableCell>
              <TableCell>Department Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {Array.isArray(employees) && employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.phone}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{new Date(employee.dob).toLocaleDateString()}</TableCell>
              <TableCell>{employee.departementName}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditEmployee(employee)}>Edit</Button>
                <Button onClick={() => handleDeleteEmployee(employee.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeComponent;




