using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Models_Library.Models
{
    public class Salary : BaseEntity
    {
        [Required]
        [StringLength(50)]
        public int EmpId { get; set; }
        [Required]
        [StringLength(50)]
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        [JsonIgnore]

        public Employee Employee { get; set; }
    }
}
