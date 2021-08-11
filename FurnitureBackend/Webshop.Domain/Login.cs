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

        public string GetRole(string roleNumber)
        {
            if (roleNumber == "1")
            {
                return "User";
            }
            if (roleNumber == "2")
            {
                return "Admin";
            }


            return "Guest";
        }
        
    }
}
