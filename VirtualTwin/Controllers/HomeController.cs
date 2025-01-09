using Microsoft.AspNetCore.Mvc;
using System.Diagnostics;
using VirtualTwin.Models;

namespace VirtualTwin.Controllers {
	public class HomeController : Controller {
		public IActionResult Index() {
			return View();
		}
	}
}
