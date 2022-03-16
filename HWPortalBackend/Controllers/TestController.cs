using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HWPortalBackend.Controllers
{
    [Route("/")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpPost("roletest")]
        [Authorize(Roles = "Administrator,User")]
        public IActionResult Index()
        {
            return Ok("{\"roletest\": 200}");
        }
    }
}
