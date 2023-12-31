import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isAuthenticated = useSelector((state) => state.login.isAuthenticated);
  console.log('Navbar isAuthenticated:', isAuthenticated);

  const openDrawer = () => {
    setDrawerOpen(true);
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: '#2e004f' }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={openDrawer}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
        <List>
          <ListItem>
            <Link to="/">Home</Link>
          </ListItem>
          {isAuthenticated ? (
            <>
              <ListItem>
                <Link to="/employees">Employees</Link>
              </ListItem>
              <ListItem>
                <Link to="/departments">Departments</Link>
              </ListItem>
              <ListItem>
                <Link to="/salaries">Salary</Link>
              </ListItem>
              <ListItem>
                <Link to="/condition">Condition</Link>
              </ListItem>
              <ListItem>
                <Link to="/logout">Logout</Link>
              </ListItem>
            </>
          ) : (
            <ListItem>
              <Link to="/login">Login</Link>
            </ListItem>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
