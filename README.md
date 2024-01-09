# Employee_Management_System.
## Technologies.
- **Backend :**.Net Core APIs.
- **Database :** SQL Server.
- **Frontend :** ReactJS.

## Project Details
Design and implement RESTful APIs for a simple Employee Management Module. 
Using which the system can manage (create, read, update, and delete) the following entities.

- Employee (Id, Name, Email, Phone, Gender, DOB, DeptId)
- Department (Id, Name)
- Salary (Id, EmpId, Amount, Date)

## Deliverables
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
   git clone https://github.com/pankajmalik3007/Performance_Management_System_Using_Asp.net_React-js..git
   
