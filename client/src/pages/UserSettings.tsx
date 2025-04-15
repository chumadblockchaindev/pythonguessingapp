import React, { useEffect, useState } from 'react'; 
import api from '../utils/api';

const Settings = () => { 
    const [formData, setFormData] = useState({ username: '', email: '', password: '', new_password: '', });
const [status, setStatus] = useState('');

useEffect(() => { 
    // setFormData({ ...formData, username: res.data.username, email: res.data.email })
    async function getProfile () {
    await api.get('/api/user/details/') 
    .then(res => console.log(res.data)) 
    .catch(err => console.error(err)); 
    }
    getProfile()
}, []);

const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); 
};

const handleSubmit = async (e: React.FormEvent) => { 
    e.preventDefault(); 
    try {
    await api.put('/api/user/profile/update/', formData) 
    .then(() => setStatus('✅ Profile updated successfully')) 
    .catch(() => setStatus('❌ Failed to update profile')); 
    } catch (error) {
        console.error(error)
    }
};

return ( 
    <div className="p-4"> 
        <h2 className="text-xl font-semibold mb-4">⚙️ Account Settings</h2> 
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md"> 
            <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full border p-2 rounded" /> 
            <input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full border p-2 rounded" /> 
            <input name="password" type="password" placeholder="Current Password" value={formData.password} onChange={handleChange} className="w-full border p-2 rounded" /> 
            <input name="new_password" type="password" placeholder="New Password" value={formData.new_password} onChange={handleChange} className="w-full border p-2 rounded" /> 
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button> 
            {status && <p className="text-sm text-gray-600">{status}</p>} 
        </form> 
        <a href="/logout">
            <button className='bg-red-500 text-white px-4 py-2 rounded mt-4 cursor-pointer' type="button">Logout</button>
        </a>
    </div> 
    ); };

export default Settings