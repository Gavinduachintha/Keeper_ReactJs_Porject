import React from 'react';
import '../../styles/components/Backdrop.css';

const Backdrop = ({ onClick }) => {
  return <div className="backdrop" onClick={onClick}></div>;
};

export default Backdrop; 