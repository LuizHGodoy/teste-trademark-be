# Projeto Backend Gerenciador de Tarefas

Este é um projeto backend desenvolvido com NestJS e Prisma, que gerencia usuários e tarefas. O sistema inclui autenticação JWT e validação de dados.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Requisitos](#requisitos)
- [Licença](#licença)

## Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [JWT](https://jwt.io/)

## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/LuizHGodoy/teste-trademark-be.git
   cd teste-trademark-be
   ```

2. Instale as dependências:
   ```bash
   pnpm i
   ```

3. Configure o arquivo `.env`:
   - Renomeie o arquivo `.env.example` para `.env` e preencha as variáveis de ambiente:
     ```env
     DATABASE_URL=postgresql://usuario:senha@localhost:5432/nome_do_banco
     JWT_SECRET=seu_segredo_jwt
     ```

4. Execute as migrações do Prisma:
   ```bash
   pnpm prisma migrate dev --name created_at_task
   ```

5. Inicie o servidor:
   ```bash
   pnpm run start:dev
   ```

## Uso

- Acesse a API em `http://localhost:3434/docs#/`.
- Utilize ferramentas como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/) para testar os endpoints.

### Endpoints Principais

- **Autenticação**
  - `POST /auth/signin`: Login de usuário.
  - `POST /auth/signup`: Registro de novo usuário.
  - `POST /auth/recover-password`: Recuperação de senha.

- **Usuários**  
  - `GET /usuarios`: Listar todos os usuários.
  - `GET /usuarios/:uuid`: Obter detalhes de um usuário.

- **Tarefas**
  - `POST /tarefas`: Criar uma nova tarefa.
  - `GET /tarefas`: Listar todas as tarefas.
  - `GET /tarefas/:uuid`: Obter detalhes de uma tarefa.
  - `PATCH /tarefas/:uuid`: Atualizar uma tarefa.
  - `DELETE /tarefas/:uuid`: Remover uma tarefa.

## Estrutura do Projeto

```
src/
├── modules/                # Módulos da aplicação
│   ├── auth/               # Módulo de autenticação
│   ├── users/              # Módulo de usuários
│   ├── tasks/              # Módulo de tarefas
├── services/               # Serviços compartilhados
│   └── prisma/             # Serviço Prisma
├── main.ts                 # Ponto de entrada da aplicação
└── app.module.ts           # Módulo raiz da aplicação
```

## Requisitos

- Node.js (versão 14 ou superior)
- PostgreSQL
- Dependências do projeto instaladas

## Licença

Este projeto não está licenciado para uso público. Todos os direitos reservados.
