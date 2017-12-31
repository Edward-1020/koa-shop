const R = require('ramda');
const moment = require('moment');
const ServerResponse = require('../common/ServerResponse');
const { insert, updateCategorySelective, selectCategoryChildrenByParenId, selectByPrimaryId } = require('../dao/mm_category');

class CategoryService {
  /**
   * 添加商品分类
   * @param {*} categoryName
   * @param {*} parentId
   */
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

  /**
   * 更新商品分类
   * @param {*} categoryId
   * @param {*} categoryName
   */
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

  /**
   * 查找当前分类的平级子分类
   * @param {*} categoryId
   */
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

  /**
   * 递归查询本节点的id及孩子父节点的id
   * @param {*} categoryId
   */
  async selectCategoryAndChildrenById (categoryId) {
    let categoryArr = [];
    const categoryService = new CategoryService();
    await categoryService.findChildCategory(categoryArr, categoryId);
    if (!categoryArr.length) {
      return ServerResponse.createByErrorMsg(`未找到当前分类及子分类`);
    }
    let categoryIdArr = [];
    categoryArr.forEach((category) => {
      categoryIdArr.push(category.id);
    });
    return ServerResponse.createBySuccessData(categoryIdArr);
  }

  // 算出子节点
  async findChildCategory (categoryArr, categoryId) {
    const categoryModel = await selectByPrimaryId(categoryId);
    if (categoryModel) {
      const category = categoryModel.get();
      categoryArr.push(category);
    }
    // 递归查找子节点
    const categoryModelChildrenArr = await selectCategoryChildrenByParenId(categoryId);
    if (!categoryModelChildrenArr.length) {
      return categoryArr;
    }
    categoryModelChildrenArr.forEach(async (category) => {
      categoryArr.push(category.get());
      const categoryService = new CategoryService();
      await categoryService.findChildCategory(categoryArr, category.get('id'));
    });
    return categoryArr;
  }
}

module.exports = CategoryService;
