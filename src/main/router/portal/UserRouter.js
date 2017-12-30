const Router = require('koa-router');
const jwt = require('koa-jwt');
const { qaKey } = require('../../common/KeyToken');
const UserController = require('../../controller/portal/UserController');

const router = new Router({
  prefix: '/user/'
});

const userController = new UserController();

router.post('login', async (ctx, next) => {
  await userController.login(ctx);
  await next();
});

router.get('logout', async (ctx, next) => {
  await userController.logout(ctx);
  await next();
});

router.post('register', async (ctx, next) => {
  await userController.register(ctx);
  await next();
});

router.post('check_valid', async (ctx, next) => {
  await userController.checkValid(ctx);
  await next();
});

router.get('get_user_info', async (ctx, next) => {
  await userController.getUserInfo(ctx);
  await next();
});

router.get('forget_get_question', async (ctx, next) => {
  await userController.forgetGetQuestion(ctx);
  await next();
});

router.post('forget_check_answer', async (ctx, next) => {
  await userController.forgetCheckAnswer(ctx);
  await next();
});

router.post('forget_reset_password', jwt({secret: qaKey}), async (ctx, next) => {
  await userController.forgetResetPassword(ctx);
  await next();
});

router.post('reset_password', async (ctx, next) => {
  await userController.resetPassword(ctx);
  await next();
});

router.post('update_information', async (ctx, next) => {
  await userController.updateInformation(ctx);
  await next();
});

router.get('get_information', async (ctx, next) => {
  await userController.getInformation(ctx);
  await next();
});

module.exports = router;
