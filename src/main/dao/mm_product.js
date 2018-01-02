const sequelize = require('../model/db');
const path = require('path');

const Product = sequelize.import(path.resolve(__dirname, '../model/mmall_product.js'));

const updateByPrimaryKey = (product) => {
  return Product.update(product, {
    where: {
      'id': product.id
    }
  });
};

const insert = (product) => {
  return Product.create(product);
};

module.exports = { updateByPrimaryKey, insert };
