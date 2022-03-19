using HWPortalBackend.DataModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace HWPortalBackend.Controllers
{
    [Route("api/models")]
    [ApiController]
    [Authorize]
    public class ModelsController : ControllerBase
    {

        // GET: ModelsController/default/type
        [HttpGet("default")]
        public IActionResult GetDefaultAsync(string modelType)
        {
            switch (modelType)
            {
                case "Расчёт_ДО":
                    string s = JsonConvert.SerializeObject(new Расчёт_ДО_Model(), Formatting.Indented);
                    return Content(JsonConvert.SerializeObject(new Расчёт_ДО_Model()), "application/json");
                default:
                    return BadRequest();
            }
        }

        // GET: ModelsController/30060394-252e-4ef5-8719-4465930234a3
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAsync(string id)
        {
            return Ok();
        }

        // POST: ModelsController/{model json}
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> CreateAsync(string model)
        {
            return Ok();
        }
    }
}
