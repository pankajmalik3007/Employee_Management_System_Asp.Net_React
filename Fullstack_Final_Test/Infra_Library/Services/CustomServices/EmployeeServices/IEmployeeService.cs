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
    public interface IEmployeeService
    {
        Task<ICollection<EmployeeViewModel>> GetAll();
        Task<ICollection<EmployeeViewModel>> SearchByName(string name);
        Task<EmployeeViewModel> Get(int id);
        Task<bool> Insert(EmployeeInsertModel employeeInsertModel);
        Task<bool> Update(EmployeeUpdateModel employeeUpdateModel);
        Task<bool> Delete(int id);
        Task<Employee> Find(Expression<Func<Employee, bool>> match);
    }
}
