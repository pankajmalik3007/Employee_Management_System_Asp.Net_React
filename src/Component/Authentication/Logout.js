// import React from 'react';
// import { useNavigate } from 'react-router-dom';

// const Logout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/login');
//   };
//   React.useEffect(() => {
//     handleLogout();
//   }, []);
//   return <div>Logging out...</div>;
// };

// export default Logout;


import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    await navigate('/login');
  };

  React.useEffect(() => {
    handleLogout();
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
