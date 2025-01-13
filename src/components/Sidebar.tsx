import React from 'react';
import { Home, Map, BarChart2, Users, FileText } from 'lucide-react';

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const menuItems = [
    { icon: Home, label: 'Dashboard' },
    { icon: Map, label: 'Regions' },
    { icon: BarChart2, label: 'Statistics' },
    { icon: Users, label: 'Population' },
    { icon: FileText, label: 'Reports' },
  ];

  return (
    <aside className={`bg-white shadow-lg fixed left-0 top-0 h-full pt-16 transition-all duration-300 ${isOpen ? 'w-64' : 'w-0 -translate-x-full'}`}>
      <div className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <button className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors">
                <item.icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;