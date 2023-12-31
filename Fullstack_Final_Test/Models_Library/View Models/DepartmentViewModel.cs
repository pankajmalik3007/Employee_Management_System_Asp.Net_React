using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models_Library.View_Models
{
    public class DepartmentViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class DepartmentInsertModel
    {
        public string Name { get; set; }
    }

    public class DepartmentUpdateModel : DepartmentInsertModel
    {
        public int Id { get; set; }
    }
}
