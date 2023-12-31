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
    public interface ISallaryService
    {
        Task<ICollection<EmployeeSalaryViewModel>> GetAll();
        Task<EmployeeSalaryViewModel> Get(int id);
        Task<bool> Insert(SallaryInsertModel sallaryInsertModel);
        Task<bool> Update(SallaryUpdateModel sallaryUpdateModel);
        Task<bool> Delete(int id);
        Task<Salary> Find(Expression<Func<Salary, bool>> match);
        Task<ICollection<EmployeeSalaryViewModel>> GetEmployeesInSalaryRange(decimal minSalary, decimal maxSalary);


    }
}
