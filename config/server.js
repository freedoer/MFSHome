export default {
  host: process.env.OPENSHIFT_NODEJS_PORT || '127.0.0.1',
  port: process.env.OPENSHIFT_NODEJS_IP || '8080'
}