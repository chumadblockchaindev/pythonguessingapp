import { useEffect, useState } from 'react'; 
import { FaBell } from 'react-icons/fa'; 
import api from '../utils/api';
import NotificationMsg from './NotificationMsg';

const NotificationBell = () => { 
    const [unread, setUnread] = useState(false);

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
    <div className="relative cursor-pointer"> 
        <FaBell className="text-xl" color='white' /> 
        {unread && ( <span className="absolute top-0 right-0 h-3 w-3 rounded-full bg-red-500 animate-ping" /> )} 
        <div className='hidden'>
            <NotificationMsg />
        </div>
    </div> 
    ); };

export default NotificationBell;