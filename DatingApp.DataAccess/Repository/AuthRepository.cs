using DatingApp.DataAccess.Repository.Interface;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.DataAccess.Repository
{
    public class AuthRepository : IAuthRepository
    {
        public ApplicationDbContext _dbContext { get; set; }

        public AuthRepository(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Users> Login(string username, string password)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(users => users.Username == username);

            if (user == null)
                return null;

            if (!VerfiyPasswordHash(user, password))
                return null;

            return user;


        }

        private bool VerfiyPasswordHash(Users user, string password)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(user.PasswordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i=0;i<computedHash.Length;i++)
                {
                    if (computedHash[i] != user.PasswordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<Users> Register(Users user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();

            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            Users user = await _dbContext.Users.FirstOrDefaultAsync(user => user.Username == username);

            if (user == null)
                return false;

            return true;
        }
    }
}
