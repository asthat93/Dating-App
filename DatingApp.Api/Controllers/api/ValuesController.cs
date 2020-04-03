using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.DataAccess;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Api.Controllers.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {     
            public ApplicationDbContext _db { get; set; }

            public ValuesController(ApplicationDbContext db)
            {
                _db = db;
            }
            // GET: api/Values
            [HttpGet]
            public  async Task<IActionResult> Get()
            {
                var val =  await _db.Value.ToListAsync();
                return Ok(val);
            }

            // GET: api/Values/5
            [HttpGet("{id}", Name = "Get")]
            public async Task<IActionResult> Get(int id)
            {
                var val = await _db.Value.FirstOrDefaultAsync(x => x.Id == id);
                return Ok(val);
            }

            // POST: api/Values
            [HttpPost]
            public void Post([FromBody] string value)
            {
            }

            // PUT: api/Values/5
            [HttpPut("{id}")]
            public void Put(int id, [FromBody] string value)
            {
            }

            // DELETE: api/ApiWithActions/5
            [HttpDelete("{id}")]
            public void Delete(int id)
            {
            }
        }
    }


