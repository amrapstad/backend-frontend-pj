using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddControllers();

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

/* ############## */
/* POST REQUESTS  */
/* ############## */


app.MapPost("api/owners", async (BoatOwner owner, AppDbContext db) =>
{
    var existingOwner = await db.BoatOwners
        .FirstOrDefaultAsync(o => o.email == owner.email);
    
    if (existingOwner != null)
        return Results.BadRequest("Owner already exists");  

    db.BoatOwners.Add(owner);
    await db.SaveChangesAsync();
    return Results.Ok(owner);
});

app.MapPost("api/receipts", async (CreateReceiptRequest req, AppDbContext db) =>
{
    if (req == null)
    {
        return Results.BadRequest("Request is empty");
    }

    // Handle Boat
    int boatId;
    var existingBoat = await db.Boats
        .FirstOrDefaultAsync(b => b.BoatName == req.BoatName);
        
    if (existingBoat != null)
    {
        boatId = existingBoat.Id;
    }
    else
    {
        var boat = new Boat { BoatName = req.BoatName ?? "", ModelYear = req.ModelYear ?? 0 };
        db.Boats.Add(boat);
        await db.SaveChangesAsync();
        boatId = boat.Id;
    }

    // Handle Owner
    int ownerId;
    var existingOwner = await db.BoatOwners
        .FirstOrDefaultAsync(o => o.email == req.Email);
        
    if (existingOwner != null)
    {
        ownerId = existingOwner.Id;
    }
    else
    {
        var owner = new BoatOwner { OwnerName = req.OwnerName ?? "", email = req.Email ?? "" };
        db.BoatOwners.Add(owner);
        await db.SaveChangesAsync();
        ownerId = owner.Id;
    }

    // Create Receipt
    var receipt = new BoatOwnerReceipt
    {
        BoatId = boatId,
        OwnerId = ownerId,
        PurchaseDate = DateTime.SpecifyKind(req.PurchaseDate, DateTimeKind.Utc)
    };
    db.BoatOwnerReceipts.Add(receipt);
    await db.SaveChangesAsync();

    return Results.Ok(receipt);
});


/* ############## */
/*  GET REQUESTS  */
/* ############## */

app.MapGet("api/owners/search", async (string? keyword, AppDbContext db) =>
{
    if (keyword != null && !IsValidKeyword(keyword))
        return Results.BadRequest("Keyword must contain letters only.");

    keyword = keyword?.Trim();

    var boatOwners = await db.BoatOwners
        .Where(b => string.IsNullOrEmpty(keyword) || EF.Functions.ILike(b.OwnerName, $"%{keyword}%"))
        .ToListAsync();

    return Results.Ok(boatOwners);
});


app.MapGet("api/owners/search/debounced", async (string? keyword, AppDbContext db) =>
{
    if (keyword != null && !IsValidKeyword(keyword))
        return Results.BadRequest("Keyword must contain letters only.");

    keyword = keyword?.Trim();

    var boatOwners = await db.BoatOwners
        .Where(b => string.IsNullOrEmpty(keyword) || EF.Functions.ILike(b.OwnerName, $"%{keyword}%"))
        .ToListAsync();

    return Results.Ok(boatOwners);
});

bool IsValidKeyword(string keyword) => keyword.All(c => char.IsLetter(c) || c == ' ');

app.MapControllers();

app.Run(); 