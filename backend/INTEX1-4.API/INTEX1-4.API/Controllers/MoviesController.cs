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

    [HttpGet("GetMovies")]
    public IActionResult Get(int page = 1, int pageSize = 10)
    {
        var total = _context.movies_titles.Count();
        var movies = _context.movies_titles
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new { movies, total });
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
    [HttpGet ("MovieDetails/{id}")]
    public IActionResult MovieDetails(string id) // this gets and returns all the movies in the db
    {
        var existing = _context.movies_titles.Find(id);
        return Ok(existing);
    }

    [HttpGet("MovieList/{page}/{pageSize}")]
    public IActionResult MovieList(int page = 1, int pageSize = 20)
    {
        var totalMovies = _context.movies_titles.Count();

        var movies = _context.movies_titles
            .OrderBy(m => m.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new { m.ShowId, m.Title })
            .ToList();

        var hasMore = (page * pageSize) < totalMovies;

        return Ok(new
        {
            Movies = movies, // match frontend expectation
            HasMore = hasMore
        });
    }

    
}