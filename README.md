# Clinica Leger

## Pré-requisitos

Certifique-se de ter o seguinte instalado em seu sistema:

- Node.js 
- npm 
- Docker (opcional, caso queira rodar os testes E2E)

## Passos para Execução

1. **Clonar o repositório**

   Clone o repositório do backend do GitHub para o seu computador:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd nome-do-repositorio
   ```

2. **Instalar as Dependências**

   Instale as dependências do projeto usando o npm:

   ```bash
   npm install
   ```

3. **Configurar Variáveis de Ambiente**

   Copie o arquivo `.env.example` na raiz do projeto.

   ```bash
   cp .env.example .env
   ```

4. **Gerar o Prisma Client**

   Use o Prisma CLI para gerar o Prisma Client, que é uma biblioteca para interagir com o banco de dados:

   ```bash
   npx prisma generate
   ```

5. **Criar as Tabelas do Banco de Dados**

   Use o Prisma Migrate para criar as tabelas no banco de dados:

   ```bash
   npx prisma migrate dev
   ```

   Isso criará as tabelas no banco de dados com base no schema definido no Prisma.

6. **Executar o Servidor**

   Agora você pode iniciar o servidor:

   ```bash
   npm run dev
   ```

   O servidor deve estar em execução e pronto para receber solicitações na porta especificada.

7. **Testando o Backend**

   Para testar a aplicação com os testes unitários, simplismente use o comando:

   ```bash
   npm run test
   ```

   Para testar a aplicação com os testes E2E, será necessário subir um banco de dados no docker.

   ```bash
   docker compose up -d
   ```

   Substitua no schema do prisma a url para:

   ```prisma
   datasource db {
    provider = "postgresql"
    url      = env("DATABASE_URL_TEST")
  }
   ```
   Depois siga os passos:

   ```bash
   npx prisma generate
   npm run test:e2e
   ```
