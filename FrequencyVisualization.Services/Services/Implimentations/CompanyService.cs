using FrequencyVisualization.Dal;
using FrequencyVisualization.ObjectModel;
using FrequencyVisualization.ObjectModel.ViewModel;

namespace FrequencyVisualization.Services
{
    public class CompanyService : ICompanyService
    {
        readonly CompanyRepository _repository;
        //readonly ISegmentService _segmentService;
        public CompanyService(string connString)
        {
            _repository = new CompanyRepository(connString);
            //_segmentService = new SegmentService(connString);
        }

        public List<CompanyViewModel> GetCompanies(Guid UserId)
        {

            Func<Company, bool> expr = (Company company) => { return company.UserId == UserId; };

            return _repository.Get(expr).Select(x => new CompanyViewModel()
            {
                CompanyName = x.Name,
                Id = x.Id
            }).ToList();
        }

        public Company GetCompanyById(Guid Id)
        {

            Func<Company, bool> expr = (Company company) => { return company.Id == Id; };

            return _repository.GetFirstItem(expr);
        }

        public Company CreateCompany(string nameCompany, Guid userId)
        {
            var company = new Company();
            company.Name = nameCompany;
            company.UserId = userId;

            return _repository.Create(company);
        }

        public Company SaveCompany(Company company)
        {
            return _repository.Update(company);
        }

        public void DeleteCompany(Guid Id)
        {
            //Company company = GetCompanyById(Id);

            //foreach (var item in company.Segments)
            //{
            //    _segmentService.DeleteSegment(item);
            //}

            //if (company != null)
            //    _repository.Delete(company);
        }
    }
}
