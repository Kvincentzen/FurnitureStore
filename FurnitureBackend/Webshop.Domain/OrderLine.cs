using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class OrderLine
    {
        public int Id { get; set; }
        //ORDERID blive sat ud fra ID for orders og er der kun for kunne blive peget på.
        public int OrderId { get; set; }
        public int ProductEditionId { get; set; }
        public int Amount { get; set; }
        public double Price { get; set; }
        public ProductEdition ProductEdition { get; set; }
    }
}
