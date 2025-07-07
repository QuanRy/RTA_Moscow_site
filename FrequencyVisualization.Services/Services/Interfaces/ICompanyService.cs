using FrequencyVisualization.ObjectModel;
using FrequencyVisualization.ObjectModel.ViewModel;

namespace FrequencyVisualization.Services
{
    public interface ICompanyService
    {
        List<CompanyViewModel> GetCompanies(Guid UserId);

        Company GetCompanyById (Guid CompanyId);

        Company CreateCompany(string nameCompany, Guid UserId);

        Company SaveCompany (Company company);

        void DeleteCompany(Guid id);
    }
}
