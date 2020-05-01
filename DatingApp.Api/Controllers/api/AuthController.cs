using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DatingApp.Api.DataTransferObjects;
using DatingApp.DataAccess;
using DatingApp.DataAccess.Repository.Interface;
using DatingApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace DatingApp.Api.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private IAuthRepository _authRepository { get; set; }
        private IConfiguration _configuration { get; set; }

        public AuthController(IAuthRepository authRepository,IConfiguration configuration)
        {
            _authRepository = authRepository;
            _configuration = configuration;
        }

        [HttpPost("register")]
        
        public async Task<IActionResult> Register([FromBody]RegisterUserDTO registerUserDTO)
        {
            registerUserDTO.Username = registerUserDTO.Username.ToLower();
            if(await _authRepository.UserExists(registerUserDTO.Username))
            {
                return BadRequest("User already exist");
            }

            var NewUser = new Users
            {
                Username = registerUserDTO.Username
            };

            var CraetedNewUser = await _authRepository.Register(NewUser, registerUserDTO.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]

        public async Task<IActionResult> Login(UserForLoginDTO userForLoginDTO)
        {

            var userFromRepo = await _authRepository.Login(userForLoginDTO.Username.ToLower(), userForLoginDTO.Password);
            if (userFromRepo == null)
                return Unauthorized();

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name,userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new { token = tokenHandler.WriteToken(token) });
        }

        }
}