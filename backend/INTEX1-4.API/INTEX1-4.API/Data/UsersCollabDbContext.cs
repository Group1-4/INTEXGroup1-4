
using Microsoft.EntityFrameworkCore;

namespace INTEX1_4.API.Data
{
    public class UsersCollabDbContext : DbContext
    {
        public UsersCollabDbContext(DbContextOptions<UsersCollabDbContext> options)
            : base(options) { }

        public DbSet<UsersCollab> UsersCollab { get; set; }
    }
}