import Router from 'express'
import OneCController from './OneCController.js'

const router = new Router();

router.post('/1c_exchange', OneCController.create);

router.post('/1c_exchange/prices_and_counts', OneCController.createPricesAndCounts);

// router.get('/', OneCController.getOne);

// router.put('/');

// router.delete('/tenders:id');


export default router;