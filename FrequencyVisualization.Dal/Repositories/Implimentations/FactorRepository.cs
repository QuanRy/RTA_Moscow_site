using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class FactorRepository
    {
        readonly string _connString;

        public FactorRepository(string connString)
        {
            _connString = connString;
        }

        public List<Factor> Get(Func<Factor, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Factor>().Where(expr).ToList();
        }

        public Factor GetFirstItem(Func<Factor, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Factor>().FirstOrDefault(expr);
        }

        public Factor Create(Factor model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Factor>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public List<Factor> Create(List<Factor> factors)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Factor>().AddRange(factors);
                Context.SaveChanges();
                return factors;
            }
        }

        public void Delete(Factor model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Factor>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}
