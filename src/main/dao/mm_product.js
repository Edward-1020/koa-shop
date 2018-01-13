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

const selectProductList = (pageNum = 1, pageSize = 10) => {
  return Product.findAndCount({
    attributes: ['id', 'category_id', 'name', 'sbutitle', 'main_image', 'sub_images', 'price', 'stock'],
    order: ['id', 'ASC'],
    limit: pageSize,
    offset: (((pageNum - 1) | 0) * pageSize) | 0
  });
};

const selectProduct = (productName, productId, pageNum = 1, pageSize = 10) => {
  if (productId && !productName) {
    return Product.findOne({
      attributes: ['id', 'category_id', 'name', 'sbutitle', 'main_image', 'sub_images', 'price', 'stock'],
      where: {
        'id': productId
      },
      limit: pageSize,
      offset: (((pageNum - 1) | 0) * pageSize) | 0
    });
  }
  if (!productId && productName) {
    return Product.findOne({
      attributes: ['id', 'category_id', 'name', 'sbutitle', 'main_image', 'sub_images', 'price', 'stock'],
      where: {
        name: {
          '$like': productName
        }
      },
      limit: pageSize,
      offset: (((pageNum - 1) | 0) * pageSize) | 0
    });
  }
  if (productId && productName) {
    return Product.findAll({
      attributes: ['id', 'category_id', 'name', 'sbutitle', 'main_image', 'sub_images', 'price', 'stock'],
      where: {
        'id': productId,
        'name': {
          '$like': `%${productName}%`
        }
      },
      limit: pageSize,
      offset: (((pageNum - 1) | 0) * pageSize) | 0
    });
  }
};

module.exports = { updateByPrimaryKey, insert, selectByPrimaryKey, selectProductList, selectProduct };
