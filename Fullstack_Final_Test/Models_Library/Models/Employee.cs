using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace Models_Library.Models
{
    public class Employee : BaseEntity
    {
        [Required(ErrorMessage = "Please Enter UserName...!")]
        [StringLength(100)]

        public string Name { get; set; }
        [Required]
        [StringLength(50)]
        public string password { get; set; }
        [RegularExpression(@"/\S+@\S+\.\S/", ErrorMessage = "Enter Valid Email...!")]

        public string Email { get; set; }
        [RegularExpression(@"/^[+]?(\d{1,2})+\-(\d{10})/", ErrorMessage = "Enter Valid Phone No eg(+91-1234578596)...!")]

        public string Phone { get; set; }
        [Required(ErrorMessage = "Please Enter UserName...!")]
        [StringLength(100)]
        public string Gender { get; set; }
        public DateTime DOB { get; set; }
        public int DeptId { get; set; }

        [JsonIgnore]
        public Department Department { get; set; }

        public virtual List<Salary> Salaries { get; set; }
    }
}
