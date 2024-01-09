
class BaseUrl {
  static apiBaseUrl = 'https://localhost:7127/api/';

  static getAllEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/getAllEmployee`;
  static insertEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/InsertEmployee`;
  static updateEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/UpdateEmployee`;
  static deleteEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/DeleteEmployee`;

  static getAllDepartmentUrl = `${BaseUrl.apiBaseUrl}Department/getAllDepartments`;
  static insertDepartmentUrl = `${BaseUrl.apiBaseUrl}Department/insertDepartment`;
  static updateDepartmentUrl = `${BaseUrl.apiBaseUrl}Department/updateDepartment`;
  static deleteDepartmentUrl = `${BaseUrl.apiBaseUrl}Department/deleteDepartment`;

  static getAllSalaryUrl = `${BaseUrl.apiBaseUrl}Salary/getAllSalaries`;
  static insertSalaryUrl = `${BaseUrl.apiBaseUrl}Salary/insertSalary`;
  static updateSalaryUrl = `${BaseUrl.apiBaseUrl}Salary/updateSalary`;
  static deleteSalaryUrl = `${BaseUrl.apiBaseUrl}Salary/deleteSalary`;

  static getSalariesInSalaryRangeUrl = `${BaseUrl.apiBaseUrl}Salary/getSalariesInSalaryRange`; 
  static getMonthlySalaryByDepartmentUrl = `${BaseUrl.apiBaseUrl}Department/getMonthlySalaryByDepartment`;
  static searchEmployeeByNameUrl = `${BaseUrl.apiBaseUrl}Employee/SearchByName`;

  static registerUrl = `${BaseUrl.apiBaseUrl}Account/register`;
  static loginUrl = `${BaseUrl.apiBaseUrl}Account/login`;
  static logoutUrl = `${BaseUrl.apiBaseUrl}Account/logout`;
}
export default BaseUrl;
