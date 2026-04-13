[Route("api/[controller]")]
[ApiController]
public class BoatController : ControllerBase
{
    private readonly AppDbContext _db;

    public BoatController(AppDbContext db)
    {
        _db = db;
    }

    private bool IsValidKeyword(string keyword) {
        return keyword.All(c => char.IsLetter(c) || c == ' ');
    }

    // GET ALL -> Eks: /api/boat
    [HttpGet]           
    public async Task<IActionResult> GetAll() {
        var boats = await _db.Boats
            .Select(boat => new {
                boat.Id,
                boat.BoatName,
                boat.ModelYear
            })
            .ToListAsync();

        return Ok(boats);
    }

    // GET BY KEYWORD -> Eks: /api/boat/keyword
    [HttpGet("{keyword}")]   
    public async Task<IActionResult> GetByKeyword(string? keyword) {

        // EDGE CASES
        if (keyword != null && !IsValidKeyword(keyword))
            return BadRequest("Keyword must contain letters only.");

        if (keyword == null) {
            return BadRequest("Keyword is null");
        }

        keyword = keyword.Trim();

        var boats = await _db.Boats
            .Where(boat => EF.Functions.ILike(boat.BoatName, $"%{keyword}%"))
            .Select(boat => new {
                boat.Id,
                boat.BoatName,
                boat.ModelYear

            })
            .ToListAsync();

        return Ok(boats);
    }

    // POST -> Eks: /api/boat
    [HttpPost]          
    public async Task<IActionResult> Create(Boat boat) {
        
        // Edge Cases
        if (boat == null) {
            return BadRequest("Boat is null");
        }
        if (boat.BoatName == null || boat.BoatName.Trim() == "") {
            return BadRequest("Boat name is required");
        }
        if (boat.ModelYear == 0) {
            return BadRequest("Model year is required");
        }
        var existingBoat = await _db.Boats
            .FirstOrDefaultAsync(b => b.BoatName == boat.BoatName);
        if (existingBoat != null) {
            return BadRequest("Boat already exists");
        }

        // Add Boat to DB 
        _db.Boats.Add(boat);
        await _db.SaveChangesAsync();
        return Ok(boat);
    }

    // DELETE BY ID -> Eks: /api/boat/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id) {
        await Task.CompletedTask;
        return Ok();
    }
}