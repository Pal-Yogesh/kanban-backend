import express from 'express';
import { signup, signin, getProfile, signupValidation, signinValidation } from '../controllers/authController';
import { auth } from '../middleware/auth';

const router = express.Router();

// Public routes
router.post('/signup', signupValidation, signup);
router.post('/signin', signinValidation, signin);

// Protected routes
router.get('/profile', auth, getProfile);

export default router;
