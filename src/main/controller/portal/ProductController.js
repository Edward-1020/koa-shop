const ProductService = require('../../service/ProductService');

class ProductController {
  async detail (ctx) {
    const productId = ctx.query.product_id;
    const productService = new ProductService();
    const serverResponse = await productService.getProductDetail(productId);
    ctx.body = JSON.stringify(serverResponse);
  }

  async getProductList (ctx) {
    const {product_id, product_name, page_num, page_size} = ctx.query;
    const productService = new ProductService();
    const serverResponse = await productService.getProductList(product_id, product_name, page_num, page_size);
    ctx.body = JSON.stringify(serverResponse);
  }

  async getCategoryList (ctx) {
    const {category_id, category_name, page_num, page_size} = ctx.query;
    const productService = new ProductService();
    const serverResponse = await productService.getCategoryList(category_id, category_name, page_num, page_size);
    ctx.body = JSON.stringify(serverResponse);
  }
}

module.exports = { ProductController };
