import { Sequelize, DataTypes } from 'sequelize';
import { sequelize } from '../config';

const Vehicle = sequelize.define('Vehicles', {
  vin: {
    type: DataTypes.STRING
  },
  year: {
    type: DataTypes.STRING,
  },
  make: {
    type: DataTypes.STRING
  },
  model: {
    type: DataTypes.DATE
  }
}, 
{});

export default Vehicle;