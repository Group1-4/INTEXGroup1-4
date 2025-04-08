using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[Route("[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private MoviesDbContext _context;

    public MoviesController(MoviesDbContext temp)
    {
        _context = temp;
    }

    [HttpGet ("GetMovies")]
    public IActionResult Get() // this gets and returns all the movies in the db
    {
        var movies = _context.movies_titles.ToList();
        return Ok(movies);
    }
    
    [HttpPost("AddMovie")]
    public IActionResult AddMovie([FromBody] Movie newMovie)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.movies_titles.Add(newMovie);
        _context.SaveChanges();

        // return the new ID back to the client
        return Ok(new { id = newMovie.ShowId });
    }
    
    [HttpDelete("DeleteMovie/{id}")]
    public IActionResult DeleteMovie(string id)
    {
        var movie = _context.movies_titles.Find(id);
        if (movie == null)
        {
            return NotFound(new { message = "Movie not found" });
        }

        _context.movies_titles.Remove(movie);
        _context.SaveChanges();
        return NoContent();
    }
    [HttpPut("UpdateMovie/{id}")]
    public IActionResult UpdateMovie(string id, [FromBody] Movie updatedMovie)
    {
        if (id != updatedMovie.ShowId)
            return BadRequest("ID mismatch.");

        var existing = _context.movies_titles.Find(id);
        if (existing == null)
            return NotFound(new { message = "Movie not found" });

        _context.Entry(existing).CurrentValues.SetValues(updatedMovie);
        _context.SaveChanges();

        return NoContent();
    }
}