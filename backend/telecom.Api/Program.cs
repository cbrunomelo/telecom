using telecom.Api.Extensions;
using telecom.Api.Middlewares;
using telecom.Application.Extensions;
using telecom.IoC;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configuração do Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerConfiguration();

// Configuração de injeção de dependência das camadas
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddApplication();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


var app = builder.Build();

// Middleware de tratamento de exceções (deve ser o primeiro)
app.UseMiddleware<ExceptionHandlingMiddleware>();

// Aplicar migrations automaticamente na inicialização
await app.Services.ApplyMigrationsAsync();

app.UseSwagger();
app.UseSwaggerUI();
app.UseCors("AllowAll");


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
