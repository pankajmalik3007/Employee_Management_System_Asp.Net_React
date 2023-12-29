

class BaseUrl {
    static apiBaseUrl = 'https://localhost:44311/api/';
  
    static getAllEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/getAllEmployee`;
    static insertEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/InsertEmployee`;
    static updateEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/UpdateEmployee`;
    static deleteEmployeeUrl = `${BaseUrl.apiBaseUrl}Employee/DeleteEmployee`;
  }
  
  export default BaseUrl;
  