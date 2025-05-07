using Microsoft.EntityFrameworkCore;
using BitkiBakimApi.Models;
using System.Collections.Generic;

namespace BitkiBakimApi.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<Bitki> Bitkiler { get; set; }
    }
}