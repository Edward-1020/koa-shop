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
    const user = ctx.session[ConstUser.CURRENT_USER];
    if (!user) {
      return ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, `用户未登录，请登录`);
    }
    //  校验一下是否是管理员
    const userService = new UserService();
    const serverResponse = await userService.checkAdminRole(user);
    if (serverResponse.isSuccess()) {
      // 是管理员
      // 增加我们处理分类的逻辑
      const {categoryName, parentId} = ctx.request.body;
      const categoryService = new CategoryService();
      const categoryServerResponse = await categoryService.addCategory(categoryName, parentId);
      ctx.body = JSON.stringify(categoryServerResponse);
    } else {
      ctx.body = JSON.stringify(ServerResponse.createByErrorCodeMsg(`无权限操作，需要管理员权限`));
    }
  }
}

module.exports = CategoryManageController;
