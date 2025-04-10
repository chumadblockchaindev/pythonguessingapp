import Home from './pages/Home'
import Contact from './pages/Contact'
import UserLogin from './pages/UserLogin'
import Register from './pages/Register'
import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import LeaderBoard from './pages/LeaderBoard'
import History from './pages/History'
import Dashboard from './pages/Dashboard'
import Settings from './pages/UserSettings'
import Profile from './pages/Profile'
import PlayGame from './pages/StartGame'
import Logout from './utils/Logout'

const App = () => {

  return (
        <Routes>
          {/* User Pages */}
          <Route path='/dashboard' element={<Dashboard />}> 
            <Route path='/dashboard' element={<Navigate to="/dashboard/gameplay" />} />
            <Route path='leaderboard' element={<LeaderBoard />} />
            <Route path='gameplay' element={<PlayGame />} />
            <Route path='settings' element={<Settings />} />
            <Route path='history' element={<History />} />
            <Route path='profile' element={<Profile />} />
          </Route>  
          {/* End of Protected Routes */}

          {/* General Pages */}
          <Route element={<Layout />}>
            <Route path='/' element={<Home />} /> 
            <Route path='/login' element={<UserLogin />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
          </Route>

          <Route path='/logout' element={<Logout />} /> 

          {/* All Routes */}
          <Route path='*' element={<Navigate to='/' />} />
        </Routes>
  )
}

export default App