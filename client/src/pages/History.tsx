import { useEffect, useState } from 'react'; 
import api from '../utils/api';

interface Game { id: number; attempts: number; result: string; level: string; created_at: string; score: string; }

const GameHistory = () => { const [games, setGames] = useState<Game[]>([]);

useEffect(() => { 
 async function getHistory() {
  await api.get('/api/user/history/') 
  .then(res => setGames(res.data)) 
  .catch(err => console.error('Game history fetch failed', err)); 
 }
 getHistory()
}, []);

return ( 
  <div className="p-4"> 
  <h2 className="text-xl font-bold mb-4">🎮 Game History</h2> 
  <ul className="divide-y divide-gray-200"> 
    {games.length ? games.map((game) => ( 
      <li key={game.id} className="py-2"> 
      <div className="flex justify-between"> 
        <span>{new Date(game.created_at).toLocaleString()}</span> 
        <span className="text-sm text-gray-500">{game.level}</span> 
        <span className={game.result == 'win' ? 'text-green-500' : 'text-red-500'}> 
          {game.result == 'Win' ? 'Win' : 'Loss'} 
        </span> 
        <span>Attempts: {game.attempts}</span> 
      </div> 
      </li> 
      )): "No Games Played. Start Playing!"} 
      </ul> 
      </div> 
      ); 
    };

export default GameHistory;