const UserService = require('../../service/UserService');
const ServerResponse = require('../../common/ServerResponse');
const ConstUser = require('../../common/User');
const ResponseCode = require('../../common/ResponseCode');

class UserController {
  /**
   * 用户登录
   */
  async login (ctx) {
    //  使用service调用dao
    const userService = new UserService();
    const {username, password} = ctx.request.body;
    const serverResponse = await userService.login(username, password);
    if (serverResponse.isSuccess()) {
      //  Const.CURRENT_USER作为session的key
      ctx.session[ConstUser.CURRENT_USER] = serverResponse.getData();
    }
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 用户登出
   */
  async logout (ctx) {
    ctx.session[ConstUser.CURRENT_USER] = null;
    ctx.body = JSON.stringify(ServerResponse.createBySuccess());
  }

  /**
   *用户注册
   */
  async register (ctx) {
    const user = ctx.request.body;
    const userService = new UserService();
    let serverResponse = await userService.register(user);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 实时校验接口
   */
  async checkValid (ctx) {
    const {str, type} = ctx.request.body;
    const userService = new UserService();
    const serverResponse = await userService.checkValid(str, type);
    ctx.body = JSON.stringify(serverResponse);
  };

  /**
   * 获取用户信息
   */
  async getUserInfo (ctx) {
    const user = ctx.state.sessionUser;
    if (user) {
      ctx.body = JSON.stringify(ServerResponse.createBySuccessData(user));
    }
    // if (!user) {
    //   ctx.body = JSON.stringify(ServerResponse.createByErrorMsg(`用户未登录，无法获取当前用户信息`));
    // }
  }

  /**
   * 获取密码提示问题
   */
  async forgetGetQuestion (ctx) {
    const {username} = ctx.query;
    const userService = new UserService();
    const serverResponse = await userService.selectQuestion(username);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 校验问题答案是否正确
   */
  async forgetCheckAnswer (ctx) {
    const {username, question, answear} = ctx.request.body;
    const userService = new UserService();
    const serverResponse = await userService.checkAnswer(username, question, answear);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 重设密码
   */
  async forgetResetPassword (ctx) {
    const { username, passwordNew } = ctx.request.body;
    const userService = new UserService();
    const serverResponse = await userService.forgetResetPassword(username, passwordNew);
    ctx.body = JSON.stringify(serverResponse);
  }

  /**
   * 登录状态重置密码
   */
  async resetPassword (ctx) {
    const user = ctx.state.sessionUser;
    if (user) {
      const userService = new UserService();
      const {passwordOld, passwordNew} = ctx.request.body;
      const serverResponse = await userService.resetPassword(passwordOld, passwordNew, user);
      ctx.body = JSON.stringify(serverResponse);
    }
  }

  /**
   * 更新用户信息
   */
  async updateInformation (ctx) {
    const user = ctx.state.sessionUser;
    if (user) {
      const userService = new UserService();
      const info = ctx.request.body;
      const serverResponse = await userService.updateInformation(user, info);
      const userInfoNew = serverResponse.getData();
      if (serverResponse.isSuccess()) {
        user.email = userInfoNew.email;
        user.phone = userInfoNew.phone;
        user.question = userInfoNew.question;
        user.answer = userInfoNew.answer;
      }
      ctx.body = JSON.stringify(serverResponse);
    }
  }

  /**
   * 获取用户详细信息
   */
  async getInformation (ctx) {
    const user = ctx.session[ConstUser.CURRENT_USER];
    if (!user) {
      ctx.body = JSON.stringify(ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, `需要强制登录`));
    }
    if (user) {
      const userService = new UserService();
      const serverResponse = await userService.getInformation(user);
      ctx.body = JSON.stringify(serverResponse);
    }
  }
}

module.exports = UserController;
