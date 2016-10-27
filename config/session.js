import dbConfig from './db'


export default {
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  host: dbConfig.host,
  maxAge: 30 * 60 * 1000
}