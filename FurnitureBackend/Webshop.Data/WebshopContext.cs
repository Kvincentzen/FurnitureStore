using System;
using Microsoft.EntityFrameworkCore;
using Webshop.Domain;


namespace Webshop.Data
{
    public class WebshopContext : DbContext
    {
        public DbSet<Logins> Logins { get; set; }
        public DbSet<Picture> Pictures { get; set; }
        public DbSet<Edition> Editions { get; set; }
        public DbSet<ProductEdition> ProductEditions { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Color> Colors { get; set; }
        public DbSet<Status> Status { get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<OrderLine> OrderLines { get; set; }

        public WebshopContext()
        {

        }

        public WebshopContext(DbContextOptions<WebshopContext> options) 
            : base(options)
        {
            ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        }
       
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Vi skal ikke sende Password til brugeren, denne sætning gør at den blive ignoreret.
            modelBuilder.Entity<Logins>().Ignore(b => b.Password);
        }
    }
}
