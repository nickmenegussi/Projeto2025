import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import { useAuth } from './modules/auth/AuthContext'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Otp from './pages/auth/Otp'

import Overview from './pages/Overview'
import LecturesList from './pages/lectures/LecturesList'
import UsersList from './pages/users/UsersList'
import LibraryList from './pages/library/LibraryList'
import CalendarPage from './pages/calendar/CalendarPage'
import Settings from './pages/Settings'
import VolunteersList from './pages/volunteers/VolunteersList'
import OtpVerification from './pages/auth/OtpVerification'
import AuthSuccess from './pages/auth/OtpMessage'

function Private({ children }){
  const { user } = useAuth()
  // trocar para !user
  if (!user) return <Navigate to="/auth/login" />
  return children
}

export default function App(){
  return (
    <Routes>
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/emailOtp" element={<Otp />} />
      <Route path="/auth/OtpVerification" element={<OtpVerification />} />
      <Route path="/auth/OtpMessage" element={<AuthSuccess />} />
      <Route path="/dashboard/*" element={
        <Private>
          <AppLayout>
            <Routes>
              <Route path="overview" element={<Overview />} />
              <Route path="lectures" element={<LecturesList />} />
              <Route path="users" element={<UsersList />} />
              <Route path="library" element={<LibraryList />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="volunteers" element={<VolunteersList />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Navigate to="overview" />} />
            </Routes>
          </AppLayout>
        </Private>
      } />
      <Route path="*" element={<Navigate to="/auth/login" />} />
    </Routes>
  )
}
