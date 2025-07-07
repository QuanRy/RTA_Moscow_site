using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public interface IFactorService
    {
        List<Factor> GetFactors();

        void InitFactors();
    }
}
