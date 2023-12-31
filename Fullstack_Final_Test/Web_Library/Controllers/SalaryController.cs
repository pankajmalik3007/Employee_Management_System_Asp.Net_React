using Infra_Library.Services.CustomServices.SalaryServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Models_Library.View_Models;

namespace Web_Library.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class SalaryController : ControllerBase
    {
        private readonly ISallaryService _salaryService;
        private readonly ILogger<SalaryController> _logger;

        public SalaryController(ISallaryService salaryService, ILogger<SalaryController> logger)
        {
            _salaryService = salaryService;
            _logger = logger;
        }

        [Route("getAllSalaries")]
        [HttpGet]
        public async Task<ActionResult<ICollection<EmployeeSalaryViewModel>>> GetAllSalaries()
        {
            try
            {
                var result = await _salaryService.GetAll();
                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetAllSalaries: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("getSalaryById")]
        [HttpGet]
        public async Task<ActionResult<EmployeeSalaryViewModel>> GetSalaryById(int id)
        {
            try
            {
                var result = await _salaryService.Get(id);

                if (result == null)
                {
                    return BadRequest("Salary Not Found...!");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetSalaryById: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("getSalariesInSalaryRange")]
        [HttpGet]
        public async Task<ActionResult<ICollection<EmployeeSalaryViewModel>>> GetSalariesInSalaryRange(decimal minSalary, decimal maxSalary)
        {
            try
            {
                var result = await _salaryService.GetEmployeesInSalaryRange(minSalary, maxSalary);

                if (result == null || result.Count == 0)
                {
                    return BadRequest("No salaries found in the specified range");
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in GetSalariesInSalaryRange: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("insertSalary")]
        [HttpPost]
        public async Task<IActionResult> InsertSalary(SallaryInsertModel sallaryInsertModel)
        {
            try
            {
                var result = await _salaryService.Insert(sallaryInsertModel);

                if (result == true)
                {
                    return Ok("Salary Inserted Successfully");
                }

                return BadRequest("Something Went Wrong. Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in InsertSalary: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("updateSalary")]
        [HttpPut]
        public async Task<IActionResult> UpdateSalary(SallaryUpdateModel sallaryUpdateModel)
        {
            try
            {
                var result = await _salaryService.Update(sallaryUpdateModel);

                if (result == true)
                {
                    return Ok("Salary Updated Successfully");
                }

                return BadRequest("Something Went Wrong. Please try After Some Time...!");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in UpdateSalary: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }

        [Route("deleteSalary")]
        [HttpDelete]
        public async Task<IActionResult> DeleteSalary(int id)
        {
            try
            {
                var result = await _salaryService.Delete(id);

                if (result == true)
                {
                    return Ok("Salary Deleted Successfully");
                }

                return BadRequest("Something Went Wrong");
            }
            catch (Exception ex)
            {
                _logger.LogError($"An error occurred in DeleteSalary: {ex.Message}");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal Server Error");
            }
        }
    }
}
