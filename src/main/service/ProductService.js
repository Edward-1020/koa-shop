const ServerResponse = require('../common/ServerResponse');
const ProductCode = require('../../common/Product');
const { selectByPrimaryKey } = require('../dao/mm_product');
const { selectCategoryPrimaryKey, selectProduct, findAllCategory } = require('../dao/mm_category');

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

  async getProductList (productId, productName, pageNum, pageSize) {
    if (!productId && !productName) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    const productModelArr = await selectProduct(productName, productId, pageNum, pageSize);
    if (!productModelArr.length) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    let productArr = productModelArr.map(productModel => productModel.get());
    return ServerResponse.createBySuccessData(productArr);
  }

  async getCategoryList (categoryId, categoryName, pageNum = 1, pageSize = 10) {
    if (!categoryId && !categoryName) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    const categoryModelArr = await findAllCategory(categoryId, categoryName, pageNum, pageSize);
    const categoryArr = categoryModelArr.map(categoryModel => categoryModel.get());
    return ServerResponse.createBySuccessData(categoryArr);
  }
}

module.exports = { ProductService };
