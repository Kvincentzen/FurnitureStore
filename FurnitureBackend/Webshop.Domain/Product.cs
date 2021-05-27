using System;

namespace Webshop.Domain
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public string Description { get; set; }
        public int ColorId { get; set; }
        public int Stock { get; set; }
        public Color Color { get; set; }
        public Picture Picture { get; set; }

        public Product()
        {
            Color = new Color();
        }
        
    }
}
