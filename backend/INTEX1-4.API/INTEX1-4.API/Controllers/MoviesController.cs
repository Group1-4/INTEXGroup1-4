using System;
using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Reflection;
using Ganss.Xss;
using Microsoft.AspNetCore.Authorization; // needed for reflection

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
    [Authorize(Roles = "Admin")]
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
    [Authorize(Roles = "Admin")]
    public IActionResult AddMovie([FromBody] Movie newMovie)
    {
        if (!ModelState.IsValid)
        {
            if (!ModelState.IsValid)
            {
                // Helpful for debugging frontend-to-backend shape mismatches
                var errors = ModelState.Values.SelectMany(v => v.Errors).Select(e => e.ErrorMessage);
                return BadRequest(ModelState
                .Where(x => x.Value.Errors.Count > 0)
                .ToDictionary(
                    kvp => kvp.Key,
                    kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                )
            );

            }

            var sanitizer = new HtmlSanitizer();
            newMovie.Description = sanitizer.Sanitize(newMovie.Description);
            newMovie.Title = sanitizer.Sanitize(newMovie.Title);
            newMovie.Cast = sanitizer.Sanitize(newMovie.Cast);

            _context.movies_titles.Add(newMovie);
            _context.SaveChanges();

            return Ok(new { id = newMovie.ShowId });
        }

    [HttpDelete("DeleteMovie/{id}")]
    [Authorize(Roles = "Admin")]
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
    [Authorize(Roles = "Admin")]
    public IActionResult UpdateMovie(string id, [FromBody] Movie updatedMovie)
    {
        if (id != updatedMovie.ShowId)
            return BadRequest("ID mismatch.");

        var existing = _context.movies_titles.Find(id);
        if (existing == null)
            return NotFound(new { message = "Movie not found" });

        var sanitizer = new HtmlSanitizer();
        updatedMovie.Description = sanitizer.Sanitize(updatedMovie.Description);
        updatedMovie.Title = sanitizer.Sanitize(updatedMovie.Title);
        updatedMovie.Cast = sanitizer.Sanitize(updatedMovie.Cast);

        _context.Entry(existing).CurrentValues.SetValues(updatedMovie);
        _context.SaveChanges();

        return NoContent();
    }

    [HttpGet("MovieDetails/{id}")]
    public IActionResult MovieDetails(string id)
    {
        var existing = _context.movies_titles.Find(id);
        return Ok(existing);
    }

    [Authorize(Roles = "User")]
    [HttpGet("MovieList/{page}/{pageSize}")]
    public IActionResult MovieList(
        int page = 1,
        int pageSize = 20,
        [FromQuery] string? categories = null,
        [FromQuery] string? searchField = null,
        [FromQuery] string? searchQuery = null
    )
    {
        var query = _context.movies_titles.AsQueryable();
        var sanitizer = new HtmlSanitizer();

        // Sanitize the searchQuery
        string sanitizedSearchQuery = string.IsNullOrEmpty(searchQuery) ? null : sanitizer.Sanitize(searchQuery);

        // 🔍 Search by selected field
        if (!string.IsNullOrEmpty(searchField) && !string.IsNullOrEmpty(sanitizedSearchQuery))
        {
            var searchLower = sanitizedSearchQuery.ToLower();

            switch (searchField.ToLower())
            {
                case "title":
                    query = query.Where(m => m.Title != null && m.Title.ToLower().Contains(searchLower));
                    break;

                case "director":
                    query = query.Where(m => m.Director != null && m.Director.ToLower().Contains(searchLower));
                    break;

                case "cast":
                    query = query.Where(m => m.Cast != null && m.Cast.ToLower().Contains(searchLower));
                    break;
            }
        }

        // 🏷 Category filtering
        if (!string.IsNullOrEmpty(categories))
        {
            var selectedCategories = categories.Split(',').Select(c => c.Trim()).ToList();
            var movieProps = typeof(Movie).GetProperties(BindingFlags.Public | BindingFlags.Instance);

            foreach (var inputCategory in selectedCategories)
            {
                var matchedProp = movieProps.FirstOrDefault(p =>
                    string.Equals(p.Name, inputCategory, StringComparison.OrdinalIgnoreCase));

                if (matchedProp != null)
                {
                    query = query.Where(m => EF.Property<int?>(m, matchedProp.Name) == 1);
                }
            }
        }

        var totalMovies = query.Count();

        var movies = query
            .OrderBy(m => m.Title)
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .Select(m => new { m.ShowId, m.Title })
            .ToList();

        var hasMore = (page * pageSize) < totalMovies;

        return Ok(new
        {
            Movies = movies,
            HasMore = hasMore
        });
    }

}