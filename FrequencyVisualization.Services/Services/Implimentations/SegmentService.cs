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

            //_repository.Create(segment);

            //segment.CompanyItem = CompanyService.GetCompanyById(companyId);

            var company = CompanyService.GetCompanyById(companyId);

            segment.FactorValues = _factorValueService.CreateDefaultValues(segment);

            company.Segments.Add(segment);
            CompanyService.SaveCompany(company);
            return segment;
        }

        public void DeleteSegment(Segment segment)
        {
            if (segment != null)
            {
                foreach (var item in segment.FactorValues)
                {
                    _factorValueService.DeleteFactorValue(item);
                }
                _repository.Delete(segment);
            }
        }

        public void DeleteSegmentById(Guid Id)
        {
            DeleteSegment(GetSegmentById(Id));
        }
    }
}
