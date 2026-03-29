
public class CreateReceiptRequest
{
    // Boat
    public string? BoatName { get; set; }
    public int? ModelYear { get; set; }
    public int? BoatId { get; set; }

    // Owner
    public string? OwnerName { get; set; }
    public string? Email { get; set; }
    public int? OwnerId { get; set; }

    // Receipt
    public DateTime PurchaseDate { get; set; }
}