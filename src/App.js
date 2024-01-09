// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './Navbar/NavBar';
// import EmployeeComponent from './Employee/EmployeeComponent';
// import DepartmentComponent from './Component/Department/DepartmentComponent';
// import SalaryComponent from './Component/Sallary/SalaryComponent';
// import ConditionComponent from './Component/Condition/ConditionComponent';
// import LoginComponent from './Component/Authentication/LoginComponent';
// import RegisterComponent from './Component/Authentication/RegisterComponent';
// import Logout from './Component/Authentication/Logout';

// const Home = () => {
//   return <div>Home Page</div>;
// };
// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };
//   const isAuthenticated = isLoggedIn;
//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
//         />

//         <Route
//           path="/employees"
//           element={<EmployeeComponent />}
//         />
//         <Route
//           path="/departments"
//           element={<DepartmentComponent />}
//         />
//         <Route
//           path="/salaries"
//           element={<SalaryComponent />}
//         />
//         <Route
//           path="/condition"
//           element={<ConditionComponent />}
//         />
//         <Route
//           path="/logout"
//           element={<Logout />}
//         />
//         <Route
//           path="/login"
//           element={<LoginComponent onLoginSuccess={handleLoginSuccess} />}
//         />
//         <Route path="/register" element={<RegisterComponent />} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;


// import React, { useState, lazy, Suspense } from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// import Navbar from './Navbar/NavBar';
// import Homepage from './Component/Homepage/Homepage';

// const LazyEmployeeComponent = lazy(() => import('./Employee/EmployeeComponent'));
// const LazyDepartmentComponent = lazy(() => import('./Component/Department/DepartmentComponent'));
// const LazySalaryComponent = lazy(() => import('./Component/Sallary/SalaryComponent'));
// const LazyConditionComponent = lazy(() => import('./Component/Condition/ConditionComponent'));
// const LazyLoginComponent = lazy(() => import('./Component/Authentication/LoginComponent'));
// const LazyLogout = lazy(() => import('./Component/Authentication/Logout'));
// const LazyRegisterComponent = lazy(() => import('./Component/Authentication/RegisterComponent'));

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//   };
//   const isAuthenticated = isLoggedIn;
//  return (
//     <Router>
//       <Navbar />
//       <Suspense fallback={<div>Loading...</div>}>
//         <Routes>
//         <Route
//           path="/"
//           element={isAuthenticated ? <Homepage/> : <Navigate to="/login" />}
//         />
//         <Route
//             path="/employees"
//             element={<LazyEmployeeComponent />}
//           />
//           <Route
//             path="/departments"
//             element={<LazyDepartmentComponent />}
//           />
//           <Route
//             path="/salaries"
//             element={<LazySalaryComponent />}
//           />
//           <Route
//             path="/condition"
//             element={<LazyConditionComponent />}
//           />
//           <Route
//             path="/logout"
//             element={<LazyLogout />}
//           />
//           <Route
//             path="/login"
//             element={<LazyLoginComponent onLoginSuccess={handleLoginSuccess} />}
//           />
//           <Route path="/register" element={<LazyRegisterComponent />} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// };

// export default App;




import React, { useState, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Navbar/NavBar';
import Homepage from './Component/Homepage/Homepage';

const LazyEmployeeComponent = lazy(() => import('./Employee/EmployeeComponent'));
const LazyDepartmentComponent = lazy(() => import('./Component/Department/DepartmentComponent'));
const LazySalaryComponent = lazy(() => import('./Component/Sallary/SalaryComponent'));
const LazyConditionComponent = lazy(() => import('./Component/Condition/ConditionComponent'));
const LazyLoginComponent = lazy(() => import('./Component/Authentication/LoginComponent'));
const LazyLogout = lazy(() => import('./Component/Authentication/Logout'));
const LazyRegisterComponent = lazy(() => import('./Component/Authentication/RegisterComponent'));

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
const isAuthenticated = isLoggedIn;
 return (
    <Router>
      {isAuthenticated && <Navbar />}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Homepage /> : <Navigate to="/login" />}
          />
          <Route path="/employees" element={<LazyEmployeeComponent />} />
          <Route path="/departments" element={<LazyDepartmentComponent />} />
          <Route path="/salaries" element={<LazySalaryComponent />} />
          <Route path="/condition" element={<LazyConditionComponent />} />
          <Route path="/logout" element={<LazyLogout />} />
          <Route
            path="/login"
            element={<LazyLoginComponent onLoginSuccess={handleLoginSuccess} />}
          />
          <Route path="/register" element={<LazyRegisterComponent />} />
        </Routes>
      </Suspense>
    </Router>
  );
};
export default App;
