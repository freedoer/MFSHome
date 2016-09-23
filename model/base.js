import Sequelize from 'sequelize'


const sequelize = new Sequelize('MFSHome', 'root', '888888', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});
const BASE = {
  Sequelize,
  sequelize
};
export default BASE;
