/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mmall_pay_info', {
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
    pay_platform: {
      type: DataTypes.INTEGER(10),
      allowNull: true
    },
    platform_number: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    platform_status: {
      type: DataTypes.STRING(20),
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
    tableName: 'mmall_pay_info'
  });
};
