using Microsoft.AspNetCore.Mvc;
using Virtual.Helper.CommonModels;
using VirtualTwin.Configuration;

namespace VirtualTwin.Controllers {
	public class EditorController : Controller {
		[Route("/editor")]
		public IActionResult Index() {
			return View();
		}
		[HttpPost("editor/generate-3d-model")]
		public async Task<IActionResult> Generate3DModel([FromBody] BodyMeasurements bodyMeasurements) {
			if (bodyMeasurements == null) {return BadRequest("Geçersiz ölçümler.");}
			Virtual.Helper.ServiceResponse<object> response = await HttpClientHelper.Generate3DModel(bodyMeasurements);
			if (response.Success) {return Ok(response.Data);}
			return StatusCode(500, "Model oluşturulurken bir hata oluştu.");
		}
	}
}
