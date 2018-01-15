class CartVo {
  constructor (cartOpts) {
    this.cartProductVoList = cartOpts.cartProductVoList;
    this.cartTotalPrice = cartOpts.cartTotalPrice;
    this.imageHost = cartOpts.imageHost;
  }
}

module.exports = CartVo;
