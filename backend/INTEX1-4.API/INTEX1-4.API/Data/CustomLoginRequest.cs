namespace INTEX1_4.API.Data;

public class CustomLoginRequest
{
    public string Email { get; set; } = "";
    public string Password { get; set; } = "";
    public bool RememberMe { get; set; } = false;
}
