public class BoatOwnerRepository : IBoatOwnerRepository {
    private readonly AppDbContext _context;

    public BoatOwnerRepository(AppDbContext context) {
        _context = context;
    }

    public async Task<BoatOwner> GetBoatOwnerByIdAsync(int id) {
        return await _context.BoatOwners.FindAsync(id);
    }

    public async Task<List<BoatOwner>> GetAllBoatOwnersAsync() {
        return await _context.BoatOwners.ToListAsync();
    }

    public async Task<BoatOwner> CreateBoatOwnerAsync(BoatOwner boatOwner) {
        _context.BoatOwners.Add(boatOwner);
        await _context.SaveChangesAsync();
        return boatOwner;
    }

    public async Task<BoatOwner> UpdateBoatOwnerAsync(BoatOwner boatOwner) {
        _context.BoatOwners.Update(boatOwner);
        await _context.SaveChangesAsync();
        return boatOwner;
    }

    public async Task<BoatOwner> DeleteBoatOwnerAsync(int id) {
        var boatOwner = await _context.BoatOwners.FindAsync(id);
        if (boatOwner == null) {
            return null;
        }
        _context.BoatOwners.Remove(boatOwner);
        await _context.SaveChangesAsync();
        return boatOwner;
    }
}