/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mmall_order', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order_no: {
      type: DataTypes.BIGINT,
      allowNull: true,
      unique: true
    },
    user_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    shipping_id: {
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    payment: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    payment_type: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    postage: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    payment_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    send_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    close_time: {
      type: DataTypes.DATE,
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
    tableName: 'mmall_order'
  });
};
