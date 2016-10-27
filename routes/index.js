import isEmpty from '../utils'


let router = require('koa-router')();

router.get('/', async(ctx, next) => {
  ctx.state = {
    title: 'koa2 title'
  };
  await ctx.render('index', {});
});

// return a json
router.get('json', async(ctx, next)=> {
  ctx.body = {str: 'json is ok'};
  console.log(ctx);
});

router.get('param/:key', async(ctx, next)=> {
  console.log(ctx.params);

  await ctx.render('index', {res: ctx.params});
});

// using /xx?_method=post/put/delete to fake request
router.get('method', async(ctx, next)=> {
  await ctx.render('index', {res: 'think as get method'});
});

router.post('method', async(ctx, next)=> {
  await ctx.render('index', {res: 'think as post method'});
});

// /query?query1=xxx&query2=yyy
router.get('query', async(ctx, next)=> {
  console.log(ctx.query);

  await ctx.render('index', {res: ctx.query});
});

// session demo
router.get('session/set', async(ctx, next)=> {
  ctx.session.str = 'this is in the session';
  await ctx.render('index', {res: 'success'})
});

router.get('session/get', async(ctx, next)=> {
  await ctx.render('index', {res: "In the session: " + ctx.session.str})
});

// state demo
router.get('session/get', async(ctx, next)=> {
  console.log(ctx.state.xxx);
  await ctx.render('index', {res: ctx.state.xxx});
});

// upload file and nested
router.get('upload', async(ctx, next)=> {
  await ctx.render('upload-file');
});

router.post('upload', async(ctx, next)=> {
  console.log(ctx.request.body);
  console.log(ctx.request.files);
  console.log(ctx.request.fields);

  await ctx.render('index', {
    res: {
      fields: ctx.request.fields
    }
  })
});


export default router;
