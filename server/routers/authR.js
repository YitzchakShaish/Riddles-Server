import express from 'express';
import {  validatePassword, validateUsername } from '../middlewares/validateCredentials.js';
import { login, signup, logout } from '../controllers/authCtrl.js';

const router = express.Router();

// Signup route
router.post('/signup',validateUsername, validatePassword, signup);

// Login route
router.post('/login',validateUsername, login);

// Logout route
router.post('/logout', logout);

export default router;
