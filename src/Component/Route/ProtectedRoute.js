
// import React from 'react';
// import { Routes } from 'react-router-dom';
// import PrivateRoute from './PrivateRoute';
// import EmployeeComponent from '../../Employee/EmployeeComponent';
// import DepartmentComponent from '../Department/DepartmentComponent';
// import SalaryComponent from '../Sallary/SalaryComponent';
// import ConditionComponent from '../Condition/ConditionComponent';
// import Navbar from '../../Navbar/NavBar';
// const ProtectedRoutes = () => {
//   return (  
//     <Routes>
//         <Navbar />
//       <PrivateRoute path="/employees" element={<EmployeeComponent />} />
//       <PrivateRoute path="/departments" element={<DepartmentComponent />} />
//       <PrivateRoute path="/salaries" element={<SalaryComponent />} />
//       <PrivateRoute path="/condition" element={<ConditionComponent />} />
//     </Routes>
//   );
// };

// export default ProtectedRoutes;


import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeComponent from '../../Employee/EmployeeComponent';
import DepartmentComponent from '../Department/DepartmentComponent';
import SalaryComponent from '../Sallary/SalaryComponent';
import ConditionComponent from '../Condition/ConditionComponent';
import Navbar from '../../Navbar/NavBar';

const ProtectedRoutes = () => {
  return (  
    <Routes>
      <Navbar />
      <Route path="/employees" element={<EmployeeComponent />} />
      <Route path="/departments" element={<DepartmentComponent />} />
      <Route path="/salaries" element={<SalaryComponent />} />
      <Route path="/condition" element={<ConditionComponent />} />
    </Routes>
  );
};

export default ProtectedRoutes;

