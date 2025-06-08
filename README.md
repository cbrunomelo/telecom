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
| **Frontend** |  | Aplicação Angular |
| **Backend** |  | API .NET |
| **PostgreSQL** |  | Banco de dados |


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
