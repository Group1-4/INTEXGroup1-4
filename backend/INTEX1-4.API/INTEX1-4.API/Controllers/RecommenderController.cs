using System.Collections.Generic;
using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Microsoft.EntityFrameworkCore;

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


    [HttpGet("Collaborative/{title}")]
    public IActionResult GetCollabRecommendations(string title)
    {
        // Step 1: Look for the row with the matching movie title
        var recEntry = _collabDb.CollabRecommendations
            .FirstOrDefault(c => c.Title.ToLower() == title.ToLower());

        if (recEntry == null)
        {
            return NotFound($"No collaborative recommendations found for '{title}'");
        }

        // Step 2: Gather all 20 recommended titles
        var recommendedTitles = new List<string>
        {
            recEntry.Recommendation1, recEntry.Recommendation2, recEntry.Recommendation3,
            recEntry.Recommendation4, recEntry.Recommendation5, recEntry.Recommendation6,
            recEntry.Recommendation7, recEntry.Recommendation8, recEntry.Recommendation9,
            recEntry.Recommendation10, recEntry.Recommendation11, recEntry.Recommendation12,
            recEntry.Recommendation13, recEntry.Recommendation14, recEntry.Recommendation15,
            recEntry.Recommendation16, recEntry.Recommendation17, recEntry.Recommendation18,
            recEntry.Recommendation19, recEntry.Recommendation20
        };

        // Step 3: Get their show_ids and clean titles from the movies database
        var results = _context.movies_titles
            .Where(m => recommendedTitles.Contains(m.Title))
            .Select(m => new
            {
                ShowId = m.ShowId,
                Title = m.Title
            })
            .ToList();

        return Ok(results);
    }

}