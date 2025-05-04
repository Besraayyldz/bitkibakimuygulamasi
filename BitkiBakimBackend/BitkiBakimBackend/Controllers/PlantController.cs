using Microsoft.AspNetCore.Mvc;
using BitkiBakimBackend.Models;
using BitkiBakimBackend.Data;

namespace BitkiBakimBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlantController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PlantController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetPlants()
        {
            var plants = _context.Plants.ToList();
            return Ok(plants);
        }

        [HttpGet("{id}")]
        public IActionResult GetPlant(int id)
        {
            var plant = _context.Plants.Find(id);
            if (plant == null) return NotFound();
            return Ok(plant);
        }

        [HttpPost]
        public IActionResult CreatePlant([FromBody] Plant plant)
        {
            _context.Plants.Add(plant);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetPlant), new { id = plant.Id }, plant);
        }

        [HttpPut("{id}")]
        public IActionResult UpdatePlant(int id, [FromBody] Plant updatedPlant)
        {
            var plant = _context.Plants.Find(id);
            if (plant == null) return NotFound();

            plant.Name = updatedPlant.Name;
            plant.Description = updatedPlant.Description;
            plant.ImageUrl = updatedPlant.ImageUrl;
            plant.WateringIntervalDays = updatedPlant.WateringIntervalDays;

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePlant(int id)
        {
            var plant = _context.Plants.Find(id);
            if (plant == null) return NotFound();

            _context.Plants.Remove(plant);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
