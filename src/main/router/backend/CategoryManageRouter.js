const Router = require('koa-router');
const CategoryController = require('../../controller/backend/CategoryManageController');
const { userAdminCheck } = require('../../middleware/userCheck');

const categoryController = new CategoryController();

const router = new Router({
  prefix: '/manage/category'
});

router.post('/add_category', userAdminCheck(), async (ctx, next) => {
  await categoryController.addCategory(ctx);
  await next();
});

router.get('/set_category_name', userAdminCheck(), async (ctx, next) => {
  await categoryController.setCategoryName(ctx);
  await next();
});

router.get('/get_category', userAdminCheck(), async (ctx, next) => {
  await categoryController.getChildrenParallelCategory(ctx);
  await next();
});

router.get('/get_deep_category', userAdminCheck(), async (ctx, next) => {
  await categoryController.getCategoryChildrenAndDeepChildrenCategory(ctx);
  await next();
});

module.exports = router;
