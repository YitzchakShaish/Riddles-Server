import {  findPlayerIdByUsername, createPlayer, updateTotalGamesTDB, updateBestAvgTimeTDB, getAllPlayersFDB, getPlayerByIdFDB, getTop5PlayersFDB, getBestAvgTimeFDB } from "../DAL/playersDAL.js";


export const getAllPlayers = async (req, res) => {

    const result = await getAllPlayersFDB();

    if (!result.success) {
        return res.status(401).json({ message: 'no players' });
    }

    res.json({ message: 'All players', user: result.data });
}

export const getPlayerById = async (req, res) => {
    const id = req.params.id;
     // Validate ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    const result = await getPlayerByIdFDB(id);

    if (!result.success) {
        return res.status(401).json({ message: 'player not found' });
    }

    res.json({ message: 'player:', player: result.data });
}

export const updateBestAvgTime = async (req, res) => {
    const id = req.params.id;
    const contemporaryTime = req.body.best_avg_time;

    // Validate ID
    if (!id ) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    // Validate best_avg_time
    if (typeof contemporaryTime !== 'number' || contemporaryTime <= 0) {
        return res.status(400).json({ message: 'Invalid or missing best_avg_time.' });
    }

    // Get current best time
    const minTime = await getBestAvgTimeFDB(id);

    if (!minTime.success) {
        return res.status(404).json({ message: 'Player not found.' , success: false });
    }

    if (minTime.bestTime === null || contemporaryTime < minTime.bestTime) {
        const result = await updateBestAvgTimeTDB(id, contemporaryTime);

        if (!result.success) {
            return res.status(500).json({ message: 'Failed to update time.' , success: false });
        }

        return res.json({ message: 'New record!', bestTime: contemporaryTime , success: true });
    }

    return res.json({ message: 'No update. Your time was slower.', bestTime: minTime.bestTime , success: true });
};


export const getTop5Players = async (req, res) => {
    const result = await getTop5PlayersFDB()
   if (!result.success) {
        return res.status(404).json({ message: 'players top not found.' });
    }

    res.json({ message: '5 top players:', player: result.data });
}

export const incrementTotalGames = async (req, res) => {
    const id = req.params.id;

    // Validate ID
    if (!id || isNaN(Number(id))) {
        return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    // Try to update in DB
    const result = await updateTotalGamesTDB(id);

    if (result.error) {
        
        if (result.error.includes('not found')) {
            return res.status(404).json({ message: 'Player not found.' });
        }
        return res.status(500).json({ message: 'Server error.', error: result.error });
    }


    return res.status(200).json({
        success: true,
        message: 'Total games updated successfully.',
        total_games: result.total_games,
    });
};


export const getOrCreatePlayer = async (req, res) => {
    const { username } = req.body;
      // Validate username
    if (!username || typeof username !== 'string' || username.trim() === '') {
        return res.status(400).json({ message: 'Invalid or missing username.' });
    }

    let result = await findPlayerIdByUsername(username);

    if (!result.success) {
       result = await createPlayer(username);
       res.status(201).json({message: 'player cretede successfully', playerId: result.playerId})
    }

    res.json({ message: 'player exsited successfully',playerId: result.playerId });
}
