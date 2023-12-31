using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models_Library.View_Models
{
    public class EmployeeViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public string DepartementName { get; set; }
    }

    public class EmployeeInsertModel
    {
        public string Name { get; set; }
        public string password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public string DepartementName { get; set; }
    }

    public class EmployeeUpdateModel : EmployeeInsertModel
    {
        public int Id { get; set; }
    }

   
}
