const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Category = require("./Category");
const Institute = require("./Institute");

const User = sequelize.define("User", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  middleName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'User',
  },
  rollNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  instituteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Institutes',
      key: 'id'
    }
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Categories',
      key: 'id'
    }
  },
},
{
  timestamps: true,
}
);

User.belongsTo(Category, { foreignKey: 'categoryId' });
User.belongsTo(Institute, { foreignKey: 'instituteId' });

module.exports = User;