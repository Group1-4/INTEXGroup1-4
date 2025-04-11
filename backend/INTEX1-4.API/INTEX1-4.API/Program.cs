using System.Security.Claims;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using INTEX1_4.API.Data;
using INTEX1_4.API.Services;

using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Identity.Data;

using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Globalization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database contexts
builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MoviesConnection")));


builder.Services.AddDbContext<ContentDbContext>(options =>
{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "content.db");
    options.UseSqlite($"Data Source={path}");
});

builder.Services.AddDbContext<UsersCollabDbContext>(options =>
{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "userscollab.db");
    options.UseSqlite($"Data Source={path}");
});

builder.Services.AddDbContext<CollabDbContext>(options =>

{
    var path = Path.Combine(Directory.GetCurrentDirectory(), "collab.db");
    options.UseSqlite($"Data Source={path}");
});


builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityConnection")));


// --- IDENTITY CONFIGURATION WITH ROLES ---
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders(); // needed for password reset, email confirmation, etc.

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequireUppercase = true;
    options.Password.RequireNonAlphanumeric = true;
    options.Password.RequiredLength = 12;
    options.Password.RequiredUniqueChars = 3;

    options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
    options.ClaimsIdentity.UserNameClaimType = ClaimTypes.Email;
});

// builder.Services.AddIdentityApiEndpoints<IdentityUser>()
//     .AddEntityFrameworkStores<ApplicationDbContext>();

builder.Services.AddScoped<IUserClaimsPrincipalFactory<IdentityUser>, CustomUserClaimsPrincipalFactory>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.Cookie.HttpOnly = true;
    options.Cookie.SameSite = SameSiteMode.None;
    options.Cookie.Name = ".AspNetCore.Identity.Application";
    options.Cookie.SecurePolicy = CookieSecurePolicy.Always;
    options.LoginPath = "/login"; // still required for redirect-based apps

    // 🔥 THIS IS THE KEY PART:
    options.Events.OnRedirectToLogin = context =>
    {
        // For APIs, return 401 instead of redirecting
        if (context.Request.Path.StartsWithSegments("/pingauth"))
        {
            context.Response.StatusCode = 401;
            return Task.CompletedTask;
        }

        // Let other routes redirect normally
        context.Response.Redirect(context.RedirectUri);
        return Task.CompletedTask;
    };
});




// --- OPTIONAL: No-op Email Sender to avoid errors if tokens are used ---
builder.Services.AddSingleton<IEmailSender<IdentityUser>, NoOpEmailSender<IdentityUser>>();

// --- CORS ---
builder.Services.AddAuthorization();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCorsPolicy", policy =>
    {

        policy.WithOrigins(
                "http://localhost:5173",
                "https://kind-wave-0d0fe0a1e.6.azurestaticapps.net")
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials();
    });
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Pipeline
// if (app.Environment.IsDevelopment())
// {

    app.UseSwagger();
    app.UseSwaggerUI();
// }

app.UseCors("MyCorsPolicy");
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// --- IDENTITY MINIMAL API ROUTES ---
app.MapIdentityApi<IdentityUser>();

app.MapGet("/login", () => Results.Unauthorized());


// --- LOGOUT ROUTE ---
app.MapPost("/logout", async (HttpContext context, SignInManager<IdentityUser> signInManager) =>
{
    await signInManager.SignOutAsync();

    context.Response.Cookies.Delete(".AspNetCore.Identity.Application", new CookieOptions
    {
        HttpOnly = true,
        Secure = true,
        SameSite = SameSiteMode.None
    });

    return Results.Ok(new { message = "Logout successful" });
}).RequireAuthorization();
// AUTH CHECK ROUTE
app.MapGet("/pingauth", (ClaimsPrincipal user) =>
{
    if (!user.Identity?.IsAuthenticated ?? false)
    {
        return Results.Unauthorized();
    }

    var email = user.FindFirstValue(ClaimTypes.Email) ?? "unknown@example.com";
    var roles = user.FindAll(ClaimTypes.Role).Select(r => r.Value).ToList();

    return Results.Json(new { email, roles });
}).RequireAuthorization();

// REGISTER ROUTE
app.MapPost("/signup", async (
    UserManager<IdentityUser> userManager,
    SignInManager<IdentityUser> signInManager,
    RoleManager<IdentityRole> roleManager,
    RegisterRequest req) =>
{
    var user = new IdentityUser { UserName = req.Email, Email = req.Email };
    var result = await userManager.CreateAsync(user, req.Password);

    if (!result.Succeeded)
    {
        return Results.BadRequest(result.Errors);
    }

    if (!await roleManager.RoleExistsAsync("User"))
    {
        await roleManager.CreateAsync(new IdentityRole("User"));
    }

    await userManager.AddToRoleAsync(user, "User");
    await signInManager.SignInAsync(user, isPersistent: false);

    return Results.Ok(new { message = "User registered and signed in!" });
});

// CUSTOM LOGIN ROUTE
app.MapPost("/custom-login", async (
    HttpContext context,
    SignInManager<IdentityUser> signInManager,
    UserManager<IdentityUser> userManager,
    ILogger<Program> logger, // Inject logger
    [FromBody] CustomLoginRequest login
) =>
{
    var user = await userManager.FindByEmailAsync(login.Email);
    if (user == null)
    {
        var user = await userManager.FindByEmailAsync(login.Email);
        if (user == null)
        {
            logger.LogInformation($"Login attempt failed for user: {login.Email} - User not found.");
            return Results.Json(new { message = "Invalid email or password" }, statusCode: 401);
        }

        var result = await signInManager.PasswordSignInAsync(
            user,
            login.Password,
            login.RememberMe,
            lockoutOnFailure: false);

        if (result.Succeeded)
        {
            logger.LogInformation($"Login successful for user: {user.Email}");

            if (await userManager.IsInRoleAsync(user, "Admin"))
            {
                logger.LogInformation($"User {user.Email} is in the Admin role. Redirecting to /admin.");
                return Results.Ok(new { redirectUrl = "/admin" });
            }
            else
            {
                logger.LogInformation($"User {user.Email} is NOT in the Admin role. Redirecting to /movies.");
                return Results.Ok(new { redirectUrl = "/movies" });
            }
        }

        logger.LogInformation($"Login failed for user: {user.Email} - Invalid password.");

        return Results.Json(new { message = "Invalid email or password" }, statusCode: 401);
    }

    var result = await signInManager.PasswordSignInAsync(
        user,
        login.Password,
        login.RememberMe,
        lockoutOnFailure: false);

    if (result.Succeeded)
    {
        logger.LogError($"An error occurred during login: {ex}");
        return Results.Problem("An internal error occurred.");

    }

    return Results.Json(new { message = "Invalid email or password" }, statusCode: 401);
});


app.Run();
