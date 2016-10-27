export default {
  user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || "root",
  password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || "888888",
  database: process.env.OPENSHIFT_APP_NAME || "MFSHome",
  host: process.env.OPENSHIFT_MYSQL_DB_HOST || 'localhost',
  port: process.env.OPENSHIFT_MYSQL_DB_PORT || "3306",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
}