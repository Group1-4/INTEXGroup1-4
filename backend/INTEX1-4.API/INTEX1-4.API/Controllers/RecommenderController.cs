using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace INTEX1_4.API.Controllers;

[Route("[controller]")]
[ApiController]
public class RecommenderController : ControllerBase
{
    private readonly ContentDbContext _contentDb;
    private readonly CollabDbContext _collabDb;
    private readonly MoviesDbContext _context;
    private readonly UsersCollabDbContext _usersCollabDb;

    public RecommenderController(
        ContentDbContext contentDb,
        CollabDbContext collabDb,
        MoviesDbContext temp,
        UsersCollabDbContext usersCollabDb)
    {
        _contentDb = contentDb;
        _collabDb = collabDb;
        _context = temp;
        _usersCollabDb = usersCollabDb;
    }

    [HttpGet("ContentBased/{id}")]
    public IActionResult GetContentRecommendations(string id)
    {
        var recommendations = _contentDb.ContentRecommendationBase
            .Where(c => c.ShowId1 == id)
            .OrderByDescending(c => c.Similarity)
            .ToList();

        var showId2s = recommendations.Select(r => r.ShowId2).ToList();

        var movieResults = _context.movies_titles
            .Where(m => showId2s.Contains(m.ShowId))
            .Select(m => new { ShowId = m.ShowId, Title = m.Title })
            .ToList();

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
        var recEntry = _collabDb.CollabRecommendations
            .FirstOrDefault(c => c.Title.ToLower() == title.ToLower());

        if (recEntry == null)
            return NotFound($"No collaborative recommendations found for '{title}'");

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

        var results = _context.movies_titles
            .Where(m => recommendedTitles.Contains(m.Title))
            .Select(m => new { m.ShowId, m.Title })
            .ToList();

        return Ok(results);
    }

    [Authorize]
    [HttpGet("recentlywatched")]
    public async Task<IActionResult> GetRecentlyWatched()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(email)) return Unauthorized("Email not found in claims.");

        var movieUser = await _context.movies_users.FirstOrDefaultAsync(mu => mu.Email == email);
        if (movieUser == null) return NotFound("User not found in movies_users.");

        var userId = movieUser.UserId;
        var name = movieUser.Name;

        var ratedShowIds = await _context.movies_ratings
            .Where(r => r.UserId == userId)
            .Select(r => r.ShowId)
            .ToListAsync();

        var ratedMovies = await _context.movies_titles
            .Where(m => ratedShowIds.Contains(m.ShowId))
            .Select(m => new { m.ShowId, m.Title })
            .ToListAsync();

        return Ok(new { Name = name, RatedMovies = ratedMovies });
    }

    [Authorize]
    [HttpGet("collab-user-recs")]
    public async Task<IActionResult> GetUserBasedCollaborativeRecommendations()
    {
        var email = User.FindFirstValue(ClaimTypes.Email);
        if (string.IsNullOrEmpty(email)) return Unauthorized("Email not found in claims.");

        var movieUser = await _context.movies_users.FirstOrDefaultAsync(mu => mu.Email == email);
        if (movieUser == null) return NotFound("User not found in movies_users.");

        var userId = movieUser.UserId;

        var recEntry = await _usersCollabDb.UsersCollab.FirstOrDefaultAsync(uc => uc.UserId == userId);
        if (recEntry == null) return NotFound("No collaborative recommendations found for this user.");

        var recommendedShowIds = new List<string?>
        {
            recEntry.Rec1, recEntry.Rec2, recEntry.Rec3, recEntry.Rec4, recEntry.Rec5,
            recEntry.Rec6, recEntry.Rec7, recEntry.Rec8, recEntry.Rec9, recEntry.Rec10
        }.Where(id => !string.IsNullOrEmpty(id)).ToList();

        var results = await _context.movies_titles
            .Where(m => recommendedShowIds.Contains(m.ShowId))
            .Select(m => new { m.ShowId, m.Title })
            .ToListAsync();

        return Ok(results);
    }
[Authorize]
[HttpGet("content-user-based")]
public async Task<IActionResult> GetContentBasedUserRecommendations()
{
    var email = User.FindFirstValue(ClaimTypes.Email);
    if (string.IsNullOrEmpty(email))
        return Unauthorized("Email not found in claims.");

    var movieUser = await _context.movies_users
        .FirstOrDefaultAsync(mu => mu.Email == email);
    if (movieUser == null)
        return NotFound("User not found in movies_users.");

    var userId = movieUser.UserId;

    var userRatings = await _context.movies_ratings
        .Where(r => r.UserId == userId)
        .OrderByDescending(r => r.Rating)
        .ToListAsync();

    if (!userRatings.Any())
        return NotFound("User has not rated any movies.");

    foreach (var rating in userRatings)
    {
        var recs = await _contentDb.ContentRecommendationBase
            .Where(c => c.ShowId1 == rating.ShowId)
            .OrderByDescending(c => c.Similarity)
            .ToListAsync();

        if (recs.Any())
        {
            var showId2s = recs
                .Where(r => !string.IsNullOrEmpty(r.ShowId2))
                .Select(r => r.ShowId2)
                .ToList();

            var titles = await _context.movies_titles
                .Where(m => showId2s.Contains(m.ShowId) || m.ShowId == rating.ShowId)
                .ToDictionaryAsync(m => m.ShowId, m => m.Title);

            var result = recs
                .Where(r => !string.IsNullOrEmpty(r.ShowId2))
                .Select(r => new
                {
                    ShowId = r.ShowId2,
                    Title = titles.TryGetValue(r.ShowId2, out var title) ? title : "Unknown Title",
                    Similarity = r.Similarity,
                    BasedOnTitle = titles.TryGetValue(rating.ShowId, out var basedTitle) ? basedTitle : "Unknown"
                })
                .ToList();

            return Ok(result);
        }
    }

    return NotFound("No recommendations found based on user's rated shows.");
}

}
