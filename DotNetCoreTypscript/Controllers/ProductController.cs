using Microsoft.AspNetCore.Mvc;

namespace DotNetCoreTypscript.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
