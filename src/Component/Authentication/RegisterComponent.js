import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from './LoginSlice';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate, Link } from 'react-router-dom';

const RegisterComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleValidation = () => {
    let isValid = true;
    const newErrorMessages = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
  
    if (!firstName) {
      newErrorMessages.firstName = 'First name is required';
      isValid = false;
    }
  
    if (!lastName) {
      newErrorMessages.lastName = 'Last name is required';
      isValid = false;
    }
  
    if (!email) {
      newErrorMessages.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrorMessages.email = 'Invalid email address';
      isValid = false;
    }
  
    if (!password) {
      newErrorMessages.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrorMessages.password = 'Password must be at least 6 characters long';
      isValid = false;
    }
  
    setErrorMessages(newErrorMessages);
  
    return isValid;
  };
  

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!handleValidation()) {
      return;
    }

    try {
      await dispatch(register(firstName, lastName, email, password));
      setFirstName('');
      setLastName('');
      setEmail('');
      setPassword('');
      setSuccessMessage('Registration successful!');
      
    } catch (registerError) {
      console.error('Registration error:', registerError);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h5">
          Register
        </Typography>
        <form onSubmit={handleRegister}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                error={Boolean(errorMessages.firstName)}
                helperText={errorMessages.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                error={Boolean(errorMessages.lastName)}
                helperText={errorMessages.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={Boolean(errorMessages.email)}
                helperText={errorMessages.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={Boolean(errorMessages.password)}
                helperText={errorMessages.password}
              />
            </Grid>
          </Grid>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Register
          </Button> 
          <Link to="/login">
          <Button fullWidth variant="outlined" sx={{ mt: 2 }}>
            Back to Login
          </Button>
        </Link>
        </form>
        {successMessage && (
          <Typography variant="body2" color="success" sx={{ mt: 2 }}>
            {successMessage}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default RegisterComponent;
