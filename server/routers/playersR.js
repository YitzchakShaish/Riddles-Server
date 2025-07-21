import express from "express";
import { getOrCreatePlayer, getTop5Players, updateBestAvgTime , getAllPlayers, incrementTotalGames, getPlayerById} from "../controllers/playersCtrl.js";
const router = express.Router();
//POST login
router.post('/', getOrCreatePlayer)



//GET all players
router.get('/', getAllPlayers);

//GET 5
router.get('/top', getTop5Players);

router.get('/:id', getPlayerById);


router.put('/:id/record', updateBestAvgTime);

// PUT total_games add 1
router.put('/:id/games', incrementTotalGames);



export default router
