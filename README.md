#  Sistema de Gestão de Produtos

Aplicação **CRUD completa** desenvolvida em **Node.js**, **Express**, **SQLite** e **JavaScript**, com **frontend moderno** e **integração AJAX**.  
O sistema permite cadastrar, visualizar, editar, excluir e pesquisar produtos, além de exportar os dados em formato **Excel**.

---
### Interface do Sistema

<img width="1920" height="1030" alt="Captura de tela 2025-11-11 211219" src="https://github.com/user-attachments/assets/a74b339d-6ed0-4ab7-b3b5-34a7d0ab5081" />

<img width="1920" height="1035" alt="Captura de tela 2025-11-11 211248" src="https://github.com/user-attachments/assets/03264913-9011-4068-8339-b3ab9313455d" />

<img width="1920" height="1023" alt="Captura de tela 2025-11-11 211305" src="https://github.com/user-attachments/assets/2f9f1654-db9a-4ed3-bcf7-2c7d1e884f05" />

---

##  Funcionalidades

###  Frontend
- Interface moderna inspirada em **painel administrativo** (dashboard)
- Cards informativos:
  - Total de Produtos
  - Valor Total em Estoque
  - Produtos com Estoque Baixo
  - Média de Preço
- Tabela dinâmica com listagem dos produtos
- Formulário para **adicionar novos produtos**
- Edição e exclusão via **AJAX**
- Campo de **busca** por nome (parcial ou completo)
- **Exportação dos produtos em Excel**

###  Backend
- API RESTful com rotas:
  - `GET /produtos` → lista todos os produtos  
  - `GET /produtos/:id` → exibe um produto específico  
  - `POST /produtos` → cria um novo produto  
  - `PUT /produtos/:id` → atualiza um produto existente  
  - `DELETE /produtos/:id` → exclui um produto  
  - `GET /produtos/buscar?nome=` → busca produtos pelo nome  
  - `GET /produtos/exportar` → exporta os dados em formato Excel
- Validação de dados:
  - **nome**: obrigatório
  - **preço**: número positivo
  - **quantidade**: número positivo
- Banco de dados **SQLite** integrado com Sequelize ORM

---

##  Estrutura de Pastas
```
produto-crud/
│
├── models/
│ └── product.js # Definição da tabela 'produtos'
│
├── public/
│ ├── app.js # Lógica do frontend (AJAX)
│ └── index.html # Interface moderna do sistema
│
├── database.sqlite # Banco de dados local
├── server.js # Servidor principal (Express)
├── package.json # Dependências e scripts
├── package-lock.json
├── LICENSE
└── README.md # Este arquivo
````

---

##  Tecnologias Utilizadas

- **Node.js**
- **Express**
- **Sequelize** + **SQLite**
- **JavaScript (AJAX)**
- **HTML5 / CSS3**
- **Bootstrap / Custom CSS**
- **xlsx** (para exportar planilha Excel)

---

##  Instalação e Execução

### Clonar repositório

```bash

git clone https://github.com/SEU_USUARIO/produto-crud.git


```
---

### Entrar na pasta do projeto

```bash
cd produto-crud

```

---

### Instalar as dependências

```bash
npm install

```
---

### Executar o servidor

```bash
npm run dev

```
---
O servidor iniciará em:
 http://localhost:3000

### Testando as Funcionalidades

- Abra o navegador em http://localhost:3000
- Adicione alguns produtos no formulário
- Edite e exclua produtos diretamente na tabela
- Use a busca parcial por nome
- Clique em “Exportar Excel” para baixar os dados

--- 
### Observações

- O projeto usa o banco local database.sqlite, criado automaticamente.

- Pode ser facilmente adaptado para MySQL ou PostgreSQL.

- O frontend foi estilizado manualmente para se aproximar de dashboards administrativos modernos.

---

### Autora
**Adriane da Costa Ferreira**

**Estudante de Ciência da Computação - UNIFAP**

---

### Licença

Este projeto está sob a licença **MIT** — sinta-se à vontade para usar e modificar.

---
