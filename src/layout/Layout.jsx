import React, { createContext, useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiRepeat,
  FiBriefcase,
  FiCreditCard,
  FiDollarSign,
  FiSettings,
  FiBarChart,
  FiBell,
  FiSearch,
} from 'react-icons/fi';
import { AiFillHome } from "react-icons/ai";
import { IoClose } from 'react-icons/io5';
import { BiTask } from 'react-icons/bi';
import Header from './Header/Header';

const menuItems = [
  { name: 'Dashboard', path: '/dashboard', icon: <AiFillHome /> },
  { name: 'Transactions', path: '/transactions', icon: <FiRepeat /> },
  { name: 'Accounts', path: '/accounts', icon: <FiBriefcase /> },
  { name: 'Investments', path: '/investments', icon: <FiBarChart /> },
  { name: 'Credit Cards', path: '/cards', icon: <FiCreditCard /> },
  { name: 'Loans', path: '/loans', icon: <FiDollarSign /> },
  { name: 'Settings', path: '/settings', icon: <FiSettings /> },
];

export const SidebarLinkContext = createContext();

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`h-screen overflow-y-auto pb-5 z-20 bg-white text-black fixed lg:static ${
        isOpen ? 'w-64' : 'w-0'
      } transition-all duration-300`}
    >
      {/* Sidebar Header */}
      <div className="px-5 py-4 flex items-center justify-between">
        <h1 className="lg:text-3xl text-2xl font-bold text-blue-950 flex items-center gap-2">
          <BiTask className="text-black" />
          Soar Task
        </h1>
        <button
          onClick={toggleSidebar}
          className="text-black text-2xl lg:hidden focus:outline-none"
          aria-label="Close Sidebar"
        >
          <IoClose />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <nav className="flex flex-col gap-1 mt-8">
        <ul>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li
                key={item.name}
                className={`p-3 flex items-center hover:bg-gray-200 font-semibold hover:text-black transition-all pl-7 ${
                  isActive
                    ? 'text-black border-l-[6px] border-black'
                    : 'text-gray-400'
                }`}
              >
                <span className="mr-3 text-xl">{item.icon}</span>
                <Link to={item.path} className="flex-1">
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Open sidebar by default on screens >= 768px
    const handleResize = () => {
      if (window.innerWidth >= 992) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Run the check on initial render
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col relative max-h-[100vh]">
      <div className="flex flex-1">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="overflow-x-hidden h-[100vh] flex-1 overflow-y-auto bg-gray-50 text-black">
          <Header toggleSidebar={toggleSidebar} />
          <div className="md:p-4 p-2">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
