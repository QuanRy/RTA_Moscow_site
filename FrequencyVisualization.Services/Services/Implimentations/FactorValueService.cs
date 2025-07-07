using FrequencyVisualization.Dal;
using FrequencyVisualization.ObjectModel;
using FrequencyVisualization.ObjectModel.ViewModel;

namespace FrequencyVisualization.Services
{
    public class FactorValueService : IFactorValueService
    {
        readonly FactorValueRepository _repository;
        readonly IFactorService _factorService;

        public FactorValueService(string connString)
        {
            _repository = new FactorValueRepository(connString);
            _factorService = new FactorService(connString);
        }

        public List<FactorValue> CreateDefaultValues(Segment segment)
        {
            var factors = _factorService.GetFactors();
            var factorValues = factors.Select(x => new FactorValue()
            {
                FactorItem = x,
                SegmentItem = segment,
                Value = 0
            }).ToList();

            _repository.Create(factorValues);
            return factorValues;
        }

        public void DeleteFactorValue(FactorValue factorValue)
        {
            _repository.Delete(factorValue);
            return;
        }
    }
}