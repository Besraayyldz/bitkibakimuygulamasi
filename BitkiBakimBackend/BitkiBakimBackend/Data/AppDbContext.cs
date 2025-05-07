using Microsoft.EntityFrameworkCore;
using BitkiBakimBackend.Models;

namespace BitkiBakimBackend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Plant> Plants { get; set; }  // Plant tablosu
        public DbSet<User> Users { get; set; } 

    }
}
