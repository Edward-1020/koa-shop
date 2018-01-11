const ServerResponse = require('../common/ServerResponse');
const { updateByPrimaryKey, insert, selectByPrimaryKey, selectProductList, selectProduct } = require('../dao/mm_product');
const { selectCategoryPrimaryKey } = require('../dao/mm_category');
const { uploadFile } = require('../util/file');
const moment = require('moment');
const path = require('path');

class ProductManageService {
  /**
   * 保存和更新产品
   */
  async saveOrUpdateProduct (product) {
    if (!product) {
      return ServerResponse.createByErrorMsg(`新增或更新产品参数不正确`);
    }
    //  如果子图不是空，取第一个子图赋值给我们的主图
    if (product.subImages) {
      const subImagesArr = product.subImages.split(',');
      if (!subImagesArr.length) {
        product.mainImage = subImagesArr[0];
      }
    }
    if (product.id) {
      product.update_time = moment().format();
      const [rowCount] = await updateByPrimaryKey(product);
      if (rowCount > 0) {
        return ServerResponse.createBySuccessMsg(`更新产品成功`);
      }
      return ServerResponse.createBySuccessMsg(`更新产品失败`);
    } else {
      product.create_time = moment().format();
      product.update_time = moment().format();
      const productModel = await insert(product);
      if (productModel) {
        return ServerResponse.createBySuccessMsg(`新增产品成功`);
      }
      return ServerResponse.createBySuccessMsg(`新增产品失败`);
    }
  }

  /**
   * 更新产品销售状态
   */
  async setSaleStatus (productId, status) {
    if (!productId || !status) {
      return ServerResponse.createByErrorMsg(`参数不正确`);
    }
    let product = {};
    product.id = productId;
    product.status = status;
    product.update_time = moment().format();
    const [rowCount] = await updateByPrimaryKey(product);
    if (rowCount > 0) {
      return ServerResponse.createBySuccessMsg(`更新产品销售状态成功`);
    }
    return ServerResponse.createBySuccessMsg(`更新产品销售状态失败`);
  }

  async manageProductDetail (productId) {
    if (!productId) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    const productModel = await selectByPrimaryKey(productId);
    if (!productModel) {
      return ServerResponse.createByErrorMsg(`产品已下架或删除`);
    }
    let productDetail = productModel.get();
    const categoryModel = await selectCategoryPrimaryKey(productDetail.category_id);
    if (!categoryModel) {
      productDetail.parent_category_id = 0;
    } else {
      productDetail.parent_category_id = categoryModel.get('id');
    }
    return ServerResponse.createBySuccessData(productDetail);
  }

  /**
   * 分页查找
   * @param {*} pageNum
   * @param {*} pageSize
   */
  async getProductList (pageNum, pageSize) {
    const [rows, count] = await selectProductList();
    let ProductList = rows.map(productModel => productModel.get());
    return ServerResponse.createBySuccessData({
      productList: ProductList,
      pageNum: pageNum,
      pageSize: pageSize,
      total: count
    });
  }

  async searchProduct (productName, productId, pageNum, pageSize) {
    const productModelArr = await selectProduct(productName, productId, pageNum, pageSize);
    if (!productModelArr.length) {
      return ServerResponse.createByErrorMsg(`参数错误`);
    }
    let productArr = productModelArr.map(productModel => productModel.get());
    return ServerResponse.createBySuccessData(productArr);
  }

  /**
   * 上传文件
   */
  async upload (ctx) {
    const result = await uploadFile(ctx, {
      fileType: 'img',
      path: path.resolve(process.cwd(), './src', './static-files')
    });
    if (result.success) {
      return ServerResponse.createBySuccessData(result);
    } else {
      return ServerResponse.createByErrorMsg(`传输文件失败`);
    }
  }
}

module.exports = ProductManageService;
