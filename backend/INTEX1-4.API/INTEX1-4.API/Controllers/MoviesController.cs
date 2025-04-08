using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;


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

}