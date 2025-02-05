import React from 'react';
import Dashboard from './pages/Dashboard';
import Biblioteca from './pages/Biblioteca';
import SideBar from './components/sidebar';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import VolunteerWork from './pages/VolunteerWork';
import Forum from './pages/Fórum';
import Notifications from './pages/Notifications';
import CalendarEvents from './pages/CalendarEvents';
import Lecture from './pages/Lecture';
import SignUp from './pages/auth/sign-up';
import EmailOtp from './pages/auth/Emailotp';
import OtpVerification from './pages/auth/OtpVerification';
import AuthSuccess from './pages/auth/OtpMessage';
import PrivateRouter from './components/PrivateRouter';


const App = () => {
  const location = useLocation()
  // para bloquear o acesso direto para o dashboard, utiliza-se esse meio, por qual o caminho da url fará com que 
  const isAuthPage = location.pathname === '/' || location.pathname === "/emailOtp" || location.pathname === "/OtpVerification" || location.pathname === "/OtpMessage"
  
  return (
    <>
        <div className='flex'>
            {!isAuthPage && <SideBar />}
            {!isAuthPage && <NavBar />}
            <div>
              <Routes>
                <Route path="/dashboard" element={
                  <PrivateRouter>
                    <Dashboard />
                  </PrivateRouter>
                  } />
                <Route path="/library" element={<Biblioteca />} />
                <Route path="/users" element={<Users />} />
                <Route path="/volunteerWork" element={<VolunteerWork />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/lecture" element={<Lecture />} />
                <Route path="/calenderEvents" element={<CalendarEvents />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/" element={<SignUp />} />
                <Route path='/emailOtp' element={<EmailOtp />} />
                <Route path='/OtpVerification' element={<OtpVerification />} />
                <Route path='/OtpMessage' element={<AuthSuccess />} />

              </Routes>
          </div>
      </div>
    </>
  );
};

export default App;
