const ConstUser = require('../common/User');
const ServerResponse = require('../common/ServerResponse');
const UserService = require('../service/UserService');
const ResponseCode = require('../common/ResponseCode');

const userLoginCheck = () => {
  const middleware = async (ctx, next) => {
    const user = ctx.session[ConstUser.CURRENT_USER];
    if (!user) {
      return ctx.throw(403, JSON.stringify(ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, `用户未登录，请登录`)));
    }
    ctx.state.sessionUser = user;
    await next();
  };
  return middleware;
};

const userAdminCheck = () => {
  const middleware = async (ctx, next) => {
    const user = ctx.session[ConstUser.CURRENT_USER];
    if (!user) {
      return ctx.throw(403, JSON.stringify(ServerResponse.createByErrorCodeMsg(ResponseCode.NEED_LOGIN, `用户未登录，请登录`)));
    }
    //  校验一下是否是管理员
    const userService = new UserService();
    const serverResponse = await userService.checkAdminRole(user);
    if (!serverResponse.isSuccess()) {
      return ctx.throw(403, JSON.stringify(ServerResponse.createByErrorCodeMsg(`无权限操作，需要管理员权限`)));
    }
    ctx.state.sessionUser = user;
    await next();
  };
  return middleware;
};

module.exports = { userLoginCheck, userAdminCheck };
