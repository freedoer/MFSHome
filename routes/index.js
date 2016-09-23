var router = require('koa-router')();

router.get('/', async(ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {});
});

router.get('json', async(ctx, next)=> {
  ctx.body = {str: 'json is ok'};
  console.log(ctx);
});


export default router;
