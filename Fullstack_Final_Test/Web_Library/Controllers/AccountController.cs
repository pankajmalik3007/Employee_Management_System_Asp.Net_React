using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Models_Library.Models;
using Models_Library.View_Models;
using Web_Library.Auth;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Infra_Library.Context;

namespace Web_Library.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly MainDbContext _dbContext;
        private readonly IJWTAuthManager _jwtAuthManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, MainDbContext dbContext, IJWTAuthManager jwtAuthManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _dbContext = dbContext;
            _jwtAuthManager = jwtAuthManager;
        }
         [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserInsertModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid registration data", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }
            var user = new User
            {
                UserName = model.Email,
                Email = model.Email,
                FirstName = model.FirstName,
                LastName = model.LastName,
            };

            var result = await _userManager.CreateAsync(user, model.password);

            if (result.Succeeded)
            {
                return Ok(new { Message = "Registration successful", UserId = user.Id });
            }

            return BadRequest(new { Message = "Registration failed", Errors = result.Errors });
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { Message = "Invalid login data", Errors = ModelState.Values.SelectMany(v => v.Errors) });
            }

            var result = await _signInManager.PasswordSignInAsync(model.Email, model.Password, false, lockoutOnFailure: false);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);
                var token = _jwtAuthManager.GenerateJWT(user);

                return Ok(new { Message = "Login successful", Token = token });
            }

           if (result.IsNotAllowed)
            {
                return BadRequest(new { Message = "Login failed", Errors = "Account is not allowed to log in." });
            }

            return BadRequest(new { Message = "Login failed", Errors = "Invalid login attempt" });
        }
        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { Message = "Logout successful" });
        }
         [HttpGet("getallusers")]
        
        public IActionResult GetAllUsers()
        {
            var users = _dbContext.Users.ToList();
            return Ok(users);
        }
    }
}
