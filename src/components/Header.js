import React from 'react';
import { NavLink } from 'react-router-dom';
import '../index.css'; // Importing Tailwind CSS styles

const navigation = [
  { name: 'Home', href: '/', icon: 'home-icon.svg' },
  { name: 'Items', href: '/items', icon: 'items-icon.svg' },
  { name: 'Stock', href: '/stock', icon: 'stock-icon.svg' },
  { name: 'Help', href: '/help', icon: 'help-icon.svg' },
  // ... other navigation items ...
];

const Header = () => {
  return (
    <div className="bg-gray-800">
      <div className="flex flex-col w-64 h-screen px-4 py-8 bg-white border-r">
        <h2 className="text-3xl font-semibold text-gray-800">Dashboard</h2>
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => 
                  isActive ? 'flex items-center px-4 py-2 mt-5 text-gray-700 bg-gray-200 rounded-md' : 'flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-gray-200 rounded-md'
                }
              >
               
                <span className="mx-4 font-medium">{item.name}</span>
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center px-4 -mx-2">
            {/* Your logout or profile section here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
