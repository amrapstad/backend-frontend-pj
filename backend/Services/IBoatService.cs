public interface IBoatService
{
    Task<Boat> GetBoatByIdAsync(int id);
    Task<List<Boat>> GetAllBoatsAsync();
    Task<Boat> CreateBoatAsync(Boat boat);
    Task<Boat> UpdateBoatAsync(Boat boat);
    Task<Boat> DeleteBoatAsync(int id);
}