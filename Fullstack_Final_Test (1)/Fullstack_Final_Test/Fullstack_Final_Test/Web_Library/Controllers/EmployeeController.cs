using Infra_Library.Services.CustomServices.EmployeeServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Models_Library.View_Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Web_Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly ILogger<EmployeeController> _logger;

        public EmployeeController(IEmployeeService employeeService, ILogger<EmployeeController> logger)
        {
            _employeeService = employeeService;
            _logger = logger;
        }

        [Route("getAllEmployee")]
        [HttpGet]
        public async Task<ActionResult<EmployeeViewModel>> getAllEmployee()
        {
            try
            {
                var result = await _employeeService.GetAll();
                if (result == null)
                {
                    return BadRequest("Employee Not Found...!");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in getAllEmployee: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("getEmployeeById")]
        [HttpGet]
        public async Task<ActionResult<EmployeeViewModel>> getEmployeeById(int id)
        {
            try
            {
                var result = await _employeeService.Get(id);
                if (result == null)
                {
                    return BadRequest("Employee Not Found...!");
                }
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in getEmployeeById: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("InsertEmployee")]
        [HttpPost]
       
        public async Task<IActionResult> InsertEmployee(EmployeeInsertModel employeeInsertModel)
        {
            try
            {
                var emp = await _employeeService.Insert(employeeInsertModel);
                if (emp == true)
                {
                    return Ok("Employee Inserted Successfully");
                }
                return BadRequest("Something Went Wrong Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in InsertEmployee: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("UpdateEmployee")]
        [HttpPut]
        public async Task<IActionResult> UpdateEmployee(EmployeeUpdateModel employeeUpdateModel)
        {
            try
            {
                var emp = await _employeeService.Update(employeeUpdateModel);
                if (emp == true)
                {
                    return Ok("Employee Updated Successfully");
                }
                return BadRequest("Something Went Wrong Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in UpdateEmployee: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("DeleteEmployee")]
        [HttpDelete]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            try
            {
                var res = await _employeeService.Delete(id);
                if (res == true)
                {
                    return Ok("Directed Deleted Successfully");
                }
                else
                {
                    return BadRequest("Something Went Wrong");
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in DeleteEmployee: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("SearchByName")]
        [HttpGet]
        public async Task<ActionResult<ICollection<EmployeeViewModel>>> SearchByName(string name)
        {
            try
            {
                var result = await _employeeService.SearchByName(name);

                if (result == null || result.Count == 0)
                {
                    return BadRequest($"No employees found with the name '{name}'");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in SearchByName: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
    }
}
