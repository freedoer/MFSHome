import User from '../model/user'

var router = require('koa-router')();

router.get('/', function (ctx, next) {
  ctx.body = 'this a users response!';
});

router.get('/add', async(ctx, next)=> {
  let res = await User.create({username: 'test', password: 'xxxxxx'});
  await ctx.render('index', {res});
});

router.get('/get', async(ctx, next)=> {
  let users = await User.findAll();
  await ctx.json(users);
  await ctx.render('index', {res: users});
});

router.get('/modify', async(ctx, next)=> {
  let res = await User.update({username: 'modified'}, {where: {id: 1}});
  await ctx.render('index', {res});
});

router.get('/del', async(ctx, next)=> {
  let res = await User.destroy({where: {id: 1}});
  await ctx.render('index', {res});
});

export default router;
