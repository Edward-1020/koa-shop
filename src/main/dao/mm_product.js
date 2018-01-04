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

const selectByPrimaryKey = (productId) => {
  return Product.findOne({
    attributes: [`id`, `category_id`, `name`, `subtitle`, `main_image`, `sub_images`, `detail`, `price`, `stock`, `status`, `create_time`, `update_time`],
    where: {
      'id': productId
    }
  });
};

module.exports = { updateByPrimaryKey, insert, selectByPrimaryKey };
