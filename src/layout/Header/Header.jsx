import { useState } from "react";
import { FiBell, FiSearch, FiSettings } from "react-icons/fi";
import { LuMenu } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";


export default function Header ({ toggleSidebar }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const routeTitle = location.pathname.split('/')[1] || 'Dashboard';

  const notifications = [
    { id: 1, text: 'You have a new transaction!' },
    { id: 2, text: 'Loan application approved.' },
    { id: 3, text: 'New update available.' },
  ];

  return (
    <header className="sticky top-0 bg-white z-10">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Dynamic Page Title */}
        <button onClick={toggleSidebar} className="text-2xl p-2 text-slate-900 lg:hidden focus:outline-none" aria-label="Open Sidebar">
          <LuMenu/>
        </button>
        <h2 className="text-[1.4em] font-medium text-blue-950 capitalize">
          {routeTitle}
        </h2>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden lg:block w-full max-w-sm">
            <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
              <FiSearch className="text-gray-500" />
              <input type="text" placeholder="Search for something" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent placeholder:text-sm placeholder:text-blue-950 placeholder:font-medium placeholder:opacity-25 focus:outline-none px-2 py-1"/>
            </div>
          </div>

          {/* Notifications */}
          <div className="lg:block hidden">
            <div className="flex items-center gap-6">
              <button className="relative" onClick={() => setShowNotifications(!showNotifications)}>
                <FiBell className="w-5 h-5 text-blue-900" />
                <p className="absolute -top-[3px] -right-[0px] w-2 h-2 border-2 border-blue-900 text-white text-xs font-bold rounded-full">
                  {/* {notifications.length} */}
                </p>
              </button>
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-6 top-14 bg-white shadow-lg border rounded-md w-64">
                  <ul>
                    {notifications.map((note) => (
                      <li key={note.id} className="p-2 hover:bg-gray-100 text-gray-700">
                        {note.text}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Settings */}
              <Link to="/settings" className="text-gray-700 hover:text-black" title="Settings">
                <FiSettings className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Admin Profile */}
          <div className="w-16 h-10 bg-gray-200 rounded-full">
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="relative block lg:hidden pb-3">
        <div className="flex items-center bg-gray-200 max-w-[90%] mx-auto rounded-full px-3 py-1">
          <FiSearch className="text-gray-500" />
          <input type="text" placeholder="Search for something" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-transparent placeholder:text-sm placeholder:text-blue-950 placeholder:font-medium placeholder:opacity-25 focus:outline-none px-2 py-1"/>
        </div>
      </div>
    </header>
  );
};