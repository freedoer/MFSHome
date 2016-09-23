import dbConfig from './config/db'
import sessionConfig from './config/session'

const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const views = require('koa-views');
const convert = require('koa-convert');
const json = require('koa-json');
const onerror = require('koa-onerror');
const qs = require('qs');
const bodyParser = require('koa-better-body');
const logger = require('koa-logger');
const stc = require('koa-static');
const session = require('koa-session-minimal')
const MysqlStore = require('koa-mysql-session')

const index = require('./routes/index');
const users = require('./routes/users');


// middlewares
app.use(convert(bodyParser({
  querystring: qs
})));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(stc(__dirname + '/public')));

app.use(convert(views(__dirname + '/views', {
  extension: 'jade'
})));

// TODO: session has some problem ,fix it later
// app.use(session({
//   store: new MysqlStore({
//     user: dbConfig.username,
//     password: dbConfig.password,
//     database: dbConfig.database,
//     host: dbConfig.host
//   }),
//   rolling: true,
//   cookie: {
//     maxage: sessionConfig.maxage
//   }
// }));

// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/username', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function (err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});


export default app;