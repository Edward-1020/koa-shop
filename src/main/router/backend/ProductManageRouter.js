const Router = require('koa-router');
const { userAdminCheck } = require('../../middleware/userCheck');

const ProductManageController = require('../../controller/backend/ProductManageController');
const productManageController = new ProductManageController();

const router = new Router({
  prefix: '/manage/product'
});

router.post('/save', userAdminCheck(), async (ctx, next) => {
  await productManageController.productSave();
  await next();
});

router.get('/set_sale_status', userAdminCheck(), async (ctx, next) => {
  await productManageController.setSaleStatus();
  await next();
});

router.get('/detail', userAdminCheck(), async (ctx, next) => {
  await productManageController.getDetail();
  await next();
});

router.get('/list', userAdminCheck(), async (ctx, next) => {
  await productManageController.getList();
  await next();
});

router.get('/search', userAdminCheck(), async (ctx, next) => {
  await productManageController.productSearch();
  await next();
});

router.get('/upload', userAdminCheck(), async (ctx, next) => {
  await productManageController.upload(ctx, next);
  next();
});

module.exports = router;
