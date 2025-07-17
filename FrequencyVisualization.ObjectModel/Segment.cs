using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace FrequencyVisualization.ObjectModel
{
    public class Segment : BaseModel
    {
        public string Name { get; set; }

        public double FrequencyBase { get; set; }

        public double FrequencyFinal { get; set; }

        public List<FactorValue> FactorValues { get; set; }

        // ВОТ ДОБАВИЛ ЭТО + USING (сверху их не было), иначе нет информации в сегменте, какой компании он принадлежит
        // =======================================================================================
        [ForeignKey("Company")]  // указываем, что это внешний ключ на Company
        public Guid CompanyItemId { get; set; }

        public Company Company { get; set; }
        // =======================================================================================
    }
}
