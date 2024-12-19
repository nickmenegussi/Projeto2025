# Backend do Projeto [Centro Espírita Online/CEO]

Este é o backend do projeto **[CEO/Centro Espírita Online]**, desenvolvido com Node.js e Express. Ele fornece a base para a comunicação entre o front-end e o banco de dados, incluindo autenticação, gerenciamento de usuários e recursos adicionais.

## 🌟 Funcionalidades

- Autenticação e autorização (JWT).
- CRUD para gerenciamento de usuários e livros.
- Middlewares para controle de permissões.
- Upload de imagens (Multer).
- Conexão com banco de dados MySQL.

## 🚀 Tecnologias Utilizadas

### Back-End:

- **Node.js** (framework principal)
- **Express.js** (gerenciamento de rotas e middlewares)
- **MySQL** (banco de dados relacional)
- **Multer** (upload de arquivos)
- **JWT** (autenticação baseada em token)
- **dotenv** (gerenciamento de variáveis de ambiente)
- **bcrypt** (para criptografias)

## 📁 Estrutura do Projeto

project/
├── config/           # Configurações (DB, upload, etc.)
├── controllers/      # Lógica das rotas
├── middleware/       # Middlewares personalizados
├── routes/           # Definição das rotas do aplicativo
├── utils/            # Funções utilitárias
├── index.js          # Entrada principal do servidor
└── package.json      # Configurações do Node.js e dependências