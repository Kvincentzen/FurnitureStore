using System;
using Microsoft.EntityFrameworkCore;
using Webshop.Domain;


namespace Webshop.Data
{
    public class WebshopContext : DbContext
    {
        public DbSet<Logins> Logins { get; set; }

        public WebshopContext()
        {

        }

        public WebshopContext(DbContextOptions<WebshopContext> options) 
            : base(options)
        {
            
        }
       
    }
}
