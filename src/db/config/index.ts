import { Sequelize, Model } from "sequelize";

const sequelize = new Sequelize("hugo_insurance", "postgres", "asdQWE1!", {
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