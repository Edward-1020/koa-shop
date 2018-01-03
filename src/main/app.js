const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const session = require('koa-session');
const userRouter = require('./router/portal/UserRouter');
const categoryRouter = require('./router/backend/CategoryManageRouter');
const sessionConfig = require('./common/SessionConfig');

const app = new Koa();
app.keys = ['mmall session key 1+93&8*%'];
app.use(session(sessionConfig, app));
app.use(bodyparser());
app.use(userRouter.routes());
app.use(categoryRouter.routes());

app.on('error', (err, ctx) => {
  if (process.env.NODE_ENV !== 'dev') {
    console.log('err', err.message);
  }
});

app.listen(3000, () => {
  console.log('app is starting at port 3000');
});
