const Router = require('koa-router');
const UserManageController = require('../../controller/backend/UserManageController');

const userManageController = new UserManageController();

const router = new Router({
  prefix: '/manage/user/'
});

router.post('login', async (ctx, next) => {
  await userManageController.login();
});
