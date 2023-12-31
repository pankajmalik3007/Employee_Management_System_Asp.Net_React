using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models_Library.View_Models
{
    public class EmployeeSalaryViewModel
    {
        public int EmpId { get; set; }
        public string EmpName { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public string DepartmentName { get; set; }
    }

    public class SallaryInsertModel
    {
        public string Emp_Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
    }

    public class SallaryUpdateModel : SallaryInsertModel
    {
        public int Id { get; set; }
    }
}
