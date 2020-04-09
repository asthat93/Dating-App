using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.DataAccess.Repository.Interface
{
   public interface IAuthRepository
    {
        Task<Users> Register(Users user,string password);

        Task<Users> Login(string username,string password);

        Task<bool> UserExists(string username);


    }
}
