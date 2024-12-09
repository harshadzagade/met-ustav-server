const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Institute = sequelize.define("Institute",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Institute;