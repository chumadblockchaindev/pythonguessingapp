import { useEffect, useState } from 'react'; 
import api from '../utils/api';

interface UserScore { user: string; best_score: number; total_wins: number; total_games: number}

const Leaderboard = () => { const [users, setUsers] = useState<UserScore[]>([]);

useEffect(() => { 
  async function showLeaderBoard() {
   await api.get('/api/user/leaderboard/') 
    .then(res => {
      console.log(res)
      setUsers(res.data)}) 
    .catch(err => console.error('Failed to load leaderboard', err)); 
  }
  showLeaderBoard()
}, []);

return ( 
<div className="p-4"> 
  <h2 className="text-xl font-bold mb-4">🏆 Leaderboard</h2> 
  <table className="w-full border"> 
    <thead> 
    <tr className="bg-gray-200"> 
      <th className="p-2">Username</th> 
      <th className="p-2">Best Score</th> 
      <th className="p-2">Wins</th> 
    </tr> 
    </thead> 
    <tbody> 
      {users.map((user, idx) => ( 
        <tr key={idx} className="border-t"> 
          <td className="p-2">{user.user}</td> 
          <td className="p-2">{user.best_score}</td> 
          <td className="p-2">{user.total_games}</td>
          <td className="p-2">{user.total_wins}</td>
        </tr> 
        ))} 
        </tbody> 
        </table> 
        </div> 
        ); 
      };

export default Leaderboard;