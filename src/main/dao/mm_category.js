const sequelize = require('../model/db');
const path = require('path');

const Category = sequelize.import(path.resolve(__dirname, '../model/mmall_category.js'));

const selectCategoryPrimaryKey = (categoryId) => {
  return Category.findOne({
    where: {
      'id': categoryId
    }
  });
};

const insert = (category) => {
  return Category.create({
    'parent_id': category.parentId,
    'name': category.name,
    'status': category.status,
    'create_time': category.createTime,
    'update_time': category.updateTime
  });
};

const updateCategorySelective = (category) => {
  return Category.update({
    'name': category.name,
    'update_time': category.updateTime
  }, {
    where: {
      'id': category.id
    }
  });
};

const selectCategoryChildrenByParenId = (categoryId) => {
  return Category.findAll({
    attributes: ['id', 'parent_id', 'name', 'status'],
    where: {
      'parent_id': categoryId
    }
  });
};

//  递归算法，算出子节点
const selectByPrimaryId = (categoryId) => {
  return Category.findOne({
    attributes: ['id', 'parent_id', 'name', 'status'],
    where: {
      'id': categoryId
    }
  });
};

/**
 * 查询商品分类List
 * @param {*} categoryId
 * @param {*} categoryName
 * @param {*} pageNum
 * @param {*} pageSize
 */
const findAllCategory = (categoryId, categoryName, pageNum, pageSize) => {
  if (categoryId && !categoryName) {
    return Category.findAndCountAll({
      where: {
        'id': categoryId,
        limit: pageSize,
        offset: (((pageNum - 1) | 0) * pageSize) | 0
      }
    });
  }

  if (!categoryId && categoryName) {
    return Category.findAndCountAll({
      where: {
        'name': {
          '$like': `%${categoryName}%`,
          limit: pageSize,
          offset: (((pageNum - 1) | 0) * pageSize) | 0
        }
      }
    });
  }

  if (categoryId && categoryName) {
    return Category.findAndCountAll({
      where: {
        'id': categoryId,
        'name': {
          '$like': `%${categoryName}%`
        },
        limit: pageSize,
        offset: (((pageNum - 1) | 0) * pageSize) | 0
      }
    });
  }
};
module.exports = { insert, updateCategorySelective, selectCategoryChildrenByParenId, selectByPrimaryId, selectCategoryPrimaryKey, findAllCategory };
