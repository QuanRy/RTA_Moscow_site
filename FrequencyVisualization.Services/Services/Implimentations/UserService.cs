using FrequencyVisualization.Dal;
using FrequencyVisualization.ObjectModel;
using System.Security.Cryptography;
using System.Text;

namespace FrequencyVisualization.Services
{
    public class UserService : IUserService
    {
        readonly UserRepository _repository;
        public UserService(string connString)
        {
            _repository = new UserRepository(connString);
        }

        public List<User> GetUsers()
        {

            Func<User, bool> expr = (User user) => { return true; };

            return _repository.Get(expr);
        }

        public User GetUserByLoginAndPassword(string login, string password)
        {
            var user = _repository.GetFirstItem(u => u.Login == login);
            if (user == null)
                return null;

            string encryptedInputPassword = EncryptPassword(password, login);
            return user.Password == encryptedInputPassword ? user : null;
        }

        public User CreateUser(string newFIO, string newLogin, string newPassword, string newRole)
        {

            if (_repository.GetFirstItem(u => u.Login == newLogin) != null)
                throw new Exception("Пользователь с таким логином уже существует.");

            string encryptedPassword = EncryptPassword(newPassword, newLogin);

            return _repository.Create(new User
            {
                FIO = newFIO,
                Role = newRole,
                Login = newLogin,
                Password = EncryptPassword (newPassword, newLogin)
            });
        }

        private string EncryptPassword(string password, string salt)
        {
            salt = salt.ToLower();
            using (var sha256 = SHA256.Create())
            {
                var saltedPassword = $"{salt}{password}";
                byte[] bytes = Encoding.UTF8.GetBytes(saltedPassword);
                return Convert.ToBase64String(sha256.ComputeHash(bytes));
            }
        }

        public User GetUserById(Guid Id)
        {

            Func<User, bool> expr = (User user) => { return user.Id == Id; };

            return _repository.GetFirstItem(expr);
        }

        public void DeleteUser(Guid Id)
        {
            User model = GetUserById(Id);
            _repository.Delete(model);
            return;

        }
    }
}