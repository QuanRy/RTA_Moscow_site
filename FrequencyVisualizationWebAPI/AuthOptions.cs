using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace FrequencyVisualizationWebAPI
{
    public static class AuthOptions
    {
        public static string ISSUER = "RTAServer"; // издатель токена
        public static string AUDIENCE = "RTAClient"; // потребитель токена
        static string KEY = "zwxe67c5rt5fvgy9b0hu0987tf79v";   // ключ для шифрации
        public static SymmetricSecurityKey GetSymmetricSecurityKey() =>
            new SymmetricSecurityKey(Encoding.UTF8.GetBytes(KEY));
        public static string ConnectionString = "Data Source = (localdb)\\MSSQLLocalDB;Initial Catalog = FrequencyVisualization; Integrated Security = True;";
    }
}
