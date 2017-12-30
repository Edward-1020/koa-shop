/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mmall_order_item', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    order_no: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    product_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    product_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    product_image: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    current_unit_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    quantity: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    update_time: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'mmall_order_item'
  });
};
