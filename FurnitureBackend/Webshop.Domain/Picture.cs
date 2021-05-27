using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class Picture
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ProductId { get; set; }
        public Product Products { get; set; }

      
    }
}
