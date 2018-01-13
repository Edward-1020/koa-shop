const Router = require('router');
const ProductController = require('../../controller/portal/ProductController');

const { userLoginCheck } = require('../../middleware/userCheck');

const router = new Router({
  prefix: '/product'
});

router.get('/detail', userLoginCheck(), async (ctx, next) => {
  const productController = new ProductController();
  await productController.detail(ctx);
});

router.get('/list', userLoginCheck(), async (ctx, next) => {
  const productController = new ProductController();
  await productController.getProductList(ctx);
});

router.get('/category/list', userLoginCheck(), async (ctx, next) => {
  const productController = new ProductController();
  await productController.getCategoryList(ctx);
});
