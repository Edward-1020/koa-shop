const ConstUser = require('../../common/User');
const ServerResponse = require('../../common/ServerResponse');
const ResponseCode = require('../../common/ResponseCode');
const UserService = require('../../service/UserService');
const ProductManageService = require('../../service/ProductManageService');

class ProductManageController {
  /**
   * 保存和更新商品
   * @param {*} ctx
   */
  async productSave (ctx) {
    const user = ctx.session[ConstUser.CURRENT_USER];
    if (!user) {
      ctx.body = JSON.stringify(ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, `用户未登录，请登录`));
      return;
    }
    //  校验一下是否是管理员
    const userService = new UserService();
    const serverResponse = await userService.checkAdminRole(user);
    if (serverResponse.isSuccess()) {
      // 是管理员
      let { product } = ctx.request.body;
      const productManageService = new ProductManageService();
      const serverResponse = await productManageService.saveOrUpdateProduct(product);
      ctx.body = JSON.stringify(serverResponse);
    } else {
      ctx.body = JSON.stringify(ServerResponse.createByErrorCodeMsg(`无权限操作，需要管理员权限`));
    }
  }
}

module.exports = ProductManageController;
