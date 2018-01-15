import { create } from 'domain';

const sequelize = require('../model/db');
const path = require('path');

const Cart = sequelize.import(path.resolve(__dirname, '../model/mmall_cart.js'));

const findCartByUserIdProductId = (userId, productId) => {
  return Cart.findOne({
    where: {
      'user_id': userId,
      'product_id': {
        '$and': productId
      }
    }
  });
};

const createCart = (cartItem) => {
  return Cart.create(cartItem);
};

const updateCart = (cartId, cartItem) => {
  return Cart.update(cartItem, {
    where: {
      'id': cartId
    }
  });
};

const findCartByUserId = (userId) => {
  return Cart.findAll({
    where: {
      'user_id': userId
    }
  });
};

module.exports = {findCartByUserIdProductId, createCart, updateCart, findCartByUserId};
