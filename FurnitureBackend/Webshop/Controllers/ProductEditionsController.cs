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
    public class ProductEditionsController : ControllerBase
    {
        private readonly WebshopContext _context;

        public ProductEditionsController(WebshopContext context)
        {
            _context = context;
        }

        // GET: api/ProductEditions
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProductEdition>>> GetProductEditions()
        {
            return await _context.ProductEditions.ToListAsync();
        }

        // GET: api/ProductEditions/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProductEdition>> GetProductEdition(int id)
        {
            var productEdition = await _context.ProductEditions.FindAsync(id);

            if (productEdition == null)
            {
                return NotFound();
            }

            return productEdition;
        }

        // PUT: api/ProductEditions/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProductEdition(int id, ProductEdition productEdition)
        {
            if (id != productEdition.Id)
            {
                return BadRequest();
            }

            _context.Entry(productEdition).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductEditionExists(id))
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

        // POST: api/ProductEditions
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ProductEdition>> PostProductEdition(ProductEdition productEdition)
        {
            _context.ProductEditions.Add(productEdition);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProductEdition", new { id = productEdition.Id }, productEdition);
        }

        // DELETE: api/ProductEditions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProductEdition(int id)
        {
            var productEdition = await _context.ProductEditions.FindAsync(id);
            if (productEdition == null)
            {
                return NotFound();
            }

            _context.ProductEditions.Remove(productEdition);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ProductEditionExists(int id)
        {
            return _context.ProductEditions.Any(e => e.Id == id);
        }
    }
}
