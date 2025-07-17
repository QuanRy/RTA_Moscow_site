using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using FrequencyVisualization.Services;
using FrequencyVisualization.ObjectModel;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using FrequencyVisualization.ObjectModel.ViewModel;
using Microsoft.AspNetCore.Authorization;

namespace FrequencyVisualizationWebAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private IUserService UserService { get; set; }


        public UserController(IUserService userService)
        {
            UserService = userService;
        }

        [HttpPost("login")]
        public ActionResult<UserViewModel> Login(string login, string password)
        {
            var user = UserService.GetUserByLoginAndPassword(login, password);
            if (user == null)
            {
                return Unauthorized();
            }
            var token = GenerateToken(login);
            UserViewModel userViewModel = new UserViewModel
            {
                Id = user.Id,
                TokenUser = token,
            };
            return userViewModel;
        }

        [HttpPost]
        // [Authorize]
        public ActionResult<User> CreateUser(string fio, string login, string password, string role)
        {
            try
            {
                return UserService.CreateUser(fio, login, password, role);
            }
            catch (Exception ex)
            {
                return BadRequest(new { error = ex.Message });  // Возвращаем только текст ошибки
            }
        }

        //[HttpDelete]
        //public ActionResult Delete(Guid id)
        //{
        //    try
        //    {
        //        UserService.DeleteUser(id);
        //        return Ok();
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex);
        //    }
        //}

        public string GenerateToken (string userName) 
        {
            var claims = new List<Claim> { new Claim(ClaimTypes.Name, userName) };
            // создаем JWT-токен
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
            audience: AuthOptions.AUDIENCE,
            claims: claims,
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }
    }
}
