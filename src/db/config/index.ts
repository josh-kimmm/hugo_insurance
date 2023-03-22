import { Sequelize, Model } from "sequelize";
const { DB_NAME, DB_PASSWORD } = require("config");

const sequelize = new Sequelize(DB_NAME, "postgres", DB_PASSWORD, {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
  logging: false
});

export {
  sequelize
};