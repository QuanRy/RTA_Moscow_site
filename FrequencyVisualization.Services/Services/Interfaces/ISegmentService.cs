using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public interface ISegmentService
    {
        Segment GetSegmentById(Guid id);

        Segment CreateSegment(string nameSegment, Guid companyId,ICompanyService companyService);

        void DeleteSegmentById(Guid segmentId);

        void DeleteSegment(Segment segment);
    }
}
