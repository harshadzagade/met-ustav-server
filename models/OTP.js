const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Adjust the path to your Sequelize instance

const OTP = sequelize.define("OTP", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  otp: {
    type: DataTypes.STRING, // Store OTP as a string since it could have leading zeros
    allowNull: false,
  },
  expiresAt: {
    type: DataTypes.DATE,
    allowNull: false, // Set expiration date for OTP
  },
}, {
  tableName: "otp_records", // Table name in the database
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

module.exports = OTP;
