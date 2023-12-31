using Infra_Library.Context;
using Infra_Library.Repositories;
using Models_Library.Models;
using Models_Library.View_Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Services.CustomServices.DepartmentServices
{
    public class DepartmentService : IDepartmentService
    {

        private readonly IRepository<Department> _repository;
        private readonly IRepository<Salary> _salaryRepository;
        private readonly MainDbContext _mainDbContext;
        public DepartmentService(IRepository<Department> repository , MainDbContext mainDbContext, IRepository<Salary> salaryRepository)
        {
            _repository = repository;
            _salaryRepository = salaryRepository;
            _mainDbContext = mainDbContext;
        }
        public async Task<bool> Delete(int id)
        {
            if (id != null)
            {
                Department department = await _repository.Get(id);
                if (department != null)
                {
                    return await _repository.Delete(department);
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

        public async Task<Department> Find(Expression<Func<Department, bool>> match)
        {
           return await _repository.Find(match);
        }

        public async Task<DepartmentViewModel> Get(int id)
        {
            Department department = await _repository.Get(id);
            if(department == null)
            {
                return null;
            }
            DepartmentViewModel department1 = new()
            {
                Id = department.Id,
                Name = department.Name,
            };
            return department1;
        }

        public async Task<ICollection<DepartmentViewModel>> GetAll()
        {
            ICollection<DepartmentViewModel> result = new List<DepartmentViewModel>();
            ICollection<Department> movies = await _repository.GetAll();
            foreach (Department movie in movies)
            {
                DepartmentViewModel movieviewmodel = new()
                {
                    Id = movie.Id,
                    Name= movie.Name,

                };
                result.Add(movieviewmodel);
            }
            return result;
        }


        public async Task<Dictionary<string, decimal>> GetMonthlySalaryByDepartment(int year)
        {
            try
            {
                var salaries = await _salaryRepository.FindAll(
                    s => s.Date.Year == year,
                    s => s.Employee,
                    s => s.Employee.Department
                );

                var departmentSalaries = new Dictionary<string, decimal>();

                foreach (var salary in salaries)
                {
                    var departmentName = salary.Employee?.Department?.Name;
                    var month = salary.Date.ToString("MMMM");

                    if (!string.IsNullOrEmpty(departmentName))
                    {
                        if (departmentSalaries.ContainsKey(departmentName))
                        {
                            departmentSalaries[departmentName] += salary.Amount;
                        }
                        else
                        {
                            departmentSalaries[departmentName] = salary.Amount;
                        }
                    }
                }

                return departmentSalaries;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An error occurred in GetMonthlySalaryByDepartment: {ex.Message}");
                throw;
            }
        }


        public Task<bool> Insert(DepartmentInsertModel departmentInsertModel)
        {
            Department department = new()
            {
                Name = departmentInsertModel.Name,
            };
            return _repository.Insert(department);
        }

        public async Task<bool> Update(DepartmentUpdateModel departmentUpdateModel)
        {
            Department department = await _repository.Get(departmentUpdateModel.Id);

            if(department != null)
            {
                department.Name = departmentUpdateModel.Name;
                var dep = await _repository.Update(department);
                return dep;
            }
            else
            {
                return false;
            }
        }
    }
}
