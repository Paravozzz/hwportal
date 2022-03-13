using AutoMapper;
using HWPortalBackend.DTOs;
using HWPortalBackend.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Text.RegularExpressions;

namespace HWPortalBackend.Controllers
{
    [Route("api/accounts")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;
        private readonly JwtHandler _jwtHandler;
        public AccountsController(UserManager<User> userManager, IMapper mapper, JwtHandler jwtHandler)
        {
            _userManager = userManager;
            _mapper = mapper;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] UserForAuthenticationDto userForAuthentication)
        {
            var user = await _userManager.FindByNameAsync(userForAuthentication.Email);
            if (user == null || !await _userManager.CheckPasswordAsync(user, userForAuthentication.Password))
                return Unauthorized(new AuthResponseDto { ErrorMessage = "Invalid Authentication" });
            var signingCredentials = _jwtHandler.GetSigningCredentials();
            var claims = _jwtHandler.GetClaims(user);
            var tokenOptions = _jwtHandler.GenerateTokenOptions(signingCredentials, claims);
            var token = new JwtSecurityTokenHandler().WriteToken(tokenOptions);
            return Ok(new AuthResponseDto { IsAuthSuccessful = true, Token = token });
        }

        [HttpPost("registration")]
        public async Task<IActionResult> RegisterUser([FromBody] UserForRegistrationDto userForRegistration)
        {
            if (userForRegistration == null || !ModelState.IsValid)
                return BadRequest();

            UserForRegistrationDtoValidate(userForRegistration, out List<string> errors);

            if (errors.Count != 0)
            {
                return BadRequest(new RegistrationResponseDto { IsSuccessfulRegistration = false, Errors = errors });
            }

            var user = _mapper.Map<User>(userForRegistration);
            var result = await _userManager.CreateAsync(user, userForRegistration.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new RegistrationResponseDto { IsSuccessfulRegistration = false, Errors = result.Errors.Select(e => e.Description) });
            }

            return StatusCode(201, new RegistrationResponseDto { IsSuccessfulRegistration = true, Errors = Array.Empty<string>() });
        }

        private static void UserForRegistrationDtoValidate(UserForRegistrationDto userForRegistration, out List<string> errors)
        {
            errors = new();

            if (string.IsNullOrEmpty(userForRegistration.Email))
            {
                errors.Add("Email is required.");
            }
            if (!string.IsNullOrEmpty(userForRegistration.Email) && !IsValidEmail(userForRegistration.Email))
            {
                errors.Add("Email is invalid.");
            }
            if (string.IsNullOrEmpty(userForRegistration.Password))
            {
                errors.Add("Password is required.");
            }
            if (string.IsNullOrEmpty(userForRegistration.ConfirmPassword))
            {
                errors.Add("Password confirmation is required.");
            }
            if (!string.IsNullOrEmpty(userForRegistration.Password) && !string.IsNullOrEmpty(userForRegistration.ConfirmPassword)
                && userForRegistration.Password != userForRegistration.ConfirmPassword)
            {
                errors.Add("The password and confirmation password do not match.");
            }
        }

        //https://docs.microsoft.com/en-us/dotnet/standard/base-types/how-to-verify-that-strings-are-in-valid-email-format
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                // Normalize the domain
                email = Regex.Replace(email, @"(@)(.+)$", DomainMapper,
                                      RegexOptions.None, TimeSpan.FromMilliseconds(250));

                // Examines the domain part of the email and normalizes it.
                string DomainMapper(Match match)
                {
                    // Use IdnMapping class to convert Unicode domain names.
                    var idn = new IdnMapping();

                    // Pull out and process domain name (throws ArgumentException on invalid)
                    string domainName = idn.GetAscii(match.Groups[2].Value);

                    return match.Groups[1].Value + domainName;
                }
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
            catch (ArgumentException)
            {
                return false;
            }

            try
            {
                bool result = Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
                return result;
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }
    }
}
