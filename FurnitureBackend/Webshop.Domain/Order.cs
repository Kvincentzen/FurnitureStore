using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class Order
    {
        public int Id_O { get; set; }
        public int CustomerId { get; set; }
        public DateTime Date { get; set; }
        public int StatusId { get; set; }        
        public Status Status { get; set; }
        public List<OrderLine> OrderLines { get; set; }
        public Customer Customer { get; set; }
    }
}
