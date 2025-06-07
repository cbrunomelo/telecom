# Configurações de Ambiente - Telecom API

## 🌍 Ambientes Disponíveis

### **Development** (Padrão)
- **Perfis**: `http`, `https`, `IIS Express`
- **Configuração**: `appsettings.Development.json`
- **Banco**: `Host=postgres` (para containers Docker)
- **Log Level**: `Information`

### **Debug** (Container)
- **Perfil**: `Container (Dockerfile)`
- **Configuração**: `appsettings.Debug.json`
- **Banco**: `Host=localhost` (para conexão direta)
- **Log Level**: `Debug` (mais verboso)

## 🐳 Como Executar

### **Modo Development (Local):**
```bash
dotnet run --launch-profile https
# ou
dotnet run --launch-profile http
```

### **Modo Debug (Container):**
```bash
# Via Visual Studio: selecionar "Container (Dockerfile)"
# ou via Docker:
docker build -t telecom-api .
docker run -p 8080:8080 -p 8081:8081 -e ASPNETCORE_ENVIRONMENT=Debug telecom-api
```

## 🔗 Connection Strings

### **Development:**
```json
"DefaultConnection": "Host=postgres;Port=5432;Database=telecom;Username=telecom_user;Password=telecom_password"
```

### **Debug:**
```json
"DefaultConnection": "Host=localhost;Port=5432;Database=telecom;Username=telecom_user;Password=telecom_password"
```

## 📋 Diferenças entre Ambientes

| Aspecto | Development | Debug |
|---------|-------------|-------|
| Host BD | `postgres` | `localhost` |
| Log Level | `Information` | `Debug` |
| EF Logs | `Warning` | `Information` |
| Uso | Desenvolvimento local | Container/Debug |
| Swagger | ✅ | ✅ |

## ⚙️ Configuração do Banco

### **Para Development (Docker Compose):**
```yaml
services:
  postgres:
    image: postgres:15
    container_name: postgres
    # ... configurações
```

### **Para Debug (PostgreSQL Local):**
```bash
# Instalar PostgreSQL localmente
# Configurar usuário: telecom_user
# Configurar senha: telecom_password
# Criar database: telecom
```

## 🔍 Logs Debug

No ambiente Debug, você verá logs mais detalhados:
- Consultas SQL completas
- Parâmetros de comandos
- Informações de mapeamento
- Detalhes de middleware 