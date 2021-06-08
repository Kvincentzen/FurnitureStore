using System;

namespace Webshop.Domain
{
    public class Logins
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
