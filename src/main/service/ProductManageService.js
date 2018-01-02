const ServerResponse = require('../common/ServerResponse');
const { updateByPrimaryKey, insert } = require('../dao/mm_product');
const moment = require('moment');

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
}

module.exports = ProductManageService;
