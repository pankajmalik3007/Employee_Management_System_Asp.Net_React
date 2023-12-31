import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userlogin } from './LoginSlice';
import RegisterComponent from './RegisterComponent';
import { TextField, Button, Typography, Container, Paper, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const LoginComponent = ({ onLoginSuccess }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  const error = useSelector((state) => state.login.error);
  const successMessage = useSelector((state) => state.login.successMessage);

  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(userlogin(credentials.email, credentials.password));
      setLoading(false);

      setCredentials({ email: '', password: '' });

      onLoginSuccess();

      navigate('/employees');
    } catch (loginError) {
      setLoading(false);
      console.error('Login error:', loginError);
    }
  };

  const handleToggleForm = () => {
    setShowRegisterForm(!showRegisterForm);
  };

  const handleRegisterButtonClick = () => {
    setShowRegisterForm(true);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h2" variant="h5">
          {showRegisterForm ? 'Register' : 'Login'}
        </Typography>

        {showRegisterForm ? (
          <RegisterComponent onBackToLogin={handleToggleForm} />
        ) : (
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
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            {error && <div style={{ color: 'red' }}>{error.Message}</div>}
            {isAuthenticated && successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
          </form>
        )}

        {!isAuthenticated && (
          <Button onClick={handleRegisterButtonClick} fullWidth sx={{ mt: 2 }}>
            Register
          </Button>
        )}
      </Paper>
    </Container>
  );
};

export default LoginComponent;
