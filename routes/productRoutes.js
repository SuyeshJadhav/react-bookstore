import express from 'express';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';
import { createProductController, deleteProductController, getProductController, getSingleProductController,  productFiltersController,  productPhotoController, searchProductController, updateProductController } from '../controller/productController.js';
import ExpressFormidable from 'express-formidable';

const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, ExpressFormidable(), createProductController)

router.get('/get-product', getProductController)

router.put('/update-product/:pid', requireSignIn, isAdmin, ExpressFormidable(), updateProductController)

router.get('/get-product/:slug', getSingleProductController)

router.get('/product-photo/:pid', productPhotoController)

router.delete('/delete-product/:pid', deleteProductController)

router.post('/product-filters', productFiltersController)

// router.get('/product-count', productCountController)

// router.get('/product-list/:page', productListController)

router.get('/search/:keyword', searchProductController)


export default router;