using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class FactorValueRepository
    {
        readonly string _connString;

        public FactorValueRepository(string connString)
        {
            _connString = connString;
        }

        public List<FactorValue> Get(Func<FactorValue, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<FactorValue>().Where(expr).ToList();
        }

        public FactorValue GetFirstItem(Func<FactorValue, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<FactorValue>().FirstOrDefault(expr);
        }

        public FactorValue Create(FactorValue model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<FactorValue>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public List<FactorValue> Create(List<FactorValue> factorValues)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<FactorValue>().AddRange(factorValues);
                Context.SaveChanges();
                return factorValues;
            }
        }

        public void Delete(FactorValue model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<FactorValue>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}





