using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.EnsureCreated();
}

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/boats/search", async (string? keyword, AppDbContext db) =>
{
    if (keyword != null && !keyword.All(char.IsLetter))
        return Results.BadRequest("Keyword must contain letters only.");

    var boats = await db.Boats
        .Where(b => keyword == null || b.BoatName.Contains(keyword))
        .ToListAsync();

    return Results.Ok(boats);
});

app.Run(); // ← this was missing