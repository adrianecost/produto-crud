const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "O campo 'nome' não pode estar vazio." }
      }
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    preco: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isFloat: { msg: "Preço deve ser um número." },
        min: { args: [0], msg: "Preço deve ser um número positivo." }
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: { msg: "Quantidade deve ser um número inteiro." },
        min: { args: [0], msg: "Quantidade deve ser um número positivo." }
      }
    }
  }, {
    tableName: 'produtos',
    timestamps: true
  });

  return Product;
};
