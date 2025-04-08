using INTEX1_4.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

[Route("[controller]")]
[ApiController]
public class RecommenderController : ControllerBase
{
    private readonly ContentDbContext _contentDb;
    private readonly CollabDbContext _collabDb;

    public RecommenderController(ContentDbContext contentDb, CollabDbContext collabDb)
    {
        _contentDb = contentDb;
        _collabDb = collabDb;
    }

    [HttpGet("ContentBased")]
    public IActionResult GetContentRecommendations()
    {
        var content = _contentDb.ContentRecommendations.ToList();
        return Ok(content);
    }

    [HttpGet("Collaborative")]
    public IActionResult GetCollabRecommendations()
    {
        var collab = _collabDb.CollabRecommendations.ToList();
        return Ok(collab);
    }
}
