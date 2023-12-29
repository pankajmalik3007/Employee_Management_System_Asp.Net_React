// SalaryComponent.js
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

const SalaryComponent = () => {
  const dispatch = useDispatch();
  const salaries = useSelector((state) => state.salary.salaries);

  const [newSalary, setNewSalary] = useState({
    emp_Name: '',
    amount: 0,
    date: '',
  });

  const [selectedSalaryId, setSelectedSalaryId] = useState(null);

  // State for controlling the dialog
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    // Clear form values when closing the dialog
    setNewSalary({
      emp_Name: '',
      amount: 0,
      date: '',
    });
  };

  const handleInputChange = (e) => {
    setNewSalary({ ...newSalary, [e.target.name]: e.target.value });
  };

  const handleInsertSalary = () => {
    dispatch(insertSalary(newSalary));
    handleCloseDialog();
  };

  const handleUpdateSalary = () => {
    if (selectedSalaryId) {
      dispatch(updateSalaryById(selectedSalaryId, newSalary));
      setSelectedSalaryId(null);
      handleCloseDialog();
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
    dispatch(fetchAllSalaries());
  }, [dispatch]);

  return (
    <div>
      <h1>Salary List</h1>

      {/* Button to add a new salary */}
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Add New Salary
      </Button>

      {/* Dialog for inserting a new salary */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Add New Salary</DialogTitle>
        <DialogContent>
          <div>
            <label>Employee Name:</label>
            <TextField type="text" name="emp_Name" value={newSalary.emp_Name} onChange={handleInputChange} />
          </div>
          <div>
            <label>Amount:</label>
            <TextField type="number" name="amount" value={newSalary.amount} onChange={handleInputChange} />
          </div>
          <div>
            <label>Date:</label>
            <TextField type="text" name="date" value={newSalary.date} onChange={handleInputChange} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={selectedSalaryId ? handleUpdateSalary : handleInsertSalary}>Insert Salary</Button>
        </DialogActions>
      </Dialog>

      {/* Table to display the list of salaries */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee ID</TableCell>
              <TableCell>Employee Name</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salaries.map((salary) => (
              <TableRow key={salary.empId}>
                <TableCell>{salary.empId}</TableCell>
                <TableCell>{salary.empName}</TableCell>
                <TableCell>{salary.amount}</TableCell>
                <TableCell>{salary.date}</TableCell>
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
