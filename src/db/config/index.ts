import fs from "fs";
import path from "path";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("hugo_insurance", "joshkim", "", {
  host: "127.0.0.1",
  port: 5432,
  dialect: "postgres",
  define: {
    timestamps: true,
    underscored: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    
  }
});


const init = async () => {
  const basename = path.basename(__filename);
  fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
    );
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
  
  try {
    await sequelize.sync();
    console.log("successfully synced sequelize models");
  } catch (err) {
    console.error(`Unable to sync sequelize models: ${err}`);
  }
};

init();

export {
  sequelize
};