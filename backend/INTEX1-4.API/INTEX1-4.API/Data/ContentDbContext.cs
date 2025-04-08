using INTEX1_4.API.Data;
using Microsoft.EntityFrameworkCore;

public class ContentDbContext : DbContext
{
    public ContentDbContext(DbContextOptions<ContentDbContext> options)
        : base(options)
    {
    }

    public DbSet<ContentRecommendationBase> ContentRecommendationBase { get; set; }

    // (Optional: if you plan to use other category-based tables)
    public DbSet<ContentRecommendationAction> ContentRecommendationAction { get; set; }
    public DbSet<ContentRecommendationComedies> ContentRecommendationComedies { get; set; }
    public DbSet<ContentRecommendationDramas> ContentRecommendationDramas { get; set; }
    public DbSet<ContentRecommendationFantasy> ContentRecommendationFantasy { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ContentRecommendationBase>().HasNoKey();
        modelBuilder.Entity<ContentRecommendationAction>().HasNoKey();
        modelBuilder.Entity<ContentRecommendationComedies>().HasNoKey();
        modelBuilder.Entity<ContentRecommendationDramas>().HasNoKey();
        modelBuilder.Entity<ContentRecommendationFantasy>().HasNoKey();

        base.OnModelCreating(modelBuilder);
    }

    
    
    
}