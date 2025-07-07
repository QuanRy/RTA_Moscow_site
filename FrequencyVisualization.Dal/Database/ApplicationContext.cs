using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Category> Categories { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Factor> Factors { get; set; }
        public DbSet<FactorValue> FactorsValues { get; set; }
        public DbSet<Segment> Segments { get; set; }
        public DbSet<User> Users { get; set; }

        private string _connString {get; set;}

        public ApplicationContext(string connString) : base()
        {
            Database.SetConnectionString(connString);
            Database.EnsureCreated();
            _connString = connString;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Segment>().Navigation(e => e.FactorValues).AutoInclude();
            modelBuilder.Entity<FactorValue>().Navigation(e => e.FactorItem).AutoInclude();
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(_connString);
            }
        }
    }
}
