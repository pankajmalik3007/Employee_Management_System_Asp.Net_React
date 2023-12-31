using Infra_Library.Services.CustomServices.DepartmentServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models_Library.View_Models;

namespace Web_Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]

    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentService _departmentService;
        private readonly ILogger<DepartmentController> _logger;

        public DepartmentController(IDepartmentService departmentService, ILogger<DepartmentController> logger)
        {
            _departmentService = departmentService;
            _logger = logger;
        }

        [HttpGet("getAllDepartments")]
       
        public async Task<ActionResult<ICollection<DepartmentViewModel>>> GetAllDepartments()
        {
            try
            {
                var result = await _departmentService.GetAll();
                if (result == null)
                {
                    return BadRequest("Departments Not Found...!");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetAllDepartments: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("getDepartmentById")]
        public async Task<ActionResult<DepartmentViewModel>> GetDepartmentById(int id)
        {
            try
            {
                var result = await _departmentService.Get(id);
                if (result == null)
                {
                    return BadRequest("Department Not Found...!");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetDepartmentById: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPost("insertDepartment")]
        public async Task<IActionResult> InsertDepartment(DepartmentInsertModel departmentInsertModel)
        {
            try
            {
                var isInserted = await _departmentService.Insert(departmentInsertModel);
                if (isInserted)
                {
                    return Ok("Department Inserted Successfully");
                }
                return BadRequest("Something Went Wrong Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in InsertDepartment: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpPut("updateDepartment")]
        public async Task<IActionResult> UpdateDepartment(DepartmentUpdateModel departmentUpdateModel)
        {
            try
            {
                var isUpdated = await _departmentService.Update(departmentUpdateModel);
                if (isUpdated)
                {
                    return Ok("Department Updated Successfully");
                }
                return BadRequest("Something Went Wrong Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in UpdateDepartment: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpDelete("deleteDepartment")]
        public async Task<IActionResult> DeleteDepartment(int id)
        {
            try
            {
                var isDeleted = await _departmentService.Delete(id);
                if (isDeleted)
                {
                    return Ok("Department Deleted Successfully");
                }
                return BadRequest("Something Went Wrong");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in DeleteDepartment: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("getMonthlySalaryByDepartment")]
        public async Task<ActionResult<Dictionary<string, decimal>>> GetMonthlySalaryByDepartment(int year)
        {
            try
            {
                var result = await _departmentService.GetMonthlySalaryByDepartment(year);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetMonthlySalaryByDepartment: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }
    }
}
