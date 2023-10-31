import Express from 'express'
import { registerController, loginController, testController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = Express.Router();

//Register
router.post('/register', registerController);

//login
router.post('/login', loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//admin protected route
router.get('/admin-auth', requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})

//update profile
router.put('/profile', requireSignIn, updateProfileController)

//orders
router.get('/orders', requireSignIn, getOrdersController)

//all orders
router.get('/all-orders', requireSignIn, isAdmin, getAllOrdersController)

//update status
router.put('/order-status/:orderId', requireSignIn, isAdmin, orderStatusController)

export default router;