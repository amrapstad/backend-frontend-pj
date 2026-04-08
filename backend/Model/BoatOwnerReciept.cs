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

    public BoatOwner Owner { get; set; } = null!;
    public Boat Boat { get; set; } = null!;
}