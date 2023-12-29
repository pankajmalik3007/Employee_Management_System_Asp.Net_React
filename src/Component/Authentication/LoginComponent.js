import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './LoginSlice';
import RegisterComponent from './RegisterComponent';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';

const LoginComponent = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const error = useSelector((state) => state.login.error);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(credentials.email, credentials.password));
  };

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h5">
          {showRegisterForm ? 'Register' : 'Login'}
        </Typography>
        {!isAuthenticated && !showRegisterForm && (
          <form onSubmit={handleLogin}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  type="text"
                  name="email"
                  value={credentials.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                />
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Login
            </Button>
            {error && <div style={{ color: 'red' }}>{error.Message}</div>}
          </form>
        )}

        {!isAuthenticated && showRegisterForm && <RegisterComponent />}
        
        {!isAuthenticated && (
          <Button onClick={handleToggleForm} fullWidth sx={{ mt: 2 }}>
            {showRegisterForm ? 'Back to Login' : 'Register'}
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default LoginComponent;
