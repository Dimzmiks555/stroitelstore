import Router from 'express'
import TendersController from './TendersController.js'

import multer from 'multer';
const storageConfig = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "uploads");
    },
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storageConfig })
const router = new Router();

router.post('/upload', upload.single('file'), TendersController.create);

router.get('/tenders', TendersController.getAll);

router.get('/tenders/:id', TendersController.getOne);

router.put('/tenders/:id');

// router.delete('/tenders:id');


export default router;