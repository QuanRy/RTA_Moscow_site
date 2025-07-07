using FrequencyVisualization.Dal;
using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public class SegmentService : ISegmentService
    {
        readonly SegmentRepository _repository;
        readonly IFactorValueService _factorValueService;
        //readonly ICompanyService _companyService;
        public SegmentService(string connString)
        {
            _repository = new SegmentRepository(connString);
            _factorValueService = new FactorValueService(connString);
            //_companyService = new CompanyService(connString);
        }

         public Segment GetSegmentById(Guid Id)
        {

            Func<Segment, bool> expr = (Segment segment) => { return segment.Id == Id; };

            return _repository.GetFirstItem(expr);
        }

        public Segment CreateSegment(string nameSegment, Guid companyId, ICompanyService CompanyService)
        {
            var segment = new Segment();
            segment.Name = nameSegment;
            segment.CompanyItem = CompanyService.GetCompanyById(companyId);

            _repository.Create(segment);

            segment.FactorValues = _factorValueService.CreateDefaultValues(segment);

            segment.CompanyItem.Segments.Add(segment);
            CompanyService.SaveCompany(segment.CompanyItem);
            return segment;
        }

        public void DeleteSegment(Segment segment)
        {
            _repository.Delete(segment);

            foreach (var item in segment.FactorValues)
            {
                _factorValueService.DeleteFactorValue(item);
            }

            if (segment != null)
                _repository.Delete(segment);
        }

        public void DeleteSegmentById(Guid Id)
        {
            DeleteSegment(GetSegmentById(Id));
        }
    }
}
