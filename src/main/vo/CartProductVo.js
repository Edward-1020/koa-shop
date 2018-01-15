class CartProductVo {
  constructor (cartPrdroductOpts) {
    this.id = cartPrdroductOpts.id;
    this.userId = cartPrdroductOpts.userId;
    this.productId = cartPrdroductOpts.productId;
    this.quantity = cartPrdroductOpts.quantity;
    this.productName = cartPrdroductOpts.productName;
    this.productSubtitle = cartPrdroductOpts.productSubtitle;
    this.productMainImage = cartPrdroductOpts.productMainImage;
    this.productPrice = cartPrdroductOpts.productPrice;
    this.productStatus = cartPrdroductOpts.productStatus;
    this.productTotalPrice = cartPrdroductOpts.productTotalPrice;
    this.productStock = cartPrdroductOpts.productStock;
    this.productChecked = cartPrdroductOpts.productChecked;
    this.limitQuantity = cartPrdroductOpts.limitQuantity;
  }
}

module.exports = CartProductVo;
