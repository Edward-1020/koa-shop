const moment = require('moment');
const BigNumber = require('bignumber.js');
const ServerResponse = require('../common/ServerResponse');
const cartConst = require('../common/Cart');
const CartVo = require('../vo/CartVo');
const CartProductVo = require('../vo/CartProductVo');
const { findCartByUserIdProductId, createCart, updateCart, findCartByUserId } = require('../dao/mm_cart');

class CartService {
  async add (userId, productId, count) {
    const carModel = await findCartByUserIdProductId(userId, productId);
    if (!carModel) {
      // 说明产品不再购物车，需要新增产品记录
      let cartItem = {
        quantity: count,
        checked: cartConst.CHECKED,
        product_id: productId,
        user_id: userId,
        create_time: moment().format(),
        update_time: moment().format()
      };
      await createCart(cartItem);
    }
    if (carModel) {
      // 这个产品已经在购物车里，增加产品数量
      let carItem = {
        'quantity': carModel.get('quantity') + 1,
        'update_time': moment().format()
      };
      await updateCart(carModel.get('id'), carItem);
    }
    return null;
  }

  async getCartVoLimit (userId) {
    let cartVo = new CartVo();
    let cartTotalPrice = new BigNumber(0);

    let cartModelArr = await findCartByUserId(userId);
    let cartArr = cartModelArr.map(cartItem => cartItem.get());
    let cartProductVoArr = [];
    for (const cartItem of cartArr) {
      let cartProductVo = new CartProductVo();
      cartProductVo.id = cartItem.id;
      cartProductVo.userId = cartItem.user_id;
      cartProductVo.productId = cartItem.product_id;
    }
  }
}

module.exports = CartService;
