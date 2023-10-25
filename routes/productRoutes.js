import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController, productPhotoController } from '../controller/productController.js';
import ExpressFormidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, ExpressFormidable(), createProductController)

router.get('/get-product', getProductController)

router.get('/get-product/:id', getSingleProductController)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/product/:pid', deleteProductController)

export default router;