import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllSalaries,
  insertSalary,
  updateSalaryById,
  deleteSalary,
} from './SalarySlice';

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
import { useAuth } from '../Auth/authContext';


const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

const SalaryComponent = () => {
  const dispatch = useDispatch();
  const salaries = useSelector((state) => state.salary.salaries);

  const {  authToken } = useAuth(); 

  const [newSalary, setNewSalary] = useState({
    emp_Name: '',
    amount: 0,
    date: '',
  });

  const [selectedSalaryId, setSelectedSalaryId] = useState(null);


  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    
    setNewSalary({
      emp_Name: '',
      amount: 0,
      date: '',
    });
  };

  const handleInputChange = (e) => {
    setNewSalary({ ...newSalary, [e.target.name]: e.target.value });
  };

  const handleInsertSalary = async () => {
    const success = await dispatch(insertSalary(newSalary));
    if (success) {
      setNewSalary({
        emp_Name: '',
        amount: 0,
        date: '',
      });
      handleCloseDialog();
      dispatch(fetchAllSalaries(getAuthToken()));
    }
  };
  const handleUpdateSalary = () => {
    if (selectedSalaryId) {
      dispatch(updateSalaryById({ id: selectedSalaryId, updatedProperties: newSalary }, authToken));
      setSelectedSalaryId(null);
      handleCloseDialog();
      dispatch(fetchAllSalaries(getAuthToken()));
    }
  };

  const handleDeleteSalaryItem = (empId) => {
    dispatch(deleteSalary(empId));
  };

  const handleEditSalary = (salary) => {
    setSelectedSalaryId(salary.empId);
    setNewSalary({
      emp_Name: salary.empName,
      amount: salary.amount,
      date: salary.date,
    });
    handleOpenDialog();
  };

  useEffect(() => {
     dispatch(fetchAllSalaries(getAuthToken()));
  }, [dispatch]);

  return (
    <div>
      <h1>Salary List</h1>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Salary
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Salary</DialogTitle>
        <DialogContent>
          <div>
            <label>EmpName:</label>
            <TextField type="text" name="emp_Name" value={newSalary.emp_Name} onChange={handleInputChange} />
          </div>
          <div>
            <label>SalAmount:</label>
            <TextField type="number" name="amount" value={newSalary.amount} onChange={handleInputChange} />
          </div>
          <div>
          <label>DateofSalary:</label>
          <TextField
            type="date"
            name="date"
            value={newSalary.date}
            onChange={handleInputChange}
          />
        </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleInsertSalary}>Insert Salary</Button>
          <Button onClick={handleUpdateSalary}>Edit Salary</Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
             <TableCell>Employee Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.empId}>
                <TableCell>{salary.empName}</TableCell>
                <TableCell>{salary.amount}</TableCell>
                <TableCell>{new Date(salary.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditSalary(salary)}>Edit</Button>
                  <Button onClick={() => handleDeleteSalaryItem(salary.empId)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default SalaryComponent;
