using Models_Library.Models;

namespace Web_Library.Auth
{
    public interface IJWTAuthManager
    {
        string GenerateJWT(User user);
    }
}
