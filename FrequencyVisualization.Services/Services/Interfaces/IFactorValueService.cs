using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public interface IFactorValueService
    {
        List<FactorValue> CreateDefaultValues(Segment segment);

        void DeleteFactorValue(FactorValue factorValue);
    }

}
