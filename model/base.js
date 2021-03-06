import Sequelize from 'sequelize'
import dbConfig from '../config/db'

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, dbConfig);

export {
  Sequelize,
  sequelize
};
