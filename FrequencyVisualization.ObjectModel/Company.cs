namespace FrequencyVisualization.ObjectModel
{
    public class Company : BaseModel
    {
        public string Name { get; set; }

        public List<Segment> Segments { get; set; }

        public Guid UserId { get; set; }

        //public bool IsTemplate { get; set; }
    }
}
