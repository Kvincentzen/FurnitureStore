using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int TelephoneNumber { get; set; }
        public string Address { get; set; }
        public int LoginId { get; set; }
        public Login Login { get; set; }
        public Customer()
        {
            string email = null, role = null;
            Login = new Login(LoginId, email, role);

        }
    }
}
