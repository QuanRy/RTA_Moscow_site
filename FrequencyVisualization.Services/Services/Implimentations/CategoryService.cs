//using FrequencyVisualization.Dal;
//using FrequencyVisualization.ObjectModel;

//namespace FrequencyVisualization.Services
//{
//    public class CategoryService : ICategoryService
//    {
//        readonly CategoryRepository _repository;
//        public CategoryService(string connString)
//        {
//            _repository = new CategoryRepository(connString);
//        }

//        public List<Category> GetCategories()
//        {

//            Func<Category, bool> expr = (Category сategory) => { return true; };

//            return _repository.Get(expr);
//        }

//        public List<Equipment> GetEquipmentsByName(string name)
//        {

//            Func<Equipment, bool> expr = (Equipment equipment) => { return equipment.Name.ToLower().StartsWith(name.ToLower()); };

//            return _repository.Get(expr);
//        }

//        public Equipment? GetEquipmentById(Guid Id)
//        {

//            Func<Equipment, bool> expr = (Equipment equipment) => { return equipment.Id == Id; };

//            return _repository.GetFirstItem(expr);
//        }

//        public void DeleteEquipment(Guid Id)
//        {
//            Equipment? model = GetEquipmentById(Id);
//            if(model != null)
//                _repository.Delete(model);
//        }

//        public List<FailureComplect> GetFailureComplects(Guid idEquipment)
//        {

//            Func<Equipment, bool> expr = (Equipment equipment) => { return equipment.Id == idEquipment; };

//            Equipment equipment = _repository.GetFirstItem(expr);

//            if (equipment == null)
//            {
//                return new List<FailureComplect>();
//            }

//            return equipment.FailureComplects;
//        }

//        public Equipment CreateEquipment(Equipment equipment)
//        {
//            return _repository .Create(equipment);
//        }
//    }
//}
