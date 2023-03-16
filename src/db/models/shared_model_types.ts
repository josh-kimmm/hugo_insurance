import { Model, ModelDefined, Optional } from 'sequelize';
import type { Models } from '.';

interface CustomAttributes { 
  associate?(models: Models): void;
};

type CustomizedModel<ModelAttributes extends {}, ModelCreationAttributes extends {}, Associations> 
  = Model<ModelAttributes, ModelCreationAttributes> & CustomAttributes & Associations;

export {
  CustomAttributes,
  CustomizedModel,
  Model,
  ModelDefined,
  Optional 
}