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

  async getDetail (ctx) {
    const { productId } = ctx.query;
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.manageProductDetail(productId);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 分页查找
   * @param {*} ctx
   */
  async getProductList (ctx) {
    let { pageNum, pageSize } = ctx.query;
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.getProductList(pageNum, pageSize);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 商品搜索
   */
  async searchProduct (ctx) {
    const { productName, productId, pageNum, pageSize } = ctx.query;
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.searchProduct(productName, productId, pageNum, pageSize);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 处理商品上传图片
   */
  async upload (ctx) {
    const productManageService = new ProductManageService();
    const serverResponse = await productManageService.upload(ctx);
    ctx.body = JSON.stringify(serverResponse);
  }
}
module.exports = ProductManageController;
