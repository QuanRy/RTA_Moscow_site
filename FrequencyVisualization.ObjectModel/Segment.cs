namespace FrequencyVisualization.ObjectModel
{
    public class Segment : BaseModel
    {
        public string Name { get; set; }

        public double FrequencyBase { get; set; }

        public double FrequencyFinal { get; set; }

        public List<FactorValue> FactorValues { get; set; }

        // public CompanyItemId { get; set; }
    }
}
