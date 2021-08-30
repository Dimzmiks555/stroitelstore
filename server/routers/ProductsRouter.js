import Router from 'express'

import ProductsController from '../controllers/ProductsController.js'
import GroupsController from '../controllers/GroupsController.js'
import AttributesController from '../controllers/AttributesController.js'
import GoodsAttributesController from '../controllers/GoodsAttributesController.js'



const router = new Router();

router.get('/products/', ProductsController.getAll);
router.get('/products_prices/', ProductsController.getPrices);
router.get('/products/:id', ProductsController.getOne);

router.get('/groups/', GroupsController.getAll);

router.get('/attributes/', AttributesController.getAll);
router.post('/attributes/', AttributesController.create);

router.get('/goods_attributes/', GoodsAttributesController.getAll);
router.post('/goods_attributes/', GoodsAttributesController.create);

export default router;