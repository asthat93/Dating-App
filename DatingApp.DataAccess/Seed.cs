using DatingApp.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;

namespace DatingApp.DataAccess
{
    public class Seed
    {
        public static void SeedUsers(ApplicationDbContext Context)
        {
            if (!Context.Users.Any())
            {
                var UserData = System.IO.File.ReadAllText(@"C:\Users\astha\source\repos\Udemey\CompleteGuideToAngularUsingDotNetCore\DatingApp\DatingApp.DataAccess\UserSeedData.json");
                var Users = JsonConvert.DeserializeObject<List<Users>>(UserData);
                foreach(var user in Users)
                {
                    byte [] passwordHash, passwordSalt;
                    CreatePasswordHash("password", out passwordHash, out passwordSalt);
                    user.PasswordHash = passwordHash;
                    user.PasswordSalt = passwordSalt;
                    user.Username = user.Username.ToLower();
                    Context.Users.Add(user);

                }
                Context.SaveChanges();
            }
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

    }
}
