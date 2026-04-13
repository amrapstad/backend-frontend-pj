public class BoatOwner
{
    [Column("id")]
    public int Id { get; set; }
    [Column("owner_name")]
    public string OwnerName { get; set; } = string.Empty;
    [Column("email")]
    public string email { get; set; } = string.Empty;

    public List<BoatOwnerReceipt> Receipts { get; set; } = new();
}
