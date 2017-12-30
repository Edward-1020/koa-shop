const sequelize = require('../model/db');
const path = require('path');

const User = sequelize.import(path.resolve(__dirname, '../model/mmall_user.js'));
/**
 * 查询用户名是否存在
 * @param {*} username
 */
const checkUsername = async (username) => {
  return User.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'userNum']],
    where: {
      'username': username
    }
  });
};

/**
 * 查询email是否存在
 * @param {*} email
 */
const checkEmail = async (email) => {
  return User.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'userEmailNum']],
    where: {
      'email': email
    }
  });
};

/**
 * 查询提示问题
 */
const selectQuestion = async (username) => {
  return User.findOne({
    attributes: ['question'],
    where: {
      'username': username
    }
  });
};

/**
 * 查询用户名和密码是否正确
 * @param {*} username
 * @param {*} password
 */
const selectLogin = (username, password) => {
  // 查询时，使用select * 查询是一种非常不好的习惯。表会越来越大。要什么查什么
  return User.findOne({
    attributes: ['username', 'password', 'email', 'phone', 'question', 'answer', 'role'],
    where: {
      'username': username,
      'password': password
    }
  });
};

/**
 *  注册
 */
const insert = (user) => {
  return User.create({
    username: user.username,
    password: user.password,
    email: user.email,
    phone: user.phone,
    question: user.question,
    answer: user.answer,
    role: user.role,
    create_time: user.create_time,
    update_time: user.update_time
  });
};

/**
 * 检查回答问题
 * @param {*} username
 * @param {*} question
 * @param {*} answer
 */
const checkAnswer = (username, question, answer) => {
  return User.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'qaNum']],
    where: {
      'username': username,
      'question': question,
      'answer': answer
    }
  });
};

/**
 * 更新密码
 * @param {*} username
 * @param {*} passwordNew
 */
const updatePasswordByUsername = (username, passwordNew) => {
  return User.update({
    'password': passwordNew
  }, {
    where: {
      'username': username
    }
  });
};

/**
 * 检查用户id和密码是否对的上号
 * @param {*} userId
 * @param {*} password
 */
const checkPassword = (userId, password) => {
  return User.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'userNum']],
    where: {
      'id': userId,
      'password': password
    }
  });
};

//  查到结果，那么这个email已经被他人占用
const checkEmailByUsername = (username, email) => {
  return User.findOne({
    attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'userNum']],
    where: {
      'email': email,
      '$not': [
        {'username': username}
      ]
    }
  });
};

const updateUser = (user, userInfoNew) => {
  return User.update({
    'email': userInfoNew.email,
    'phone': userInfoNew.phone,
    'question': userInfoNew.question,
    'answer': userInfoNew.answer
  }, {
    where: {
      'username': user.username
    }
  });
};

const selectByUsername = (username) => {
  return User.findOne({
    where: {
      'username': username
    }
  });
};

module.exports = { checkUsername, selectLogin, checkEmail, insert, selectQuestion, checkAnswer, updatePasswordByUsername, checkPassword, checkEmailByUsername, updateUser, selectByUsername };
