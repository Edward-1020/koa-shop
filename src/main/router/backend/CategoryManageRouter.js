const Router = require('koa-router');
const CategoryController = require('../../controller/backend/CategoryManageController');

const categoryController = new CategoryController();

const router = new Router({
  prefix: '/manage/category'
});

router.post('add_category', async (ctx, next) => {
  await categoryController.addCategory(ctx);
  await next();
});

module.exports = router;
