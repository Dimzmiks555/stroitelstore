import Router from 'express'

import ProductsController from '../controllers/ProductsController.js'
import GroupsController from '../controllers/GroupsController.js'
import AttributesController from '../controllers/AttributesController.js'
import GoodsAttributesController from '../controllers/GoodsAttributesController.js'



const router = new Router();

router.get('/products/', ProductsController.getAll);
router.get('/products/:id', ProductsController.getOne);

router.get('/groups/', GroupsController.getAll);

router.get('/attributes/', AttributesController.getAll);

router.get('/goods_attributes/', GoodsAttributesController.getAll);

export default router;