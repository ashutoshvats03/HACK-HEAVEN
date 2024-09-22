import { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Emergency from './Emergency.jsx';
import Chat from './Chat.jsx';
import Profile from './profile.jsx'; // Use LoginPage as Profile
import Register from './Register.jsx';
import Carousel from './components/Carousel.jsx';
import Notification from './notification.jsx';

function App() {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [isEmergencyVisible, setIsEmergencyVisible] = useState(false);
  const [showRegister, setShowRegister] = useState(false); // State for showing register
  const registerRef = useRef(null); // Ref for register element

  const handleProfileClick = () => {
    setIsProfileVisible(!isProfileVisible); 
    setIsEmergencyVisible(false);
  };

  const handleMouseLeaveProfile = () => {
    setIsProfileVisible(false);
  };

  const handleEmergencyClick = () => {
    setIsEmergencyVisible(!isEmergencyVisible); 
    setIsProfileVisible(false); 
  };

  const handleMouseLeaveEmergency = () => {
    setIsEmergencyVisible(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true); // Function to show the register element
  };

  // Handle clicks outside the register element
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (registerRef.current && !registerRef.current.contains(event.target)) {
        setShowRegister(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [registerRef]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div >
              <div className={`relative ${showRegister ? 'blur-sm' : ''}`}>
                <div className='flex justify-between px-16 py-2 bg-slate-800 text-white font-bold'>
                  <div className="logo text-3xl">Logo</div>
                  <div className="setting flex gap-3 my-auto">
                    <div className='relative'>
                      <div className='cursor-pointer' onClick={handleEmergencyClick}>
                        Emergency
                      </div>
                      {isEmergencyVisible && (
                        <div className="z-10 absolute top-full mt-2 bg-slate-900 p-2 rounded shadow-lg" onMouseLeave={handleMouseLeaveEmergency}>
                          <div className='w-[350px] p-2'><Emergency /></div>
                        </div>
                      )}
                    </div>

                    <div className='relative'>
                      <div className='cursor-pointer' onClick={handleProfileClick}>
                        Profile
                      </div>
                      {isProfileVisible && (
                        <div className="z-10 absolute top-full mt-2 bg-slate-900 p-2 rounded shadow-lg" onMouseLeave={handleMouseLeaveProfile}>
                          <Profile onCreateAccount={handleShowRegister} />
                        </div>
                      )}
                    </div>

                    <Link to="/chat" className="">Chat</Link>
                    <Link to="/Notification">Notification</Link>
                    <div className="">Alert</div>
                    <div className="">Donation</div>
                  </div>
                </div>
                <div><Carousel /></div>
              </div>

              {showRegister && (
                <div ref={registerRef} className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2  z-20">
                  <Register />
                </div>
              )}
            </div>
          }
        />
        
        <Route path="/login" element={<Profile onCreateAccount={handleShowRegister} />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/Notification" element={<Notification />} />
      </Routes>
    </Router>
  );
}

export default App;
