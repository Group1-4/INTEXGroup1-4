
using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace INTEX1_4.API.Controllers;

[Route("[controller]")]
[ApiController]
public class RecommenderController : ControllerBase
{
    private readonly ContentDbContext _contentDb;
    private readonly CollabDbContext _collabDb;
    private readonly MoviesDbContext _context;
    private readonly UserManager<IdentityUser> _userManager;
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
    
    [Authorize]
    [HttpGet("recentlywatched")]
    public async Task<IActionResult> GetRecentlyWatched()
    {
        // 1. Get signed-in user's email
        var user = await _userManager.GetUserAsync(User);
        var email = user?.Email;

        if (email == null)
        {
            return Unauthorized("No signed-in user.");
        }

        // 2. Get UserId and Name from movies_users using email
        var movieUser = await _context.movies_users
            .FirstOrDefaultAsync(mu => mu.Email == email);

        if (movieUser == null)
        {
            return NotFound("User not found in movies_users.");
        }

        var userId = movieUser.UserId;
        var name = movieUser.Name;

        // 3. Get all ShowIds the user has rated
        var ratedShowIds = await _context.movies_ratings
            .Where(r => r.UserId == userId)
            .Select(r => r.ShowId)
            .ToListAsync();

        // 4. Join with movies_titles to get movie titles
        var ratedMovies = await _context.movies_titles
            .Where(m => ratedShowIds.Contains(m.ShowId))
            .Select(m => new
            {
                m.ShowId,
                m.Title
            })
            .ToListAsync();

        // 5. Return name and rated movie info
        return Ok(new
        {
            Name = name,
            RatedMovies = ratedMovies
        });
    }


    [Authorize]
    [HttpGet("collab-user-recs")]
    public async Task<IActionResult> GetUserBasedCollaborativeRecommendations()
    {
        // 1. Get the logged-in user's email
        var user = await _userManager.GetUserAsync(User);
        var email = user?.Email;

        if (email == null)
        {
            return Unauthorized("No signed-in user.");
        }

        // 2. Find user_id from movies_users using email
        var movieUser = await _context.movies_users
            .FirstOrDefaultAsync(mu => mu.Email == email);

        if (movieUser == null)
        {
            return NotFound("User not found in movies_users.");
        }

        var userId = movieUser.UserId;

        // 3. Look up the recommendations in UsersCollab
        var recEntry = await _usersCollabDb.UsersCollab
            .FirstOrDefaultAsync(uc => uc.UserId == userId);

        if (recEntry == null)
        {
            return NotFound("No collaborative recommendations found for this user.");
        }

        // 4. Extract the 10 recommended show IDs
        var recommendedShowIds = new List<string?>
            {
                recEntry.Rec1, recEntry.Rec2, recEntry.Rec3, recEntry.Rec4, recEntry.Rec5,
                recEntry.Rec6, recEntry.Rec7, recEntry.Rec8, recEntry.Rec9, recEntry.Rec10
            }
            .Where(id => !string.IsNullOrEmpty(id))
            .ToList();

        // 5. Query movies_titles to get titles
        var results = await _context.movies_titles
            .Where(m => recommendedShowIds.Contains(m.ShowId))
            .Select(m => new
            {
                m.ShowId,
                m.Title
            })
            .ToListAsync();

        return Ok(results);
    }

    
    
}
// bottom brace