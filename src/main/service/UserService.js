const moment = require('moment');
const { checkUsername, selectLogin, checkEmail, insert, selectQuestion, checkAnswer, updatePasswordByUsername, checkPassword, checkEmailByUsername, updateUser, selectByUsername } = require('../dao/mm_user');
const ServerResponse = require('../common/ServerResponse');
const Role = require('../common/Role');
const crypto = require('crypto');
const Type = require('../common/Type');
const R = require('ramda');
const token = require('jsonwebtoken');
const { qaKey } = require('../common/KeyToken');
const { salt } = require('../common/property');

class UserService {
  async login (username, password) {
    // 如果username或密码为空
    if (!username) {
      return ServerResponse.createByErrorMsg(`用户名不得为空`);
    }
    if (!password) {
      return ServerResponse.createByErrorMsg(`密码不得为空`);
    }
    // 调用dao，检查用户名是否存在
    let userNumModel = await checkUsername(username);
    let userNum = userNumModel.get('userNum');
    if (userNum === 0) {
      return ServerResponse.createByErrorMsg(`用户名不存在`);
    }
    // todo 密码登录md5，db存密码不能明文。
    // md5加盐值，提高破解复杂度
    let md5Password = crypto.createHash('md5').update(password + salt).digest('hex');
    // 检查用户名和密码是否正确
    let userModel = await selectLogin(username, md5Password);
    if (!userModel) {
      // 因为上一步已经检测用户名是否存在了，这一步return了，一定是密码错了
      return ServerResponse.createByErrorMsg(`密码错误`);
    }
    let user = userModel.get();
    //  登录成功
    user['password'] = null;
    return ServerResponse.createBySuccessMsgAndData('登录成功', user);
  }

  async register (user) {
    // 虽然前端会调用接口检查用户名是否存在，但如果直接调接口仍可以请到到注册操作，所以我们仍需检查用户名是否存在。
    // 同时也要校验email是否存在

    // 调用dao，检查用户名是否存在
    // 调用dao，检查email是否存在
    let [userNumModel, userEmailNumModel] = await Promise.all([checkUsername(user.username), checkEmail(user.email)]);
    let userNum = userNumModel.get('userNum');
    let userEmailNum = userEmailNumModel.get('userEmailNum');
    if (userNum > 0) {
      return ServerResponse.createByErrorMsg(`用户名已存在`);
    }
    if (userEmailNum > 0) {
      return ServerResponse.createByErrorMsg(`邮箱已存在`);
    }
    user.role = Role.ROLE_CUSTOMER;
    // MD5加密
    const md5 = crypto.createHash('md5');
    user.password = md5.update(user.password + salt).digest('hex');
    user['create_time'] = moment().format();
    user['update_time'] = moment().format();
    let userInsertModel = await insert(user);
    let userInsert = userInsertModel.get();
    if (!userInsert) {
      return ServerResponse.createByErrorMsg(`注册失败`);
    }
    user.password = null;
    return ServerResponse.createBySuccessMsgAndData(`注册成功`, user);
  }

  /**
   * 实时校验接口
   */
  async checkValid (str, type) {
    // type不是空且不是‘ ’这种情况
    if (R.trim(type)) {
      // 开始校验
      if (Type.USERNAME === type) {
        // 调用dao，检查用户名是否存在
        let userNumModel = await checkUsername(str);
        let userNum = userNumModel.get('userNum');
        if (userNum > 0) {
          return ServerResponse.createByErrorMsg(`用户名已存在`);
        }
      }
      if (Type.EMAIL === type) {
        // 调用dao，检查用户名是否存在
        let userEmailNumModel = await checkEmail(str);
        let userEmailNum = userEmailNumModel.get('userEmailNum');
        if (userEmailNum > 0) {
          return ServerResponse.createByErrorMsg(`邮箱已存在`);
        }
      }
      return ServerResponse.createBySuccessMsg(`校验成功`);
    }
    return ServerResponse.createByErrorMsg(`参数错误`);
  };

  /**
   * 获取密码提示问题
   */
  async selectQuestion (username) {
    const userService = new UserService();
    const validServerResponse = await userService.checkValid(username, Type.USERNAME);
    if (validServerResponse.isSuccess()) {
      // 用户不存在
      return ServerResponse.createByErrorMsg(`用户不存在`);
    }
    const userQuestionModel = await selectQuestion(username);
    const userQuestion = userQuestionModel.get('question');
    if (R.trim(userQuestion)) {
      return ServerResponse.createBySuccessData(userQuestion);
    }
    return ServerResponse.createByErrorMsg(`找回密码的问题是空的`);
  }

  /**
   * 校验问题答案是否正确
   */
  async checkAnswer (username, question, answear) {
    const UserModel = await checkAnswer(username, question, answear);
    const qaNum = UserModel.get('qaNum');
    if (qaNum > 0) {
      // 说明问题及问题答案是这个用户的且正确
      const forgetToken = token.sign({username: username}, qaKey, {expiresIn: 60 * 12});
      return ServerResponse.createBySuccessMsg(forgetToken);
    }
    return ServerResponse.createByErrorMsg(`问题的答案错误`);
  }

  /**
   * 重置密码
   */
  async forgetResetPassword (username, passwordNew) {
    const md5 = crypto.createHash('md5');
    const UserModel = await updatePasswordByUsername(username, md5.update(passwordNew + salt).digest('hex'));
    const [rowCount] = UserModel;
    if (rowCount > 0) {
      return ServerResponse.createBySuccessMsg(`修改密码成功`);
    } else {
      return ServerResponse.createByErrorMsg(`修改密码失败`);
    }
  }

  /**
   * 登录状态重置密码
   */
  async resetPassword (passwordOld, passwordNew, user) {
    //  防止横向越权，要校验一下用户的旧密码，一定要是这个用户，因为我们会查询一个count(1)，如果不指定id，那么结果是true，count > 0
    const md5 = crypto.createHash('md5');
    const resultCount = await checkPassword(user.id, md5.update(passwordOld + salt).digest('hex'));

    if (!resultCount) {
      return ServerResponse.createByErrorMsg(`旧密码错误`);
    }

    const UserModel = await updatePasswordByUsername(user.username, passwordNew);
    const [rowCount] = UserModel;
    if (rowCount > 0) {
      return ServerResponse.createBySuccessMsg(`修改密码成功`);
    } else {
      return ServerResponse.createByErrorMsg(`修改密码失败`);
    }
  }

  /**
   * 更新用户信息
   */
  async updateInformation (user, userInfoNew) {
    //  username不能被更新
    //  email要校验，新email若已存在在其它用户，不可使用
    const userModel = await checkEmailByUsername(user.username, userInfoNew.email);
    const resultCount = userModel.get('userNum');
    if (resultCount > 0) {
      return ServerResponse.createByErrorMsg(`email已经存在`);
    }

    const [resultUpdateCount] = await updateUser(user, userInfoNew);
    if (resultUpdateCount > 0) {
      return ServerResponse.createBySuccessMsgAndData(`更新个人信息成功`, userInfoNew);
    }
    return ServerResponse.createByErrorMsg(`更新个人信息失败`);
  }

  /**
   * 获取用户详细信息
   */
  async getInformation (user) {
    const userModel = await selectByUsername(user.username);
    if (!userModel) {
      return ServerResponse.createByErrorMsg(`找不到当前用户`);
    }
    let userInfo = userModel.get();
    userInfo.password = '';
    return ServerResponse.createBySuccessData(userInfo);
  }

  /**
   * 校验是否为管理员
   */
  async checkAdminRole (user) {
    if (user && user.role === Role.ROLE_ADMAIN) {
      return ServerResponse.createBySuccess();
    }
    return ServerResponse.createByError();
  }
}

module.exports = UserService;
