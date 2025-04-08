using INTEX1_4.API.Data;
using Microsoft.EntityFrameworkCore;

public class CollabDbContext : DbContext
{
    public CollabDbContext(DbContextOptions<CollabDbContext> options)
        : base(options) { }

    public DbSet<CollabRecommendation> CollabRecommendations { get; set; }
}