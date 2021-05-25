using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using Webshop.Domain;

namespace Webshop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly WebshopContext _context;

        public LoginsController(WebshopContext context)
        {
            _context = context;
        }

        // GET: api/Logins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Logins>>> GetLogins()
        {
            return await _context.Logins.ToListAsync();
        }

        // GET: api/Logins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Logins>> GetLogins(int id)
        {
            var logins = await _context.Logins.FindAsync(id);

            if (logins == null)
            {
                return NotFound();
            }

            return logins;
        }

        // PUT: api/Logins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLogins(int id, Logins logins)
        {
            if (id != logins.Id)
            {
                return BadRequest();
            }

            _context.Entry(logins).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Logins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Logins>> PostLogins(Logins logins)
        {
            _context.Logins.Add(logins);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLogins", new { id = logins.Id }, logins);
        }

        // DELETE: api/Logins/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLogins(int id)
        {
            var logins = await _context.Logins.FindAsync(id);
            if (logins == null)
            {
                return NotFound();
            }

            _context.Logins.Remove(logins);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginsExists(int id)
        {
            return _context.Logins.Any(e => e.Id == id);
        }
    }
}
