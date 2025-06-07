# Telecom API

API REST para gerenciamento de telecomunicações, incluindo operadoras, contratos e faturas.

## 🚀 Funcionalidades

### Controllers Implementados:

#### **FaturaController** (`/api/fatura`)
- `POST /api/fatura` - Criar nova fatura
- `PUT /api/fatura/{id}` - Atualizar fatura existente
- `DELETE /api/fatura/{id}` - Deletar fatura
- `GET /api/fatura/{id}` - Obter fatura por ID
- `GET /api/fatura` - Obter todas as faturas
- `GET /api/fatura/contrato/{contratoId}` - Obter faturas por contrato

#### **ContratoController** (`/api/contrato`)
- `POST /api/contrato` - Criar novo contrato
- `PUT /api/contrato/{id}` - Atualizar contrato existente
- `DELETE /api/contrato/{id}` - Deletar contrato
- `GET /api/contrato/{id}` - Obter contrato por ID
- `GET /api/contrato` - Obter todos os contratos
- `GET /api/contrato/operadora/{operadoraId}` - Obter contratos por operadora

#### **OperadoraController** (`/api/operadora`)
- `POST /api/operadora` - Criar nova operadora
- `PUT /api/operadora/{id}` - Atualizar operadora existente
- `DELETE /api/operadora/{id}` - Deletar operadora
- `GET /api/operadora/{id}` - Obter operadora por ID
- `GET /api/operadora` - Obter todas as operadoras

## 🛠️ Arquitetura

### **Middleware de Exceções**
- `ExceptionHandlingMiddleware` - Tratamento global de exceções
- Não há try-catch nos controllers
- Respostas padronizadas usando `HandleResult`

### **Injeção de Dependência**
- Configuração centralizada no projeto `telecom.IoC`
- `AddInfrastructure()` - Entity Framework, repositórios
- `AddApplication()` - Services, AutoMapper

### **Swagger/OpenAPI**
- Documentação automática da API
- Comentários XML incluídos
- Interface amigável para testes

## 📄 Exemplo de Uso

### Criar uma Fatura:
```json
POST /api/fatura
{
  "valor": 149.90,
  "dataVencimento": "2024-01-15T00:00:00Z",
  "contratoId": "123e4567-e89b-12d3-a456-426614174000",
  "status": 0
}
```

### Criar um Contrato:
```json
POST /api/contrato
{
  "nomeFilial": "Filial São Paulo",
  "planoContratado": "Plano Premium 10GB",
  "dataInicio": "2024-01-01T00:00:00Z",
  "dataVencimento": "2024-12-31T00:00:00Z",
  "valorMensal": 149.90,
  "operadoraId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Criar uma Operadora:
```json
POST /api/operadora
{
  "nome": "Vivo",
  "eTipoServicoOperadora": 0,
  "contatoSuporte": "1058"
}
```

## 🔄 Padrão de Resposta

Todas as respostas seguem o padrão `HandleResult`:

```json
{
  "sucess": true,
  "message": "Operação realizada com sucesso",
  "data": { ... },
  "errors": []
}
```

## ⚙️ Configuração

### Program.cs:
```csharp
// Configurar camadas
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

// Middleware de exceções
app.UseMiddleware<ExceptionHandlingMiddleware>();
```

## 🐛 Tratamento de Erros

### Status Codes Automáticos:
- `400 Bad Request` - Argumentos inválidos
- `401 Unauthorized` - Acesso não autorizado
- `404 Not Found` - Recurso não encontrado
- `500 Internal Server Error` - Erros internos

### Logs Automáticos:
- Todas as exceções são logadas automaticamente
- Contexto completo preservado para depuração

## 🚀 Como Executar

### **Desenvolvimento Local:**
1. Configure a connection string no `appsettings.Development.json`
2. Execute as migrations: `dotnet ef database update`
3. Inicie a aplicação: `dotnet run --launch-profile https`
4. Acesse o Swagger: `https://localhost:7283/swagger`

### **Container Docker (Debug):**
1. Configure PostgreSQL local com as credenciais do `appsettings.Debug.json`
2. Execute via Visual Studio selecionando "Container (Dockerfile)"
3. Ou via Docker CLI:
   ```bash
   docker build -t telecom-api .
   docker run -p 8080:8080 -p 8081:8081 -e ASPNETCORE_ENVIRONMENT=Debug telecom-api
   ```
4. Acesse o Swagger: `http://localhost:8080/swagger`

## 🌍 Ambientes Disponíveis

- **Development**: Desenvolvimento local (Host BD: `postgres`)
- **Debug**: Container Docker (Host BD: `localhost`)

## 📋 Tecnologias

- ASP.NET Core 8.0
- Entity Framework Core
- AutoMapper
- MediatR
- FluentValidation
- Swagger/OpenAPI
- PostgreSQL 