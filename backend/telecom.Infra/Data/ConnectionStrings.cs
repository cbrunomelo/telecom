namespace telecom.Infra.Data;

internal static class ConnectionStrings
{
    /// <summary>
    /// Connection string para desenvolvimento local usando Docker
    /// </summary>
    public const string Development = "Host=localhost;Port=5432;Database=telecom;Username=telecom_user;Password=telecom_password";
   
} 