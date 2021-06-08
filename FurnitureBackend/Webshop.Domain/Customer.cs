using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class Customer
    {
        public int Id_CU { get; set; }
        public string Name { get; set; }
        public int TelephoneNumber { get; set; }
        public string Address { get; set; }
        public int LoginId { get; set; }
        public Logins Login { get; set; }
        public Customer()
        {
            Login = new Logins();
        }
    }
}
