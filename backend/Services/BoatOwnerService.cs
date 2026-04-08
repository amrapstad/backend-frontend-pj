public class BoatOwnerService : IBoatOwnerService
{
    private readonly IBoatOwnerRepository _boatOwnerRepository;

    public BoatOwnerService(IBoatOwnerRepository boatOwnerRepository)
    {
        _boatOwnerRepository = boatOwnerRepository;
    }

    public async Task<BoatOwner> GetBoatOwnerByIdAsync(int id) {
        return await _boatOwnerRepository.GetBoatOwnerByIdAsync(id);
    }

    public async Task<List<BoatOwner>> GetAllBoatOwnersAsync() {
        return await _boatOwnerRepository.GetAllBoatOwnersAsync();
    }

    public async Task<BoatOwner> CreateBoatOwnerAsync(BoatOwner boatOwner) {
        return await _boatOwnerRepository.CreateBoatOwnerAsync(boatOwner);
    }

    public async Task<BoatOwner> UpdateBoatOwnerAsync(BoatOwner boatOwner) {
        return await _boatOwnerRepository.UpdateBoatOwnerAsync(boatOwner);
    }

    public async Task<BoatOwner> DeleteBoatOwnerAsync(int id) {
        return await _boatOwnerRepository.DeleteBoatOwnerAsync(id);
    }
}

    
    