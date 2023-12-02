import express, { Router } from 'express';
import authController from '../controllers/auth.controller';
import { validate } from '../middlewares/validate.middleware';
import { registerSchema } from '../validation/register';


const router: Router = express.Router();


// /**
//  * @method POST
//  * @access public
//  * @endpoint /api/auth/login
//  */
// router.post('/login', AuthController.login);

/**
 * @method POST
 * @access public
 * @endpoint /api/auth/register
 */
router.post('/register',validate(registerSchema), authController.register);


export default router;
