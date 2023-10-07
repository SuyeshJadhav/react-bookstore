import Express from 'express'
import { registerController, loginController, testController } from '../controller/authController.js';
import { isAdmin, requireSignIn } from '../middleware/authMiddleware.js';

const router = Express.Router();

//Register
router.post('/register',registerController);

//login
router.post('/login',loginController);

//test
router.get('/test', requireSignIn, isAdmin, testController)

export default router;