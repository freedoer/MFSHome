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
const stylus = require('koa-stylus');
const serve = require('koa-static');
const session = require('koa-session-minimal');
const MysqlStore = require('./adapter/mysql-store');

const index = require('./routes/index');
const users = require('./routes/users');


// middlewares
app.use(convert(bodyParser({
  querystring: qs
})));
app.use(convert(json()));
app.use(convert(logger()));
app.use(convert(stylus('./public')));
app.use(convert(serve(__dirname + '/public')));

//state demo
app.use(async(ctx, next)=> {
  ctx.state.xxx = "this is in the state, only used in one request";
  return await next();
});

//change method
app.use(async(ctx, next)=> {
  if (ctx.query._method) {
    ctx.method = ctx.query._method.toUpperCase();
    delete ctx.query._method;
  }

  return await next();
});

app.keys = ['mfs'];
app.use(session({
    store: new MysqlStore(sessionConfig),
    rolling: true,
    cookie: {
      maxAge: sessionConfig.maxAge
    }
  },
));

app.use(convert(views(__dirname + '/views', {
  extension: 'pug'
})));


// logger
app.use(async(ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

router.use('/', index.routes(), index.allowedMethods());
router.use('/user', users.routes(), users.allowedMethods());

app.use(router.routes(), router.allowedMethods());
// response

app.on('error', function (err, ctx) {
  console.log(err);
  logger.error('server error', err, ctx);
});


export default app;