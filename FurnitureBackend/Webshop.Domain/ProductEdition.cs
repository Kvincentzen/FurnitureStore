using System;
using System.Collections.Generic;
using System.Text;

namespace Webshop.Domain
{
    public class ProductEdition
    {
        public int Id { get; set; }
        public int VersionId { get; set; }
        public int ProductId { get; set; }
        public int PictureId { get; set; }
        public Edition Editions { get; set; }
        public Product Products { get; set; }
        public Picture Picture { get; set; }
        public List<Picture> Pictures = new List<Picture>();
    }
}
