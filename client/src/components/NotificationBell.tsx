import { useEffect, useState } from 'react'; 
import { FaBell } from 'react-icons/fa'; 
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';

const NotificationBell = () => { 
    const [unread, setUnread] = useState(false);
    const {showMsg, setShowMsg} = useAuth()

    useEffect(() => { 
        async function checkNotification() {
            await api.get('/notifications/') 
            .then(res => { if (res.data.length > 0) 
                setUnread(true); }) 
                .catch(err => console.error(err)); 
        }
        checkNotification()
        }, []);

return ( 
    <div className="relative cursor-pointer" onClick={() => setShowMsg(!showMsg)} > 
        <FaBell className="text-xl" color='white' /> 
        {unread && ( <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping" /> )} 
    </div> 
    ); };

export default NotificationBell;