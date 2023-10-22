import Express from 'express'
import { registerController, loginController, testController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = Express.Router();

//Register
router.post('/register',registerController);

//login
router.post('/login',loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController);

//protected route
router.get('/user-auth', requireSignIn, (req, res) => {
    res.status(200).send({ok: true})
})

//admin protected route
router.get('/admin-auth', requireSignIn,isAdmin, (req, res) => {
    res.status(200).send({ok: true})
})



export default router;