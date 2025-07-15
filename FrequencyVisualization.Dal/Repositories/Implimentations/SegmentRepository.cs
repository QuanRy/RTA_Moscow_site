using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Dal
{
    public class SegmentRepository 
    {
        readonly string _connString;

        public SegmentRepository(string connString)
        {
            _connString = connString;
        }

        public List <Segment> Get(Func<Segment, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Segment>().Where(expr).ToList();
        }

        public Segment GetFirstItem(Func<Segment, bool> expr)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
                return Context.Set<Segment>().FirstOrDefault(expr);
        }

        public Segment Create(Segment model)
        {
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Segment>().Add(model);
                Context.SaveChanges();
                return model;
            }
        }

        public void Delete(Segment model)
        { 
            using (ApplicationContext Context = new ApplicationContext(_connString))
            {
                Context.Set<Segment>().Remove(model);
                Context.SaveChanges();
            }
        }
    }
}
