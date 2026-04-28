using System.Net.Mail;
using Microsoft.EntityFrameworkCore;

public static class BoatOwnerController
{
    // MAP ENDPOINTS
    public static void MapBoatOwnerEndpoints(this IEndpointRouteBuilder app) {
        var group = app.MapGroup("/api/owner");

        group.MapGet("", GetAll);
        group.MapGet("/{keyword}", GetByKeyword);
        group.MapPost("", Create);
    }

    // HELPER FUNCTIONS
    private static bool IsValidKeyword(string keyword) {
        if (keyword == null || keyword.Trim() == "") {
            return false;
        }
        if (!keyword.All(c => char.IsLetter(c) || c == ' ')) {
            return false;
        }
        return true;
    }

    private static bool IsValidEmail(string email) {
        if (email == null || email.Trim() == "") {
            return false;
        }
        try {
            var addr = new MailAddress(email);
            return addr.Address == email;
        }
        catch {
            return false;
        }
    }

    // GET ALL -> Eks: /api/owner
    private static async Task<IResult> GetAll(AppDbContext _db) {
        var boatOwner = await _db.BoatOwners.Select(b => new {
            id = b.Id,
            name = b.OwnerName,
            email = b.email,
        }).ToListAsync(); 

        return Results.Ok(boatOwner);    
    }

    // GET ALL BY KEYWORD -> Eks: /api/owner/keyword
    private static async Task<IResult> GetByKeyword(AppDbContext _db, string? keyword) {
        // EDGE CASES
        if (!IsValidKeyword(keyword))
            return Results.BadRequest("Keyword cannot be null, empty or contain non-alphabetic characters");

        keyword = keyword?.Trim();

        var boatOwners = await _db.BoatOwners
            .Where(b => EF.Functions.ILike(b.OwnerName, $"%{keyword}%"))
            .Select(b => new { 
                id = b.Id,
                name = b.OwnerName,
                email = b.email,
            })
            .ToListAsync();

        return Results.Ok(boatOwners);
    }

    // CREATE -> Eks: api/owner 
    private static async Task<IResult> Create(AppDbContext _db,BoatOwner owner) {
        // EDGE CASES
        if (owner == null) {
            return Results.BadRequest("Owner is null");
        }       
        if (owner.OwnerName == null || owner.OwnerName.Trim() == "") {
            return Results.BadRequest("Name is required");
        }
        if (!IsValidEmail(owner.email)) {
            return Results.BadRequest("Email is invalid");
        }
        var ownerExists = await _db.BoatOwners.AnyAsync(o => o.email == owner.email);
        if (ownerExists) {
            return Results.BadRequest("Owner already exists");
        }

        // Add Owner to DB
        _db.BoatOwners.Add(owner);
        await _db.SaveChangesAsync();
        return Results.Ok(owner);
    }

}