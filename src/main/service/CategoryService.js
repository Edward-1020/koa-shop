const R = require('ramda');
const moment = require('moment');
const ServerResponse = require('../common/ServerResponse');
const { insert, updateCategorySelective, selectCategoryChildrenByParenId } = require('../dao/mm_category');

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

  async updateCategoryName (categoryId, categoryName) {
    if (!R.trim(categoryName) || !categoryId) {
      return ServerResponse.createByErrorMsg(`更新品类参数错误`);
    }
    let category = {};
    category.id = categoryId;
    category.categoryName = categoryName;
    category.updateTime = moment().format();
    const updateCatogorySelectiveModel = await updateCategorySelective(category);
    const [rowCount] = updateCatogorySelectiveModel;
    if (rowCount > 0) {
      return ServerResponse.createBySuccessMsg(`更新品类名字成功`);
    }
    return ServerResponse.createByErrorMsg(`更新品类名字失败`);
  }

  async getChildrenParallelCategory (categoryId = 0) {
    const categoryModelArr = await selectCategoryChildrenByParenId(categoryId);
    if (!categoryModelArr.length) {
      return ServerResponse.createByErrorMsg(`未找到当前分类的子分类`);
    }
    let categoryChildren = [];
    categoryModelArr.forEach((categoryModel) => {
      categoryChildren.push(categoryModel.get());
    });
    return ServerResponse.createBySuccessData(categoryChildren);
  }
}

module.exports = CategoryService;
