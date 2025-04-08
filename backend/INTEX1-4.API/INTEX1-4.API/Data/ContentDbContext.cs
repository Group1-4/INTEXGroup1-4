using Microsoft.EntityFrameworkCore;
using INTEX1_4.API.Data;

public class ContentDbContext : DbContext
{
    public ContentDbContext(DbContextOptions<ContentDbContext> options)
        : base(options) { }

    // Each DbSet maps to a different physical table
    public DbSet<ContentRecommendationBase> ContentRecommendations { get; set; }
    public DbSet<ContentRecommendationAction> ContentRecommendationsAction { get; set; }
    public DbSet<ContentRecommendationComedies> ContentRecommendationsComedies { get; set; }
    public DbSet<ContentRecommendationDramas> ContentRecommendationsDramas { get; set; }
    public DbSet<ContentRecommendationFantasy> ContentRecommendationsFantasy { get; set; }
}