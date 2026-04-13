public interface IBoatOwnerRepository {
    Task<BoatOwner> GetBoatOwnerByIdAsync(int id);
    Task<List<BoatOwner>> GetAllBoatOwnersAsync();
    Task<BoatOwner> CreateBoatOwnerAsync(BoatOwner boatOwner);
    Task<BoatOwner> UpdateBoatOwnerAsync(BoatOwner boatOwner);
    Task<BoatOwner> DeleteBoatOwnerAsync(int id);
}