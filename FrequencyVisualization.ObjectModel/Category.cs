namespace FrequencyVisualization.ObjectModel
{
    public class Category : BaseModel
    {
        public string Name { get; set; }

        public List<Factor> Factors { get; set; }
    }
}
