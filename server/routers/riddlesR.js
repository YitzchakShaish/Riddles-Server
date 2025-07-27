import express from 'express';
import * as riddlesCtrl from '../controllers/riddlesCtrl.js';
import { authorizeRoles, verifyToken } from '../middlewares/authMiddlewares.js';

const router = express.Router();
router.get('/',  riddlesCtrl.getAllRiddles);
//Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsInJvbGUiOiJtYW5hZ2VyIiwiaWF0IjoxNzUzMjgwNDMxLCJleHAiOjE3NTMyODQwMzF9.icXPvVgBqCjn66r9rcnDgoVvMYFX_bC_Lk4XIQ0o6bY

router.get('/:id', verifyToken, riddlesCtrl.getRiddleById);


router.post('/addRiddle',verifyToken, riddlesCtrl.addRiddle)

router.post('/load-initial-riddles', riddlesCtrl.loadInitialRiddles);

router.put('/:id',verifyToken, authorizeRoles('admin'), riddlesCtrl.updateRiddleById);

router.delete('/:id',verifyToken, authorizeRoles('admin'), riddlesCtrl.deleteRiddleById);


export default router;