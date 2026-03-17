using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Boat> Boats { get; set; }
    public DbSet<BoatOwner> BoatOwners { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Boat>().ToTable("boat");
        modelBuilder.Entity<BoatOwner>().ToTable("boat_owner");
    }
}

public class Boat
{
    [Column("id")]
    public int Id { get; set; }
    [Column("boat_name")]
    public string BoatName { get; set; } = string.Empty;
    [Column("owner_id")]
    public int OwnerId { get; set; }
    [Column("purchase_date")]
    public DateTime PurchaseDate { get; set; }
}

// Models/BoatOwner.cs
public class BoatOwner
{
    [Column("id")]
    public int Id { get; set; }
    [Column("owner_name")]
    public string OwnerName { get; set; } = string.Empty;
    [Column("email")]
    public string email { get; set; } = string.Empty;
}
