using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;


public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Boat> Boats { get; set; }
    public DbSet<BoatOwner> BoatOwners { get; set; }
    public DbSet<BoatOwnerReceipt> BoatOwnerReceipts { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Boat>().ToTable("boat");
        modelBuilder.Entity<BoatOwner>().ToTable("boat_owner");
        modelBuilder.Entity<BoatOwnerReceipt>().ToTable("boat_owner_receipt");
    }
}

public class Boat
{
    [Column("id")]
    public int Id { get; set; }
    [Column("boat_name")]
    public string BoatName { get; set; } = string.Empty;
    [Column("model_year")]
    public int ModelYear { get; set; }
}

public class BoatOwnerReceipt
{
    [Column("id")]
    public int Id { get; set; }
    [Column("owner_id")]
    public int OwnerId { get; set; }
    [Column("boat_id")]
    public int BoatId { get; set; }
    [Column("purchase_date")]
    public DateTime PurchaseDate { get; set; }
}

public class BoatOwner
{
    [Column("id")]
    public int Id { get; set; }
    [Column("owner_name")]
    public string OwnerName { get; set; } = string.Empty;
    [Column("email")]
    public string email { get; set; } = string.Empty;
}
