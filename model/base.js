import Sequelize from 'sequelize'
import dbConfig from '../config/db'

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);

const BASE = {
  Sequelize,
  sequelize
};

export default BASE;
