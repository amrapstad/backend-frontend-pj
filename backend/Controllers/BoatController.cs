[Route("api/[controller]")]
public class BoatController : ControllerBase
{
    private readonly AppDbContext _db;

    public BoatController(AppDbContext db)
    {
        _db = db;
    }

    // GET ALL -> Eks: /api/boat
    [HttpGet]           
    public async Task<IActionResult> GetAll() {
        await Task.CompletedTask;
        return Ok();
    }

    // GET BY ID -> Eks: /api/boat/5
    [HttpGet("{id}")]   
    public async Task<IActionResult> GetById(int id) {
        await Task.CompletedTask;
        return Ok();
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