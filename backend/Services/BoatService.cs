public class BoatService : IBoatService
{
    private readonly IBoatRepository _boatRepository;

    public BoatService(IBoatRepository boatRepository)
    {
        _boatRepository = boatRepository;
    }

    public async Task<Boat> GetBoatByKeywordAsync(string keyword)
    {
        return await _boatRepository.GetBoatByKeywordAsync(keyword);
    }

    public async Task<List<Boat>> GetAllBoatsAsync()
    {
        return await _boatRepository.GetAllBoatsAsync();
    }

    public async Task<Boat> CreateBoatAsync(Boat boat)
    {
        return await _boatRepository.CreateBoatAsync(boat);
    }

    public async Task<Boat> UpdateBoatAsync(Boat boat)
    {
        return await _boatRepository.UpdateBoatAsync(boat);
    }

    public async Task<Boat> DeleteBoatAsync(int id)
    {
        return await _boatRepository.DeleteBoatAsync(id);
    }
}