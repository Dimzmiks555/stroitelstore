import Router from 'express'
import OneCController from '../controllers/OneCController.js'

const router = new Router();

router.post('/1c_exchange', OneCController.create);

router.post('/1c_exchange/prices_and_counts', OneCController.createPricesAndCounts);



export default router;