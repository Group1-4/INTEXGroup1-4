

using Microsoft.EntityFrameworkCore;

namespace INTEX1_4.API.Data;

public class MoviesDbContext : DbContext
{
    public MoviesDbContext(DbContextOptions<MoviesDbContext> options) : base(options)
    {
        
    }
    public DbSet<Movie> movies_titles { get; set; }
    public DbSet<MoviesUser> movies_users { get; set; }
    public DbSet<MovieRating> movies_ratings { get; set; }
}