import Router from 'express'
import ProductsController from '../controllers/ProductsController.js'

const router = new Router();

router.get('/products', ProductsController.getAll);




export default router;