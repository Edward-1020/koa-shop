/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
  return sequelize.define('mmall_shipping', {
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
    receiver_name: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_mobile: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_province: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_city: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_district: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    receiver_address: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    receiver_zip: {
      type: DataTypes.STRING(6),
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
    tableName: 'mmall_shipping'
  });
};
