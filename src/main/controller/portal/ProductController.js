const ProductService = require('../../service/ProductService');

class ProductController {
  async detail (ctx) {
    const productId = ctx.query.product_id;
    const productService = new ProductService();
    const serverResponse = await productService.getProductDetail(productId);
    ctx.body = JSON.stringify(serverResponse);
  }
}

module.exports = { ProductController };
