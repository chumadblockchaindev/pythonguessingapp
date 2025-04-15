import React, { useState, useEffect } from 'react'; 
import api from '../utils/api';

type Difficulty = {
    description: string,
    id: number,
    max_value: number,
    min_value: number,
    name: string,
}

const PlayGame: React.FC = () => { 
    const [difficulty, setDifficulty] = useState<Difficulty>();
    const [guess, setGuess] = useState(''); 
    const [levels, setLevels] = useState([]); 
    const [hint, setHint] = useState(''); 
    const [attempts, setAttempts] = useState(0); 
    const [gameId, setGameId] = useState<number | null>(null); 
    const [isCorrect, setIsCorrect] = useState(false);

useEffect(() => { 
const loadLevels = async () => { 
    try { 
        await api.get('/levels/')
        .then(res => {
            setLevels(res.data)
        })
        .catch(error => console.error(error))
        } catch (error) { 
            console.error('Error starting game', error); 
        } };
    loadLevels(); 
}, []);

useEffect(() => {
    if(levels.length){
        startGame()
    }
}, [difficulty])

async function startGame() {
    setGuess('')
    setAttempts(0)
    setHint('')
    const response = await api.post('/start/', { level_id: difficulty?.id });
        setGameId(response.data.game_id); 
}

const handleGuess = async () => { 
    if (!guess || !gameId) 
        return;

    try {
    const response = await api.post(`/guess/${gameId}/`, { guess: guess });

    setHint(response.data.message);
    setAttempts(response.data.attempts)

    if (response.data.message === 'correct') {
        setIsCorrect(true);
    }
    } catch (error) {
    console.error('Error submitting guess', error);
    }
};

return ( 
    <div className="max-w-lg mx-auto mt-10 p-4 bg-white rounded-lg shadow"> 
        <h2 className="text-2xl font-semibold mb-4 text-center">Guess The Number</h2>

        <div className="mb-4 flex justify-center space-x-4">
            {(levels as Difficulty[]).map((level, index) => (
            <button
                key={index}
                onClick={() => setDifficulty(level)}
                className={`px-4 py-2 rounded ${
                difficulty?.name === level.name ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
            >
                {level.name.toUpperCase()}
            </button>
            ))}
        </div>

  <div className="mb-4">
    <input
      type="number"
      className="w-full border rounded p-2"
      placeholder={difficulty ? `Enter number (${difficulty?.min_value!} to ${difficulty?.max_value!})` : "Select Difficulty Level to Play"}
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      disabled={isCorrect}
    />
  </div>

  <button
    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
    onClick={handleGuess}
    disabled={isCorrect}
  >
    Submit Guess
  </button>

  <div className="mt-4 text-center">
    {hint == 'Correct!' ? (
      <p className="text-green-600 font-semibold mt-2">Correct! 🎉</p>
    ): <p className="text-lg text-red-500">{hint}</p>}
    <p className="text-sm mt-2">{'Attempts: ' + attempts}</p>
  </div>
</div>
); };

export default PlayGame;