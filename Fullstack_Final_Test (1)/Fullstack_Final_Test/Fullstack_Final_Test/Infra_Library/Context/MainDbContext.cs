/*using Microsoft.EntityFrameworkCore;
using Models_Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infra_Library.Context
{
    public class MainDbContext : DbContext
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Salary> Salary { get; set; }
        public MainDbContext(DbContextOptions options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                 .HasOne(d => d.Department)
                 .WithMany(e => e.Employees)
                 .HasForeignKey(e => e.DeptId)
                 .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<Salary>()
                .HasOne(d => d.Employee)
                .WithMany(d => d.Salaries)
                .HasForeignKey(e => e.EmpId)
                .OnDelete(DeleteBehavior.Cascade);


        }
    }
}



*/

using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Models_Library.Models;


namespace Infra_Library.Context
{
    public class MainDbContext : IdentityDbContext<User>
    {
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Department> Department { get; set; }
        public DbSet<Salary> Salary { get; set; }

        public MainDbContext(DbContextOptions<MainDbContext> options) : base(options) { }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                .HasOne(d => d.Department)
                .WithMany(e => e.Employees)
                .HasForeignKey(e => e.DeptId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Salary>()
                .HasOne(d => d.Employee)
                .WithMany(d => d.Salaries)
                .HasForeignKey(e => e.EmpId)
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
