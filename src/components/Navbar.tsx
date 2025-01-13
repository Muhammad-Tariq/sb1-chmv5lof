import React from 'react';
import { Menu, Bell, Settings, User } from 'lucide-react';

const Navbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  return (
    <nav className="bg-white shadow-md px-4 py-3 flex items-center justify-between fixed w-full top-0 z-50">
      <div className="flex items-center">
        <button onClick={toggleSidebar} className="p-2 hover:bg-gray-100 rounded-lg">
          <Menu className="h-6 w-6" />
        </button>
        <h1 className="text-xl font-bold ml-4">Pakistan Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Bell className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <Settings className="h-5 w-5" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          <User className="h-5 w-5" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;