const R = require('ramda');
const moment = require('moment');
const ServerResponse = require('../common/ServerResponse');
const { insert } = require('../dao/mm_category');

class CategoryService {
  async addCategory (categoryName, parentId) {
    if (!R.trim(categoryName) || !parentId) {
      return ServerResponse.createByErrorMsg(`添加品类参数错误`);
    }

    let category = {};
    category.name = categoryName;
    category.parentId = parentId;
    category.status = 1;
    category.createTime = moment().format();
    category.updateTime = moment().format();
    const categoryAddModel = await insert(category);
    const categoryNew = categoryAddModel.get();
    if (categoryNew) {
      return ServerResponse.createBySuccessMsg(`添加品类成功`);
    }
    return ServerResponse.createByErrorMsg(`添加品类失败`);
  }
}

module.exports = CategoryService;
