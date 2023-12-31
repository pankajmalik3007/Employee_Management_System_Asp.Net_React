import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchAllDepartments,
  insertDepartment,
  updateDepartmentById,
  deleteDepartment,
} from './DepartmentSlice';

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
} from '@mui/material';

import { useAuth } from '../Auth/authContext'; 

const getAuthToken = () => {
  const authToken = localStorage.getItem('token');
  return authToken ? `Bearer ${authToken}` : '';
};

const DepartmentComponent = () => {
  const dispatch = useDispatch();
  const { authToken } = useAuth(); // Use your auth context
  const departments = useSelector((state) => state.department.departments);

  const [newDepartment, setNewDepartment] = useState({
    name: '',
  });

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);

  const handleInputChange = (e) => {
    setNewDepartment({ ...newDepartment, [e.target.name]: e.target.value });
  };

  const handleInsertDepartment = () => {
    dispatch(insertDepartment(newDepartment, authToken)); 
    setNewDepartment({
      name: '',
    });
  };

  const handleUpdateDepartment = () => {
    if (selectedDepartmentId) {
      dispatch(updateDepartmentById(selectedDepartmentId, newDepartment, authToken)); 
      setSelectedDepartmentId(null);
      setNewDepartment({
        name: '',
      });
    }
  };

  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartment(id, authToken)); 
  };

  const handleEditDepartment = (department) => {
    setSelectedDepartmentId(department.id);
  };

  useEffect(() => {
    console.log("Fetching departments...");
    
      dispatch(fetchAllDepartments(getAuthToken())); 
    
  }, [dispatch]);

  useEffect(() => {
    const selectedDepartment = departments.find((department) => department.id === selectedDepartmentId);

    if (selectedDepartment) {
      setNewDepartment({
        name: selectedDepartment.name,
      });
    }
  }, [selectedDepartmentId, departments]);

  return (
    <div>
      <h1>Department List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell>{department.name}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditDepartment(department)}>Edit</Button>
                  <Button onClick={() => handleDeleteDepartment(department.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <h2>{selectedDepartmentId ? 'Update Department' : 'Add New Department'}</h2>
      <div>
        <label>Name:</label>
        <TextField type="text" name="name" value={newDepartment.name} onChange={handleInputChange} />
      </div>
      <Button onClick={selectedDepartmentId ? handleUpdateDepartment : handleInsertDepartment}>
        {selectedDepartmentId ? 'Update Department' : 'Insert Department'}
      </Button>
    </div>
  );
};

export default DepartmentComponent;
