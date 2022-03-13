using Microsoft.AspNetCore.Identity;

namespace HWPortalBackend.Identity
{
    public static class IdentityExtensions
    {
        public static void AddUserIdentity(this IServiceCollection services)
        {
            services.AddIdentity<User, IdentityRole>(opt =>
            {
                opt.Password.RequiredLength = 7;
                opt.Password.RequireDigit = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireNonAlphanumeric = false;

                opt.User.RequireUniqueEmail = true;

            }).AddEntityFrameworkStores<IdentityContext>();
        }
    }
}
