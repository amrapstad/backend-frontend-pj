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

