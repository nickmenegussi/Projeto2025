import React from 'react';
import Navbar from './components/NavBar';
import Dashboard from './pages/Dashboard';
import Biblioteca from './pages/Biblioteca';
import SideBar from './components/sidebar';
import { BrowserRouter, Route, Routes } from 'react-router';

const App = () => {
  return (
    <>
        <div className='flex'>
          <SideBar />
          <div className='grow'>
            <Navbar />
            <div>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/biblioteca" element={<Biblioteca />} />
              </Routes>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
