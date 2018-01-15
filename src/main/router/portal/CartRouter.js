const Router = require('Router');
const CartController = require('../../controller/portal/CartController');
const { userLoginCheck } = require('../../middleware/userCheck');

const router = new Router({
  prefix: '/cart'
});

router.get('add', userLoginCheck(), async (ctx, next) => {
  const cartController = new CartController();
  cartController.add(ctx);
});

module.exports = router;
