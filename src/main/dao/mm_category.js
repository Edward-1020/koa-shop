const sequelize = require('../model/db');
const path = require('path');

const Category = sequelize.import(path.resolve(__dirname, '../model/mmall_category.js'));

const insert = async (category) => {
  return Category.create({
    'parent_id': category.parentId,
    'name': category.name,
    'status': category.status,
    'create_time': category.createTime,
    'update_time': category.updateTime
  });
};

module.exports = { insert };
