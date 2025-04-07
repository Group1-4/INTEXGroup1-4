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
}