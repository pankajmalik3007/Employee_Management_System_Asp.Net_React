using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models_Library.Models
{
    public class Department : BaseEntity
    {
        [Required(ErrorMessage = "Please Enter UserName...!")]
        [StringLength(100)]
        public string Name { get; set; }
        [JsonIgnore] 
        public virtual List<Employee> Employees { get; set; }
    }
}
