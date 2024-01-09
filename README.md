# Employee_Management_System.
## Technologies :
- **Backend :**.Net Core APIs.
- **Database :** SQL Server.
- **Frontend :** ReactJS.

## Project Details :
Design and implement RESTful APIs for a simple Employee Management Module. 
Using which the system can manage (create, read, update, and delete) the following entities.

- Employee (Id, Name, Email, Phone, Gender, DOB, DeptId)
- Department (Id, Name)
- Salary (Id, EmpId, Amount, Date)

## Business Needs :
- **Employee Management :**
Create, read, update, and delete operations for employee records.
Capture essential employee information like Name, Email, Phone, Gender, Date of Birth, and Department.

- **Department Management :**
Create, read, update, and delete operations for department records.
Associate each employee with a specific department.

- **Salary Management :**
Create, read, update, and delete operations for salary records.
Link salary information to specific employees.

- **Employee Search :**
Implement a search functionality to find employees based on their name.
Return detailed information about employees, including department name.

- **Department-wise Salary Reporting:**
Retrieve monthly salary amounts for each department for a given year.

- **Salary Range Filter :**
Allow users to filter employees based on salary range.
Return employee details, including name, salary, and department, within the specified range.

- **Basic Validations :**
Ensure all APIs have necessary input validations to maintain data integrity.

- **API Authentication :**
Implement user registration, login, and logout functionalities for API authentication.

- **Error Handling:**
Implement robust error handling mechanisms to provide meaningful feedback in case of issues.

- **Logging :**
Implement logging to capture and analyze events, errors, or important transactions.

- **EF/Linque Usage :**
Leverage Entity Framework (EF) and LINQ for efficient data access and manipulation

- **Onion/N-Tier Architecture :**
Implement a structured architecture for scalability, maintainability, and separation of concerns.

- **Clean and Readable Code:**
Develop code that is clean, well-organized, and easy to understand for future maintenance.

## Real-Time Events :
- **User Registration:**
- Event: New user registration in the system.
- Implication: Capture and store user information for authentication.

- **User Login/Logout:**
- Event: User login or logout.
- Implication: Track user activities and manage access to the system.

- **Employee Creation/Modification/Deletion:**
- Event: Creation, modification, or deletion of employee records.
- Implication: Update employee information and maintain data integrity.

- **Department Creation/Modification/Deletion:**
- Event: Creation, modification, or deletion of department records.
- Implication: Reflect changes in department structures and update employee associations.

- **Salary Record Updates:**
- Event: Modification or deletion of salary records.
- Implication: Ensure accurate salary information for employees.

- **Employee Search:**
- Event: Employee search based on name.
- Implication: Retrieve and display relevant employee information in real-time.

- **Department-wise Salary Reporting:**
- Event: Request for department-wise salary reporting.
- Implication: Dynamically calculate and provide salary information for the specified year.

- **Salary Range Filter:**
- Event: Filter employees based on salary range.
- Implication: Display a real-time updated list of employees within the specified salary range.

- **UI Interaction:**
- Event: User interacts with the ReactJS UI (e.g., searching, editing, deleting, adding records).
- Implication: Trigger corresponding API calls and update the UI in real-time.

## Deliverables :
- Create basic CRUD APIs for each entity mentioned above.
- Create an API that will take Employee Name as an input and return a list of employees 
  (all of employee’s fields and department name) (case insensitive search)
- Create an API that returns Department wise monthly salary amount of a given year
- Create an API that will take the Salary Range as an input and return all employees in 
  that range with their name, salary, and department name.
- All APIs should have all basic validations implemented
- Use fluent validation (Optional)
- API Authentication using Identity (User Registration, Login and Log out)
- Error handling should be implemented
- A logger should be implemented
- Use EF/Linq
- Implement Onion or N-Tier architecture
- The code should be clean and readable
- Develop UI using ReactJS for Employee List (Grid)
- Grid should have an Actions Column for Edit and Delete operations
- Add search text box to filter records in the grid
- On the top of the page, add a button to add new employee record
- For this UI development, use the existing APIs created above.

### Prerequisites

- Install [Visual Studio](https://visualstudio.microsoft.com/) for ASP.NET development.
- Set up [Microsoft SQL Server Management Studio](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms).

1. Clone the repository.
   ```bash
   git clone https://github.com/pankajmalik3007/Employee_Management_System_Asp.Net_React.git
   
