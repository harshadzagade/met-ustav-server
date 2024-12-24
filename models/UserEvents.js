const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./User");
const Event = require("./Event");
const Category = require("./Category");

const UserEvents = sequelize.define("UserEvents", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User, // Reference to the User model
      key: "id",
    },
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Event, // Reference to the Event model
      key: "id",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category, // Reference to the Category model
      key: "id",
    },
  },
  fileUrl: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  reason: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "Submitted",
  },
});

// Define associations
UserEvents.belongsTo(User, {as:"Users", foreignKey: "userId"});
UserEvents.belongsTo(Event, {as:"Events", foreignKey: "eventId"});
UserEvents.belongsTo(Category, {as:"Categories", foreignKey: "categoryId"});

User.hasMany(UserEvents, {as: "UserEvents", foreignKey: "userId" });
Event.hasMany(UserEvents, {as: "UserEvents", foreignKey: "eventId" });
Category.hasMany(UserEvents, {as: "UserEvents", foreignKey: "categoryId" });

module.exports = UserEvents;
