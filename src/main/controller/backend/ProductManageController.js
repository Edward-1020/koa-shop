const ProductManageService = require('../../service/ProductManageService');

class ProductManageController {
  /**
   * 保存和更新商品
   * @param {*} ctx
   */
  async productSave (ctx) {
    // 是管理员
    let { product } = ctx.request.body;
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.saveOrUpdateProduct(product);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 更新产品销售状态
   * @param {*} ctx
   */
  async setSaleStatus (ctx) {
    const { productId, status } = ctx.query;
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.setSaleStatus(productId, status);
    ctx.body = JSON.stringify(serverResponse);
  }
}
module.exports = ProductManageController;
