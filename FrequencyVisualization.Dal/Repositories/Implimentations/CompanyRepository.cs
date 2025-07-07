using FrequencyVisualization.ObjectModel;
using Microsoft.EntityFrameworkCore;

namespace FrequencyVisualization.Dal
{
    public class CompanyRepository
    {
        readonly string _connString;

        public CompanyRepository(string connString)
        {
            _connString = connString;
        }

        public List<Company> Get(Func<Company, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Company>().Where(expr).ToList();
        }

        public Company GetFirstItem(Func<Company, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Company>().Include(x =>x.Segments).FirstOrDefault(expr);
        }

        public Company Create(Company model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Company>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public Company Update(Company model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                var comp = Context.Set<Company>().FirstOrDefault(x => x.Id == model.Id);
                comp.Segments = model.Segments;
                Context.SaveChanges();
                return model;
            }
        }

        public void Delete(Company model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Company>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}
