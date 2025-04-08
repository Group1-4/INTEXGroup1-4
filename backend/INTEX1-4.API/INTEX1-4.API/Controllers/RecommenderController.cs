using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[Route("[controller]")]
[ApiController]
public class RecommenderController : ControllerBase
{
    private readonly ContentDbContext _contentDb;
    private readonly CollabDbContext _collabDb;
    private readonly MoviesDbContext _context;

    public RecommenderController(ContentDbContext contentDb, CollabDbContext collabDb, MoviesDbContext temp)
    {
        _contentDb = contentDb;
        _collabDb = collabDb;
        _context = temp;
    }

    [HttpGet("ContentBased/{id}")]
    public IActionResult GetContentRecommendations(string id)
    {
        // Step 1: Get recommendations from the ContentRecommendationBase table
        var recommendations = _contentDb.ContentRecommendationBase
            .Where(c => c.ShowId1 == id)
            .OrderByDescending(c => c.Similarity)
            .ToList();

        // Step 2: Extract the list of ShowId2s
        var showId2s = recommendations.Select(r => r.ShowId2).ToList();

        // Step 3: Query the movies table for matching show IDs
        var movieResults = _context.movies_titles
            .Where(m => showId2s.Contains(m.ShowId))
            .Select(m => new
            {
                ShowId = m.ShowId,
                Title = m.Title
            })
            .ToList();

        // Step 4: Join and return result with similarity
        var result = recommendations
            .Join(movieResults,
                rec => rec.ShowId2,
                movie => movie.ShowId,
                (rec, movie) => new
                {
                    ShowId = movie.ShowId,
                    Title = movie.Title,
                    Similarity = rec.Similarity
                })
            .OrderByDescending(r => r.Similarity)
            .ToList();

        return Ok(result);
    }




    [HttpGet("Collaborative")]
    public IActionResult GetCollabRecommendations()
    {
        var collab = _collabDb.CollabRecommendations.ToList();
        return Ok(collab);
    }
}
