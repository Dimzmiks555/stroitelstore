import Router from 'express'
import multer from 'multer'

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname ) //Appending .jpg
    }
  })


const upload = multer({ storage: storage });


//Controllers
import ProductsController from '../controllers/ProductsController.js'
import GroupsController from '../controllers/GroupsController.js'
import AttributesController from '../controllers/AttributesController.js'
import GoodsAttributesController from '../controllers/GoodsAttributesController.js'
import ImageController from '../controllers/ImageController.js'
import DescController from '../controllers/DescController.js'
import UserController from '../controllers/UserController.js'
import OrderController from '../controllers/OrderController.js'



import authMiddleware from '../middlewares/authMiddleware.js'
import HitsController from '../controllers/HitsController.js'
import PaymentController from '../controllers/PaymentController.js'
import DeliveryController from '../controllers/DeliveryController.js'
import MailController from '../controllers/MailController.js'



const router = new Router();

router.post('/upload/', upload.single("file") ,ImageController.create);

router.post('/upload/avrora', upload.single("file") , ProductsController.createAvrora);


router.get('/products/', ProductsController.getAll);
router.get('/products_prices/', ProductsController.getPrices);
router.get('/products/:id', ProductsController.getOne);


router.get('/recent/', ProductsController.getRecent);

router.get('/groups/', GroupsController.getAll);

router.get('/attributes/', AttributesController.getAll);
router.post('/attributes/', AttributesController.create);

router.get('/goods_attributes/', GoodsAttributesController.getAll);
router.post('/goods_attributes/', GoodsAttributesController.create);
router.post('/goods_attributes/bulk/', GoodsAttributesController.createBulk);

router.get('/descriptions/', DescController.getAll);
router.get('/descriptions/:id', DescController.getOne);
router.post('/descriptions/', DescController.create);


router.post('/orders/', OrderController.create);
router.get('/orders/:id', OrderController.getOne);
router.get('/orders/', OrderController.getAll);
router.post('/orders/:id', OrderController.update);

router.post('/hits/', HitsController.create);
router.get('/hits/:id', HitsController.getOne);
router.get('/hits/', HitsController.getAll);
router.delete('/hits/:id', HitsController.delete);

router.get('/users/', UserController.getAll);

router.post('/deliveries/', DeliveryController.create);
router.get('/deliveries/', DeliveryController.getAll);


router.post('/payment/', PaymentController.create);
router.post('/payment/notification/', PaymentController.update);

router.post('/mail/', MailController.create);


// AUTHORIZATION

router.post('/registration/', UserController.registration);

router.post('/login/', UserController.login);

router.post('/auth/', authMiddleware , UserController.check);

export default router;