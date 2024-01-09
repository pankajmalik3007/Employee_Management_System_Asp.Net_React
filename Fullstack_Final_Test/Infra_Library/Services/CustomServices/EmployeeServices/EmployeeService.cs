using Infra_Library.Context;
using Infra_Library.Repositories;
using Microsoft.EntityFrameworkCore;
using Models_Library.Models;
using Models_Library.View_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Numerics;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomServices.EmployeeServices
{
    public class EmployeeService : IEmployeeService
    {
        private readonly IRepository<Employee> _employeeRepository;
        private readonly IRepository<Department> _employeeDepartmentRepository;
        private readonly MainDbContext _mainDbContext;
        public EmployeeService(IRepository<Employee> employeeRepository, MainDbContext mainDbContext, IRepository<Department> employeeDepartmentRepository)
        {
            _employeeRepository = employeeRepository;
            _employeeDepartmentRepository = employeeDepartmentRepository;
            _mainDbContext = mainDbContext;
        }
        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Employee employee = await _employeeRepository.Get(id);
                if (employee != null)
                {
                 return await _employeeRepository.Delete(employee);
                }
                else
                {
                    return false;
                }

            }
            else
            {
                return false;
            }
        }

        public Task<Employee> Find(Expression<Func<Employee, bool>> match)
        {
           return _employeeRepository.Find(match);
        }

        public async Task<EmployeeViewModel> Get(int id)
        {
            var employee = await _employeeRepository.FindAll(
                e => e.Id == id,
                emp => emp.Department
            );

            if (employee != null && employee.Any())
            {
                var firstEmployee = employee.First();

                EmployeeViewModel employeeViewModel = new()
                {
                    Id = firstEmployee.Id,
                    Name = firstEmployee.Name,
                    password = firstEmployee.password,
                    Email = firstEmployee.Email,
                    Phone = firstEmployee.Phone,
                    Gender = firstEmployee.Gender,
                    DOB = firstEmployee.DOB,
                    DepartementName = firstEmployee.Department?.Name
                };
                return employeeViewModel;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<EmployeeViewModel>> GetAll()
        {
            ICollection<EmployeeViewModel> employeeViewModels = new List<EmployeeViewModel>();
            ICollection<Employee> employees = await _employeeRepository.FindAll(
                e => true,
                emp => emp.Department
            );

            foreach (Employee employee in employees)
            {
                if (employee != null)
                {
                    EmployeeViewModel employeeViewModel = new()
                    {
                        Id = employee.Id,
                        Name = employee.Name,
                        password = employee.password,
                        Email = employee.Email,
                        Phone = employee.Phone,
                        Gender = employee.Gender,
                        DOB = employee.DOB,
                        DepartementName = employee.Department?.Name
                    };
                    employeeViewModels.Add(employeeViewModel);
                }
            }

            return employeeViewModels;
        }
         public async Task<bool> Insert(EmployeeInsertModel employeeInsertModel)
        {
            Department department = await _employeeDepartmentRepository.Find(d => d.Name == employeeInsertModel.DepartementName);
            if (department == null)
            {
                return false;
            }
            Employee employee = new()
            {
                  Name = employeeInsertModel.Name,
                  password = employeeInsertModel.password,
                  Email = employeeInsertModel.Email,
                  Phone = employeeInsertModel.Phone,
                  Gender = employeeInsertModel.Gender,
                  DOB = employeeInsertModel.DOB,
                  Department = department,
            };
            return await _employeeRepository.Insert(employee);
        }

        public async Task<ICollection<EmployeeViewModel>> SearchByName(string name)
        {
            try
            {
                var employees = await _mainDbContext.Employees
                    .Where(e => e.Name.ToLower().Contains(name.ToLower()))
                    .Include(emp => emp.Department)
                    .ToListAsync();

                ICollection<EmployeeViewModel> employeeViewModels = employees.Select(employee => new EmployeeViewModel
                {
                    Id = employee.Id,
                    Name = employee.Name,
                    password = employee.password,
                    Email = employee.Email,
                    Phone = employee.Phone,
                    Gender = employee.Gender,
                    DOB = employee.DOB,
                    DepartementName = employee?.Department?.Name,
                 }).ToList();

                return employeeViewModels;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in SearchByName: {ex.Message}");
                throw;
            }
        }
         public async Task<bool> Update(EmployeeUpdateModel employeeUpdateModel)
        {
            try
            {
                Employee existingEmployee = await _employeeRepository.Get(employeeUpdateModel.Id);

                if (existingEmployee == null)
                {
                    return false;
                }

                Department department = await _employeeDepartmentRepository.Find(d => d.Name == employeeUpdateModel.DepartementName);

                if (department == null)
                {
                    return false;
                }
                existingEmployee.Name = employeeUpdateModel.Name;
                existingEmployee.password = employeeUpdateModel.password;
                existingEmployee.Email = employeeUpdateModel.Email;
                existingEmployee.Phone = employeeUpdateModel.Phone;
                existingEmployee.Gender = employeeUpdateModel.Gender;
                existingEmployee.DOB = employeeUpdateModel.DOB;
                existingEmployee.Department = department;

                return await _employeeRepository.Update(existingEmployee);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in Update: {ex.Message}");
                throw;
            }
        }
     }
}
