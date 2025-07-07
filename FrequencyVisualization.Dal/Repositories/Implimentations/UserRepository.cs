using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class UserRepository 
    {
        readonly string _connString;

        public UserRepository(string connString)
        {
            _connString = connString;
        }

        public List <User> Get(Func<User, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<User>().Where(expr).ToList();
        }

        public User GetFirstItem(Func<User, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<User>().FirstOrDefault(expr);
        }

        public User Create(User model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<User>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public void Delete(User model)
        { 
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<User>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}
