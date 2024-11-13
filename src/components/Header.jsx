import React, { useEffect, useState } from 'react';
import logo from '../assets/images/LearnUmlogo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightToBracket, faArrowRightFromBracket, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const adminAccess = JSON.parse(sessionStorage.getItem('exsistingUser'));

    setIsLogin(!!token); // Simplified condition to check login status
    setIsAdmin(adminAccess?.role === 'admin'); // Check if user is an admin
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('token'); // Clear token on logout
    sessionStorage.removeItem('exsistingUser'); // Clear user data on logout
    setIsLogin(false);
    setIsAdmin(false);
  };

  return (
    <div className="navbar bg-cyan-400 flex flex-wrap items-center justify-between py-4 px-2">
      {/* Logo */}
      <div className="logo ms-2">
        <img src={logo} alt="LearnUm logo" className="h-10 rounded" />
      </div>

      {/* Login/Logout and Admin Buttons */}
      <div className="logbutton flex items-center">
        {!isLogin ? (
          <div>
            <Link to="/login" className="no-underline">
              <button className="border-2 border-black text-white me-2 py-2 px-3 rounded-md hover:bg-black hover:text-white transition duration-300">
                <span className="hidden md:inline">Login</span>
                <FontAwesomeIcon icon={faArrowRightToBracket} className="inline md:ml-2" />
              </button>
            </Link>
          </div>
        ) : (
          <div className="logout">
            <button
              onClick={handleLogout}
              className="border-2 border-black text-white me-2 py-2 px-3 rounded-md hover:bg-black hover:text-white transition duration-300"
            >
              <span className="hidden md:inline">Logout</span>
              <FontAwesomeIcon icon={faArrowRightFromBracket} className="inline md:ml-2" />
            </button>
          </div>
        )}

        {/* Admin button shown only when user is admin */}
        {isAdmin && (
          <div className="adminbut">
            <Link to="/adminDashboard">
              <button className="border-2 border-black text-white me-2 py-2 px-2 rounded-md hover:bg-black hover:text-white transition duration-300">
                <FontAwesomeIcon icon={faUserShield} />
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
