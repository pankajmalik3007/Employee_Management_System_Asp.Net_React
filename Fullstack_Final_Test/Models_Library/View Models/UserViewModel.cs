using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models_Library.View_Models
{
    public class UserViewModel
    {
        public string Name { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }
    }

    public class UserInsertModel
    {
        [StringLength(100)]
        public string? FirstName { get; set; }
        [StringLength(100)]

        
        public string? LastName { get; set; }
        [EmailAddress]
        public  string Email { get; set; }
        public string password { get; set; }    
       
    }
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
