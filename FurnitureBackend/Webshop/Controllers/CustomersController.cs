using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Webshop.Data;
using Webshop.Domain;
using Webshop.JWT;
using BC = BCrypt.Net.BCrypt;



namespace Webshop.Controllers
{
    public class Token {
        public string token { get; set; }


    }

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {

        //Authorize 
        private readonly IJWTAuthenticatorManager jwtAuthenticatorManager;
        private readonly WebshopContext _context;

        public CustomersController(WebshopContext context, IJWTAuthenticatorManager jwtAuthenticatorManager)
        {
            _context = context;
            this.jwtAuthenticatorManager = jwtAuthenticatorManager;

        }
        
        
        /*FOR
      [AllowAnonymous]
      [HttpPost]
      [Route("VerifyPassword")]
      public async Task<ActionResult<Login>> VerifyPassword(Login login)
      {
          var customer = await _context.Customers.Include(s => s.Login).FirstOrDefaultAsync(s => s.Login.Email == login.Email);
          if (customer == null)
          {
              //TODO ERROR HANDLING
              return Unauthorized();
          }            
          else
          {
              bool i = BC.Verify(login.Password, customer.Login.Password);
              Console.WriteLine(i);
              if (!i)
              {
                  return Unauthorized();
              }
              else
              {
                  //TODO Create user token with JWT
                  var token = jwtAuthenticatorManager.Authenticate(customer);
                  if (token == null)
                  {
                      return Unauthorized();
                  }
                  Console.WriteLine(token);
                  return Ok(token);

              }
          }
      }
        */

        [AllowAnonymous]
        [HttpGet]
        [Route("VerifyPassword")]
        public async Task<ActionResult<string>> VerifyPassword([FromQuery(Name = "email")] string email, [FromQuery(Name = "password")] string password)
        {
            var customer = await _context.Customers.Include(s => s.Login).FirstOrDefaultAsync(s => s.Login.Email == email);
            if (customer == null)
            {
                //TODO ERROR HANDLING
                return Unauthorized();
            }            
            else
            {
                bool i = BC.Verify(password, customer.Login.Password);
                Console.WriteLine(i);
                if (!i)
                {
                    return Unauthorized();
                }
                else
                {
                    //TODO Create user token with JWT
                    var token = jwtAuthenticatorManager.Authenticate(customer);
                    if (token == null)
                    {
                        return Unauthorized();
                    }
                    Console.WriteLine(token);
                    Token ttoken = new Token();
                    ttoken.token = token;
                    return ttoken;
                    
                }
            }
        }
        
       


        [HttpGet("GetRole/{id}")]
        //[Route("GetRole")]
        public async Task<ActionResult<Customer>> GetRole(int id)
        {
            //TODO Dunno om det laves sådan men den burde kun returne et Rollen personen har
            var customer = await _context.Customers
                                    .Include(s => s.Login)
                                    .FirstOrDefaultAsync(s => s.Id == id);
            
            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCustomer(Customer customer)
        {
            //CHECK FOR Kontoen allerede findes
            Login login = await _context.Logins.FirstOrDefaultAsync(s => customer.Login.Email == s.Email);
            if (login == null)
            {
                //TODO SKAL LAVES PÆNERE 
                string testHash = BC.HashPassword(customer.Login.Password);
                customer.Login.Password = testHash;
                _context.Customers.Add(customer);

                await _context.SaveChangesAsync();

                //Er der for at password ikke skal sendes tilbage til kunden og skal måske have en return med NOCONTENT funktionen istedetfor
                customer.Login.Password = null;


            }
            else
            {
                return Ok("Didnt get created");
            }
            return CreatedAtAction("GetCustomer", new { id = customer.Id }, customer);
        }


        #region Scaffolded code

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            return await _context.Customers.Include(s => s.Login).ToListAsync();
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _context.Customers.Include(s => s.Login).FirstOrDefaultAsync(s => s.Id == id);

            if (customer == null)
            {
                return NotFound();
            }

            return customer;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            _context.Entry(customer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
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

       
        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();

            return NoContent();
        }



        private bool CustomerExists(int id)
        {
            return _context.Customers.Any(e => e.Id == id);
        }
        #endregion
    }
}
