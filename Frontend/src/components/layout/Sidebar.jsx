import React from 'react';
import '../../styles/components/Sidebar.css';

const Sidebar = ({ isOpen, children }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        {children}
      </div>
    </div>
  );
};

export default Sidebar; 