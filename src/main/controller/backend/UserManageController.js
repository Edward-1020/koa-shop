const UserService = require('../../service/UserService');
const Role = require('../../common/Role');
const ConstUser = require('../../common/User');
const ServerResponse = require('../../common/ServerResponse');

class UserManageController {
  async login (ctx) {
    const {username, password} = ctx.request.body;
    const userService = new UserService();
    const serverResponse = await userService.login(username, password);
    if (serverResponse.isSuccess()) {
      let user = serverResponse.data;
      if (user.role === Role.ROLE_ADMAIN) {
        // 说明用户是管理员
        ctx.session[ConstUser.CURRENT_USER] = user;
        ctx.body = JSON.stringify(serverResponse);
      }
      if (user.role !== Role.ROLE_ADMAIN) {
        ctx.body = JSON.stringify(ServerResponse.createByErrorMsg(`不是管理员`));
      }
    }
    if (!serverResponse.isSuccess()) {
      ctx.body = JSON.stringify(serverResponse);
    }
  }
}

module.exports = UserManageController;
