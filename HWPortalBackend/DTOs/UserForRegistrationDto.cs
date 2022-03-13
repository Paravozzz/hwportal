using System.ComponentModel.DataAnnotations;

namespace HWPortalBackend.DTOs
{
    public class UserForRegistrationDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string ConfirmPassword { get; set; }
    }
}
