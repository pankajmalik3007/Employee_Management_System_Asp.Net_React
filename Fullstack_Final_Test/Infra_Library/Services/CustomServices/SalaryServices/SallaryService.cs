using Infra_Library.Context;
using Infra_Library.Repositories;
using Microsoft.EntityFrameworkCore;
using Models_Library.Models;
using Models_Library.View_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomServices.SalaryServices
{
    public class SallaryService : ISallaryService
    {
        public IRepository<Salary> _salary;
        public IRepository<Department> _Department;
        public IRepository<Employee> _employee;
        private readonly MainDbContext _mainDbContext;

        public SallaryService(IRepository<Salary> salary, IRepository<Department> Department, IRepository<Employee> employee,  MainDbContext mainDbContext)
        {
            _salary = salary;
            _Department = Department;
            _employee = employee;
            _mainDbContext = mainDbContext;
        }


        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Salary salary = await _salary.Get(id);
                if (salary != null)
                {
                    return await _salary.Delete(salary);
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

        public Task<Salary> Find(Expression<Func<Salary, bool>> match)
        {
            throw new NotImplementedException();
        }

        public async Task<EmployeeSalaryViewModel> Get(int id)
        {
            var salary = await _mainDbContext.Salary
                .Include(s => s.Employee)
                .ThenInclude(e => e.Department)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (salary != null)
            {
                EmployeeSalaryViewModel employeeViewModel = new()
                {
                    Amount = salary.Amount,
                    Date = salary.Date
                };
                employeeViewModel.EmpName = salary.Employee?.Name;
                employeeViewModel.DepartmentName = salary.Employee?.Department?.Name;
                return employeeViewModel;
            }
            else
            {
                return null;
            }
        }

        public async Task<ICollection<EmployeeSalaryViewModel>> GetAll()
        {
            ICollection<EmployeeSalaryViewModel> employeeViewModels = new List<EmployeeSalaryViewModel>();
            ICollection<Salary> salaries = await _mainDbContext.Salary
                .Include(s => s.Employee)
                .ThenInclude(e => e.Department)
                .ToListAsync();

            foreach (Salary salary in salaries)
            {
                EmployeeSalaryViewModel employeeViewModel = new()
                {
                    EmpName = salary.Employee?.Name,
                    EmpId = salary.Id,
                    Amount = salary.Amount,
                    Date = salary.Date,
                    DepartmentName = salary.Employee?.Department?.Name
                };
                employeeViewModels.Add(employeeViewModel);
            }
            return employeeViewModels;
        }

        public async Task<ICollection<EmployeeSalaryViewModel>> GetEmployeesInSalaryRange(decimal minSalary, decimal maxSalary)
        {
            var salaries = await _mainDbContext.Salary
                .Include(s => s.Employee)
                .ThenInclude(e => e.Department)
                .Where(s => s.Amount >= minSalary && s.Amount <= maxSalary)
                .ToListAsync();

            var employeeSalaries = new List<EmployeeSalaryViewModel>();

            foreach (var salary in salaries)
            {
                var employee = salary.Employee;

                if (employee != null)
                {
                    var departmentName = employee.Department?.Name;

                    var employeeSalaryViewModel = new EmployeeSalaryViewModel
                    {
                        EmpId = employee.Id,
                        EmpName = employee.Name,
                        Amount = salary.Amount,
                        Date = salary.Date,
                        DepartmentName = departmentName
                    };

                    employeeSalaries.Add(employeeSalaryViewModel);
                }
            }

            return employeeSalaries;
        }

        public async  Task<bool> Insert(SallaryInsertModel sallaryInsertModel)
        {
            Employee employee = await _employee.Find(d => d.Name == sallaryInsertModel.Emp_Name);
            if (employee == null)
            {
                return false;
            }
            Salary salary = new()
            {
               Employee = employee,
               Amount = sallaryInsertModel.Amount,
               Date = sallaryInsertModel.Date,

            };
            return await _salary.Insert(salary);
        }

        public async Task<bool> Update(SallaryUpdateModel sallaryUpdateModel)
        {
            try
            {
                var salary = await _salary.Get(sallaryUpdateModel.Id);

                if (salary != null)
                {
                    var employee = await _employee.Find(e => e.Name == sallaryUpdateModel.Emp_Name);

                    if (employee == null)
                    {
                        return false;
                    }

                    salary.Employee = employee;
                    salary.Amount = sallaryUpdateModel.Amount;
                    salary.Date = sallaryUpdateModel.Date;

                    return await _salary.Update(salary);
                }
                else
                {
                    return false; 
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in Update: {ex.Message}");
                throw;
            }
        }

    }
}
