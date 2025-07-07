using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class CategoryRepository
    {
        readonly string _connString;

        public CategoryRepository(string connString)
        {
            _connString = connString;
        }

        public List<Category> Get(Func<Category, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Category>().Where(expr).ToList();
        }

        public Category? GetFirstItem(Func<Category, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Category>().FirstOrDefault(expr);
        }

        public Category Create(Category model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Category>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public void Delete(Category model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Category>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}
