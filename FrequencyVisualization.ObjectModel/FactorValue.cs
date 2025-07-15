namespace FrequencyVisualization.ObjectModel
{
    public class FactorValue : BaseModel
    {
        public Factor FactorItem { get; set; }

        public Segment SegmentItem { get; set; }

        public double Value { get; set; }
    }
}
