using DatingApp.DataAccess.Repository.Interface;
using DatingApp.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.DataAccess.Repository
{
   public class DatingRepository : IDatingRepository
    {
        private readonly ApplicationDbContext _context;

        public DatingRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Users> GetUser(int id)
        {
            var user = await _context.Users.Include(p => p.Photos).FirstOrDefaultAsync(x => x.Id == id);
            return user;
        }


        public async Task<IEnumerable<Users>> GetUsers()
        {
            var users = await _context.Users.Include(p => p.Photos).ToListAsync();
            return users;
        }

        public async  Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0; 
        }
    }
}
