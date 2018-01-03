const ConstUser = require('../../common/User');
const ServerResponse = require('../../common/ServerResponse');
const ResponseCode = require('../../common/ResponseCode');
const UserService = require('../../service/UserService');
const CategoryService = require('../../service/CategoryService');

class CategoryManageController {
  /**
   * 添加分类
   * @param {*} ctx
   */
  async addCategory (ctx) {
    // 是管理员
    // 增加我们处理分类的逻辑
    const {categoryName, parentId} = ctx.request.body;
    const categoryService = new CategoryService();
    const categoryServerResponse = await categoryService.addCategory(categoryName, parentId);
    ctx.body = JSON.stringify(categoryServerResponse);
  }

  async setCategoryName (ctx) {
    // 更新categoryName
    const { categoryId, categoryName } = ctx.query;
    const categoryService = new CategoryService();
    const categoryServerResponse = await categoryService.updateCategoryName(categoryId, categoryName);
    ctx.body = JSON.stringify(categoryServerResponse);
  }

  /**
   * 获取分类下的平级子节点
   * categoryId默认为0，是根节点
   * @param {*} ctx
   */
  async getChildrenParallelCategory (ctx) {
    const { categoryId } = ctx.query;
    // 查询子节点的category信息，并且不递归，保持平级
    const categoryService = new CategoryService();
    const categoryServerResponse = await categoryService.getChildrenParallelCategory(categoryId);
    ctx.body = JSON.stringify(categoryServerResponse);
  }

  async getCategoryChildrenAndDeepChildrenCategory (ctx) {
    // 查询当前节点id和递归子节点的id
    const { categoryId } = ctx.query;
    const categoryService = new CategoryService();
    const categoryServerResponse = await categoryService.selectCategoryAndChildrenById(categoryId);
    ctx.body = JSON.stringify(ServerResponse.createBySuccessData(categoryServerResponse));
  }
}

module.exports = CategoryManageController;
