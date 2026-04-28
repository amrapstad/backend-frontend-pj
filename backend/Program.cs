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

app.MapControllers();
app.MapBoatOwnerEndpoints(); 


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



app.Run(); 