const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, Op } = require('sequelize');
const path = require('path');


// Conecta ao banco SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'database.sqlite'),
  logging: false
});


// Importa modelo de produto
const defineProduct = require('./models/product');
const Product = defineProduct(sequelize);


// Cria tabela (se não existir)
(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('✅ Banco conectado e tabela sincronizada.');
  } catch (err) {
    console.error('Erro ao conectar ao banco:', err);
  }
})();


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// === ROTAS ===


// Listar todos os produtos
app.get('/products', async (req, res) => {
  try {
    const produtos = await Product.findAll({ order: [['id', 'ASC']] });
    res.json(produtos);
  } catch {
    res.status(500).json({ error: 'Erro ao listar produtos.' });
  }
});


// Detalhes de um produto
app.get('/products/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado.' });
  res.json(p);
});


// Criar novo produto
app.post('/products', async (req, res) => {
  try {
    const { nome, descricao, preco, quantidade } = req.body;
    const novo = await Product.create({
      nome,
      descricao,
      preco: parseFloat(preco),
      quantidade: parseInt(quantidade, 10)
    });
    res.status(201).json(novo);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const mensagens = err.errors.map(e => e.message);
      res.status(400).json({ errors: mensagens });
    } else {
      res.status(500).json({ error: 'Erro ao criar produto.' });
    }
  }
});


// Atualizar produto
app.put('/products/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado.' });


  try {
    const { nome, descricao, preco, quantidade } = req.body;
    p.nome = nome || p.nome;
    p.descricao = descricao || p.descricao;
    if (preco !== undefined) p.preco = parseFloat(preco);
    if (quantidade !== undefined) p.quantidade = parseInt(quantidade, 10);
    await p.save();
    res.json(p);
  } catch (err) {
    if (err.name === 'SequelizeValidationError') {
      const mensagens = err.errors.map(e => e.message);
      res.status(400).json({ errors: mensagens });
    } else {
      res.status(500).json({ error: 'Erro ao atualizar produto.' });
    }
  }
});


// Excluir produto
app.delete('/products/:id', async (req, res) => {
  const p = await Product.findByPk(req.params.id);
  if (!p) return res.status(404).json({ error: 'Produto não encontrado.' });
  await p.destroy();
  res.json({ message: 'Produto excluído com sucesso.' });
});


// Busca parcial por nome
app.get('/products/search', async (req, res) => {
  const q = req.query.q || '';
  const produtos = await Product.findAll({
    where: { nome: { [Op.like]: `%${q}%` } },
    order: [['id', 'ASC']]
  });
  res.json(produtos);
});


// Inicia servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
