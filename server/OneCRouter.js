import Router from 'express'
import OneCController from './OneCController.js'

const router = new Router();

router.post('/1c_exchange', OneCController.create);

router.get('/1c_exchange', OneCController.getAll);

// router.get('/', OneCController.getOne);

// router.put('/');

// router.delete('/tenders:id');


export default router;