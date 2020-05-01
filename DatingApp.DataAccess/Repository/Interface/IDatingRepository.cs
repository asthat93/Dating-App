using DatingApp.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.DataAccess.Repository.Interface
{
    public interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();
        Task<Users> GetUser(int Id);
        Task<IEnumerable<Users>> GetUsers();
    }
}
