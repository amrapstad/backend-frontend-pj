public class Boat
{
    [Column("id")]
    public int Id { get; set; }
    [Column("boat_name")]
    public string BoatName { get; set; } = string.Empty;
    [Column("model_year")]
    public int ModelYear { get; set; }

    public List<BoatOwnerReceipt> Receipts { get; set; } = new();
}