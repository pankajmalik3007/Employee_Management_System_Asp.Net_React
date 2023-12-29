// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllEmployees, insertEmployee } from './EmployeeSlice';

// const EmployeeComponent = () => {
//   const dispatch = useDispatch();
//   const employees = useSelector((state) => state.employee.employees);

//   const [newEmployee, setNewEmployee] = useState({
//     name: '',
//     password: '',
//     email: '',
//     phone: '',
//     gender: '',
//     dob: '',
//     department_Name: '',
//   });

//   const handleInputChange = (e) => {
//     setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
//   };

//   const handleInsertEmployee = () => {
//     dispatch(insertEmployee(newEmployee));
//     // Clear the form after inserting
//     setNewEmployee({
//       name: '',
//       password: '',
//       email: '',
//       phone: '',
//       gender: '',
//       dob: '',
//       department_Name: '',
//     });
//   };

//   useEffect(() => {
//     // Fetch all employees when the component mounts
//     dispatch(fetchAllEmployees());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Employee List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>DOB</th>
//             <th>Department Name</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.id}</td>
//               <td>{employee.name}</td>
//               <td>{employee.email}</td>
//               <td>{employee.phone}</td>
//               <td>{employee.gender}</td>
//               <td>{employee.dob}</td>
//               <td>{employee.departementName}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>Add New Employee</h2>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="text" name="password" value={newEmployee.password} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Phone:</label>
//         <input type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Gender:</label>
//         <input type="text" name="gender" value={newEmployee.gender} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>DOB:</label>
//         <input type="text" name="dob" value={newEmployee.dob} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Department Name:</label>
//         <input type="text" name="department_Name" value={newEmployee.department_Name} onChange={handleInputChange} />
//       </div>
//       <button onClick={handleInsertEmployee}>Insert Employee</button>
//     </div>
//   );
// };

// export default EmployeeComponent;


// EmployeeComponent.js







// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchAllEmployees, insertEmployee, updateEmployee, deleteEmployee } from './EmployeeSlice';

// const EmployeeComponent = () => {
//   const dispatch = useDispatch();
//   const employees = useSelector((state) => state.employee.employees);

//   const [newEmployee, setNewEmployee] = useState({
//     name: '',
//     password: '',
//     email: '',
//     phone: '',
//     gender: '',
//     dob: '',
//     department_Name: '',
//   });

//   const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

//   const handleInputChange = (e) => {
//     setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
//   };

//   const handleInsertEmployee = () => {
//     dispatch(insertEmployee(newEmployee));
//     // Clear the form after inserting
//     setNewEmployee({
//       name: '',
//       password: '',
//       email: '',
//       phone: '',
//       gender: '',
//       dob: '',
//       department_Name: '',
//     });
//   };

//   const handleUpdateEmployee = () => {
//     if (selectedEmployeeId) {
//       dispatch(updateEmployee(selectedEmployeeId, newEmployee));
//       setSelectedEmployeeId(null); // Reset selectedEmployeeId after update
//       setNewEmployee({
//         name: '',
//         password: '',
//         email: '',
//         phone: '',
//         gender: '',
//         dob: '',
//         department_Name: '',
//       });
//     }
//   };

//   const handleDeleteEmployee = (id) => {
//     dispatch(deleteEmployee(id));
//   };

//   useEffect(() => {
//     // Fetch all employees when the component mounts
//     dispatch(fetchAllEmployees());
//   }, [dispatch]);

//   return (
//     <div>
//       <h1>Employee List</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Email</th>
//             <th>Phone</th>
//             <th>Gender</th>
//             <th>DOB</th>
//             <th>Department Name</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {employees.map((employee) => (
//             <tr key={employee.id}>
//               <td>{employee.id}</td>
//               <td>{employee.name}</td>
//               <td>{employee.email}</td>
//               <td>{employee.phone}</td>
//               <td>{employee.gender}</td>
//               <td>{employee.dob}</td>
//               <td>{employee.departementName}</td>
//               <td>
//                 <button onClick={() => setSelectedEmployeeId(employee.id)}>Edit</button>
//                 <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h2>{selectedEmployeeId ? 'Update Employee' : 'Add New Employee'}</h2>
//       <div>
//         <label>Name:</label>
//         <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Password:</label>
//         <input type="text" name="password" value={newEmployee.password} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Email:</label>
//         <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Phone:</label>
//         <input type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Gender:</label>
//         <input type="text" name="gender" value={newEmployee.gender} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>DOB:</label>
//         <input type="text" name="dob" value={newEmployee.dob} onChange={handleInputChange} />
//       </div>
//       <div>
//         <label>Department Name:</label>
//         <input type="text" name="department_Name" value={newEmployee.department_Name} onChange={handleInputChange} />
//       </div>
//       <button onClick={selectedEmployeeId ? handleUpdateEmployee : handleInsertEmployee}>
//         {selectedEmployeeId ? 'Update Employee' : 'Insert Employee'}
//       </button>
//     </div>
//   );
// };

// export default EmployeeComponent;








// EmployeeComponent.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployees, insertEmployee, updateEmployeeById, deleteEmployee } from './EmployeeSlice';

const EmployeeComponent = () => {
  const dispatch = useDispatch();
  const employees = useSelector((state) => state.employee.employees);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    password: '',
    email: '',
    phone: '',
    gender: '',
    dob: '',
    department_Name: '',
  });

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  const handleInputChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleInsertEmployee = () => {
    dispatch(insertEmployee(newEmployee));
    setNewEmployee({
      name: '',
      password: '',
      email: '',
      phone: '',
      gender: '',
      dob: '',
      department_Name: '',
    });
  };

  const handleUpdateEmployee = () => {
    if (selectedEmployeeId) {
      dispatch(updateEmployeeById(selectedEmployeeId, newEmployee));
      setSelectedEmployeeId(null);
      setNewEmployee({
        name: '',
        password: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        department_Name: '',
      });
    }
  };

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  useEffect(() => {
    dispatch(fetchAllEmployees());
  }, [dispatch]);

  return (
    <div>
      <h1>Employee List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>Department Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.gender}</td>
              <td>{employee.dob}</td>
              <td>{employee.departementName}</td>
              <td>
                <button onClick={() => setSelectedEmployeeId(employee.id)}>Edit</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>{selectedEmployeeId ? 'Update Employee' : 'Add New Employee'}</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} />
      </div>
      <div>
        <label>Password:</label>
        <input type="text" name="password" value={newEmployee.password} onChange={handleInputChange} />
      </div>
      <div>
        <label>Email:</label>
        <input type="text" name="email" value={newEmployee.email} onChange={handleInputChange} />
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" name="phone" value={newEmployee.phone} onChange={handleInputChange} />
      </div>
      <div>
        <label>Gender:</label>
        <input type="text" name="gender" value={newEmployee.gender} onChange={handleInputChange} />
      </div>
      <div>
        <label>DOB:</label>
        <input type="text" name="dob" value={newEmployee.dob} onChange={handleInputChange} />
      </div>
      <div>
        <label>Department Name:</label>
        <input type="text" name="department_Name" value={newEmployee.department_Name} onChange={handleInputChange} />
      </div>
      <button onClick={selectedEmployeeId ? handleUpdateEmployee : handleInsertEmployee}>
        {selectedEmployeeId ? 'Update Employee' : 'Insert Employee'}
      </button>
    </div>
  );
};

export default EmployeeComponent;
