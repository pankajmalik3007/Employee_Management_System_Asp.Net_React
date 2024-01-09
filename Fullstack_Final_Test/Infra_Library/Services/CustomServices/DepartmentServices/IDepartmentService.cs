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
    public interface IDepartmentService
    {
        Task<ICollection<DepartmentViewModel>> GetAll();
        Task<DepartmentViewModel> Get(int id);
        Task<bool> Insert(DepartmentInsertModel departmentInsertModel);
        Task<bool> Update(DepartmentUpdateModel departmentUpdateModel);
        Task<bool> Delete(int id);
        Task<Department> Find(Expression<Func<Department, bool>> match);
         Task<Dictionary<string, Dictionary<string, decimal>>> GetMonthlySalaryByDepartment(int year);
    }
}
