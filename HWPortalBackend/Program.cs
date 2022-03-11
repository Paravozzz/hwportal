using HWPortalBackend;
using HWPortalBackend.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton<WebsocketServerConnectionManager>();

builder.Services.AddDbContext<IdentityContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("IdentityConnection")));

builder.Services.AddIdentity<User, IdentityRole>(opt =>
{
    opt.Password.RequiredLength = 7;
    opt.Password.RequireDigit = false;
    opt.Password.RequireUppercase = false;
    opt.Password.RequireNonAlphanumeric = false;

    opt.User.RequireUniqueEmail = true;
}).AddEntityFrameworkStores<IdentityContext>();

builder.Services.AddAutoMapper(typeof(Program));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

var webSocketOptions = new WebSocketOptions
{
    KeepAliveInterval = TimeSpan.FromMinutes(1)
};

app.UseWebSockets(webSocketOptions);

app.MapControllers();

app.Run();
