const ServerResponse = require('../common/ServerResponse');
const ProductCode = require('../../common/Product');
const { selectByPrimaryKey } = require('../dao/mm_product');
const { selectCategoryPrimaryKey } = require('../dao/mm_category');

class ProductService {
  async getProductDetail (productId) {
    if (!productId) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    const productModel = await selectByPrimaryKey(productId);
    if (!productModel) {
      return ServerResponse.createByErrorMsg(`产品已下架或删除`);
    }
    let productDetail = productModel.get();
    if (productDetail.status !== ProductCode.ON_SALE.code) {
      return ServerResponse.createByErrorMsg(`产品已下架或删除`);
    }
    const categoryModel = await selectCategoryPrimaryKey(productDetail.category_id);
    if (!categoryModel) {
      productDetail.parent_category_id = 0;
    } else {
      productDetail.parent_category_id = categoryModel.get('id');
    }
    return ServerResponse.createBySuccessData(productDetail);
  }
}

module.exports = { ProductService };
