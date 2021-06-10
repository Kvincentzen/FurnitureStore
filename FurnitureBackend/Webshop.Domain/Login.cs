using System;

namespace Webshop.Domain
{
    public class Login
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        
        public Login(int id, string email, string role) 
        {
            Id = id;
            Email = email;
            Role = role;
        }
    }
}
