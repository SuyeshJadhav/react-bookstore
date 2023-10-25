import express from 'express';
import { isAdmin, requireSignIn } from './../middleware/authMiddleware.js'
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from '../controller/categoryController.js';

const router = express.Router();

//router 
router.post('/create-category', requireSignIn, isAdmin, createCategoryController)

router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)

router.get('/categories', categoryController)

router.get('/single-category/:slug', singleCategoryController)

router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController)

export default router;