let router = require('koa-router')();

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

router.get('param/:key', async(ctx, next)=> {
  console.log(ctx.params);

  await ctx.render('index', {res: ctx.params});
});

// /query?query1=xxx&query2=yyy
router.get('query', async(ctx, next)=> {
  console.log(ctx.query);

  await ctx.render('index', {res: ctx.query});
});


// session demo

// router.get('session', async(ctx, next)=> {
//   console.log(ctx.session.test = 100);
//   await ctx.render('index', {res: ctx.session.test})
// });

// upload file and nested
router.get('upload', async(ctx, next)=> {
  await ctx.render('upload-file')
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
