using DotNetCoreTypscript.Models;
using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreTypscript.Controllers
{
    public class ProductController : Controller
    {
        private readonly List<ProductViewModel> _products =
        [
                new()
                {
                    Id = 1,
                    Name = "Product 1",
                    ShortDescription = "Short description of Product 1",
                    LongDescription = "Long description of Product 1",
                    ImageFileName = "product1.jpg"
                },
                new()
                {
                    Id = 2,
                    Name = "Product 2",
                    ShortDescription = "Short description of Product 2",
                    LongDescription = "Long description of Product 2",
                    ImageFileName = "product2.jpg"
                },
                new()
                {
                    Id = 3,
                    Name = "Product 3",
                    ShortDescription = "Short description of Product 3",
                    LongDescription = "Long description of Product 3",
                    ImageFileName = "product3.jpg"
                },
                new()
                {
                    Id = 4,
                    Name = "Product 4",
                    ShortDescription = "Short description of Product 4",
                    LongDescription = "Long description of Product 4",
                    ImageFileName = "product4.jpg"
                },
                new()
                {
                    Id = 5,
                    Name = "Product 5",
                    ShortDescription = "Short description of Product 5",
                    LongDescription = "Long description of Product 5",
                    ImageFileName = "product5.jpg"
                },
            ];

        public IActionResult Index()
        {
            return View(_products);
        }

        [HttpGet]
        [Route("[controller]/{productId}")]
        public IActionResult GetProductDetail(int productId)
        {
            var product = _products.Find(p => p.Id == productId);
            if (product != null)
            {
                return Ok(product);
            }
            return NotFound();
        }
    }
}
