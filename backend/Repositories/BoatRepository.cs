public class BoatRepository : IBoatRepository {
    private readonly AppDbContext _context;

    public BoatRepository(AppDbContext context) {
        _context = context;
    }

    public async Task<Boat> GetBoatByKeywordAsync(string keyword) {
        return await _context.Boats.FindAsync(keyword);
    }

    public async Task<List<Boat>> GetAllBoatsAsync() {
        return await _context.Boats.ToListAsync();
    }

    public async Task<Boat> CreateBoatAsync(Boat boat) {
        _context.Boats.Add(boat);
        await _context.SaveChangesAsync();
        return boat;
    }

    public async Task<Boat> UpdateBoatAsync(Boat boat) {
        _context.Boats.Update(boat);
        await _context.SaveChangesAsync();
        return boat;
    }

    public async Task<Boat> DeleteBoatAsync(int id) {
        var boat = await _context.Boats.FindAsync(id);
        if (boat == null) {
            return null!;
        }
        _context.Boats.Remove(boat);
        await _context.SaveChangesAsync();
        return boat;
    }
}
