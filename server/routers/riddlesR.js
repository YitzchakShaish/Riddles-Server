import express from 'express';
import * as riddlesCtrl from '../controllers/riddlesCtrl.js';

const router = express.Router();
router.get('/', riddlesCtrl.getAllRiddles);

router.get('/:id', riddlesCtrl.getRiddleById);


router.post('/addRiddle', riddlesCtrl.addRiddle)

router.put('/update/:id', riddlesCtrl.updateRiddleById);

router.delete('/delete/:id', riddlesCtrl.deleteRiddleById);


export default router;