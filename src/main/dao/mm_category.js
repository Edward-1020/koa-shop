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

const updateCategorySelective = async (category) => {
  return Category.update({
    'name': category.name,
    'update_time': category.updateTime
  }, {
    where: {
      'id': category.id
    }
  });
};

const selectCategoryChildrenByParenId = async (categoryId) => {
  return Category.findAll({
    attributes: ['id', 'parent_id', 'name', 'status'],
    where: {
      'parent_id': categoryId
    }
  });
};

module.exports = { insert, updateCategorySelective, selectCategoryChildrenByParenId };
