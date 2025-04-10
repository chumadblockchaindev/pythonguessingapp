import { useEffect, useState } from 'react'
import api from '../utils/api';


interface Notification { id: number; message: string; created_at: string; is_read: boolean; }

const NotificationMsg = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => { 
      api.get('/notifications/') 
      .then(res => setNotifications(res.data)) 
      .catch(err => console.error(err)); 
    }, []);
    
  return (
    <div className="p-4"> 
          <h2 className="text-xl font-semibold mb-4">🔔 Notifications</h2> 
        <ul className="divide-y"> 
          {notifications.map(notif => ( 
            <li key={notif.id} className={`py-2 px-3 ${!notif.is_read ? 'bg-yellow-100' : ''}`}> 
              <p>{notif.message}</p> 
              <span className="text-xs text-gray-500">
                {new Date(notif.created_at).toLocaleString()}
              </span>
            </li> ))} 
          </ul> 
        </div>
  )
}

export default NotificationMsg