import React from 'react';
import Dashboard from './pages/Dashboard';
import Biblioteca from './pages/Biblioteca';
import SideBar from './components/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router';
import NavBar from './components/NavBar';
import Users from './pages/Users';
import VolunteerWork from './pages/VolunteerWork';
import Forum from './pages/Fórum';
import Notifications from './pages/Notifications';
import CalendarEvents from './pages/CalendarEvents';
import Lecture from './pages/Lecture';


const App = () => {
  return (
    <>
        <div className='flex'>
          <SideBar />
           <NavBar />
            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/library" element={<Biblioteca />} />
                <Route path="/users" element={<Users />} />
                <Route path="/volunteerWork" element={<VolunteerWork />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/lecture" element={<Lecture />} />
                <Route path="/calenderEvents" element={<CalendarEvents />} />
                <Route path="/notifications" element={<Notifications />} />


              </Routes>
          </div>
      </div>
    </>
  );
};

export default App;
