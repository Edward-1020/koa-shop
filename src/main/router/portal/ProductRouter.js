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
