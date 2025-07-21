import supabase from "../DB/playersDB.js";




export async function findPlayerIdByUsername(username) {
    const { data, error } = await supabase
        .from('players')
        .select('id')
        .eq('username', username)
        .single();

    if (error) {
         return { success: false, playerId: null };
    }

    return { success: true, playerId: data.id };
    
}




export async function createPlayer(username) {
    const { data, error } = await supabase
        .from('players')
        .insert([{ username: username }])
        .select('id')
        .single();

    if (error) {
       return { success: false, playerId: null };
    }

    return { success: true, playerId: data.id };
}


export async function updateBestAvgTimeTDB(playerId, time) {
    const { data, error } = await supabase
        .from('players')
        .update({ best_avg_time: time })
        .eq('id', playerId)
       
    if (error) {
        return { success: false};
    }

    return { success: true };
}
export async function getBestAvgTimeFDB(playerId) {
    const { data, error } = await supabase
        .from('players')
        .select('best_avg_time')
        .eq('id', playerId)
        .single();
       
    if (error || !data) {
        return { success: false, bestTime: null };
    }

    return { success: true, bestTime: data.best_avg_time };
}


export async function updateTotalGamesTDB(playerId) {
    const { data, error }=  await supabase
    .from('players')
    .update({ total_games: currentTotalGames + 1 })
    .eq('id', playerId);
     if (error) {
        return { success: false};
    }

    return { success: true };
}

export async function getAllPlayersFDB() {
    const { data, error } = await supabase
        .from('players')
        .select('*');
    
    if (error || !data) {
        return { success: false, data: null, error: error};
    }

    return { success: true, data , error: null };
}

export async function getTop5PlayersFDB() {
    const { data, error } = await supabase
        .from('players')
        .select('*')
        .order('best_avg_time', { ascending: true })   
        .limit(5);

    if (error || !data) {
        return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
}

export async function getPlayerByIdFDB(id) {
    const { data, error } = await supabase.from('players').select('*').eq('id', id).single();
    
    if (error) {
        return { success: false, error };
    }

    return { success: true, data , error: null };
}

// export async function startNewGame(playerId) {
//     const { data, error } = await supabase
//         .from('games')
//         .insert([{ player_id: playerId }])
//         .select('id')   
//         .single();

//    if (error) {
//        return { success: false, gameId: null };
//     }

//     return { success: true, gameId: data.id };
// }


// export async function addSolvedRiddle(gameId, riddleId, timeToSolve) {
//     const { data, error } = await supabase
//         .from('solved_riddles')
//         .insert([{
//             game_id: gameId,
//             riddle_id: riddleId,
//             time_to_solve: timeToSolve
//         }])
//         .select('id')   
//         .single();;

//       if (error) {
//        return { success: false, riddleId: null };
//     }

//     return { success: true, riddleId: data.id };
// }








// export async function getUserByNameAndPassword(username, password) {
//     const { data, error } = await supabase
//         .from('users')
//         .select('*')
//         .eq('username', username)
//         .eq('password', password)
//         .single();
    
//     if (error || !data) {
//         return { success: false, data: null, error };
//     }

//     return { success: true, data, error: null };
// }



export async function insertNewPlayerTDB(username) {
    const { data, error } = await supabase
        .from('players')
        .insert([username])  // 
        .select()
        .single();

    if (error || !data) {
        return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
}

export async function updatePlayerTDB(id ,username) {
    const { data, error } = await supabase
        .from('players')
        .update(username)  
        .eq('id',id)
        .select()
        .single();

    if (error || !data) {
        return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
}

export async function deletePlayerFDB(id) {
    const { data, error } = await supabase
        .from('players')
        .delete()  
        .eq('id',id)
        .select()
        .single();

    if (error || !data) {
        return { success: false, data: null, error };
    }

    return { success: true, data, error: null };
}



