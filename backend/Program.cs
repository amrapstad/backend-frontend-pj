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
    if (keyword != null && !IsValidKeyword(keyword))
        return Results.BadRequest("Keyword must contain letters only.");

    keyword = keyword?.Trim();

    var boats = await db.Boats
        .Where(b => string.IsNullOrEmpty(keyword) || EF.Functions.ILike(b.BoatName, $"%{keyword}%"))
        .ToListAsync();

    return Results.Ok(boats);
});

app.MapGet("/owners/search", async (string? keyword, AppDbContext db) =>
{
    if (keyword != null && !IsValidKeyword(keyword))
        return Results.BadRequest("Keyword must contain letters only.");

    keyword = keyword?.Trim();

    var boatOwners = await db.BoatOwners
        .Where(b => string.IsNullOrEmpty(keyword) || EF.Functions.ILike(b.OwnerName, $"%{keyword}%"))
        .ToListAsync();

    return Results.Ok(boatOwners);
});

bool IsValidKeyword(string keyword) => 
    keyword.All(c => char.IsLetter(c) || c == ' ');


app.Run(); 