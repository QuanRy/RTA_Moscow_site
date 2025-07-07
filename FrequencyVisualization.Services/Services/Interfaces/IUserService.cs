using FrequencyVisualization.ObjectModel;

namespace FrequencyVisualization.Services
{
    public interface IUserService
    {
        User GetUserById(Guid id);

        List<User> GetUsers();

        void DeleteUser(Guid id);

        User GetUserByLoginAndPassword(string login, string password);

        User CreateUser(string newFIO, string newRole, string newLogin, string newPassword);
    }
}