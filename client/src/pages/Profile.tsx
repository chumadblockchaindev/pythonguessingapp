import { useEffect, useState } from 'react'; 
import api from '../utils/api';

const Profile = () => { 
  const [user, setUser] = useState({ username: '', email: '', total_games: 0, total_wins: 0, best_score: 0 });

useEffect(() => { 
  async function getProfile () {
  await  api.get('/api/user/profile/') 
  .then(res => setUser(res.data)) 
  .catch(err => console.error('Error loading profile', err)); 
  }
  getProfile()
}, []);

return ( 
  <div className="p-4"> 
    <h2 className="text-xl font-bold mb-4">👤 Profile</h2> 
    <div className="bg-white shadow p-4 rounded"> 
      <p><strong>Username:</strong> {user.username}</p> 
      <p><strong>Email:</strong> {user.email}</p> 
      <p><strong>Total Games:</strong> {user.total_games}</p> 
      <p><strong>Wins:</strong> {user.total_wins}</p> 
      <p><strong>Best Score:</strong> {user.best_score}</p> 
    </div> 
  </div> 
  ); 
};

export default Profile;