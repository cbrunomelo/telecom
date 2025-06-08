# 📱 Sistema de Gestão Telecom

Sistema completo para gestão de contratos de telecomunicações com frontend Angular e backend .NET.

## 🚀 Como executar o projeto

### ⚠️ Pré-requisitos

- **Docker** e **Docker Compose** instalados
- **Porta 80 disponível** no seu sistema (não pode estar em uso por outros serviços)

### 📋 Passos para executar

1. **Clone o repositório** (se ainda não fez):
   ```bash
   git clone <url-do-repositorio>
   cd telecom
   ```

2. **Entre na pasta compose**:
   ```bash
   cd compose
   ```

3. **Execute o comando Docker Compose**:
   ```bash
   docker-compose up --build -d
   ```

4. **Aguarde** os containers serem criados e iniciados (pode levar alguns minutos na primeira execução)

5. **Acesse a aplicação**:
   - Frontend: **http://localhost**
   - API: **http://localhost/api**

## 🐳 Serviços incluídos

| Serviço | Porta | Descrição |
|---------|-------|-----------|
| **Nginx** | 80 | Proxy reverso (ponto de entrada) |
| **Frontend** | 4200 | Aplicação Angular |
| **Backend** | 8080 | API .NET |
| **PostgreSQL** | 5432 | Banco de dados |

## 📖 Comandos úteis

### Ver logs dos containers
```bash
# Todos os logs
docker-compose logs -f

# Logs específicos
docker-compose logs -f frontend
docker-compose logs -f backend
docker-compose logs -f nginx
```

### Parar a aplicação
```bash
docker-compose down
```

### Rebuild completo (quando houver mudanças no código)
```bash
docker-compose down
docker-compose up --build -d
```

### Verificar status dos containers
```bash
docker-compose ps
```

## 🔧 Troubleshooting

### Porta 80 ocupada
Se a porta 80 estiver em uso, você verá um erro como:
```
Error starting userland proxy: listen tcp4 0.0.0.0:80: bind: address already in use
```

**Soluções:**
- Pare o serviço que está usando a porta 80 (IIS, Apache, etc.)
- Ou altere a porta no `docker-compose.yml` (linha do nginx: `"80:80"` → `"8080:80"`)

### Container não sobe
```bash
# Verificar logs de erro
docker-compose logs <nome-do-serviço>

# Reconstruir do zero
docker-compose down --volumes
docker-compose up --build -d
```

### Limpar cache Docker (se necessário)
```bash
docker system prune -a
```

## 📱 Funcionalidades

- ✅ **Gestão de Operadoras**
- ✅ **Gestão de Contratos**
- ✅ **Gestão de Faturas**
- ✅ **Dashboard com métricas**
- ✅ **Filtros e paginação**
- ✅ **Validação de formulários**
- ✅ **Responsivo para mobile**

## 🏗️ Arquitetura

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│    Frontend     │    │      Nginx      │    │     Backend     │
│   (Angular)     │◄──►│ (Proxy Reverso) │◄──►│     (.NET)      │
│   localhost     │    │   localhost:80  │    │   localhost     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                                        │
                                               ┌─────────────────┐
                                               │   PostgreSQL    │
                                               │  (Base de Dados)│
                                               └─────────────────┘
```

## 📞 Suporte

Em caso de problemas:
1. Verifique se todos os pré-requisitos estão atendidos
2. Consulte a seção de troubleshooting
3. Verifique os logs dos containers
4. Entre em contato com a equipe de desenvolvimento 