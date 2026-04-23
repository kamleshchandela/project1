import React from 'react';

const Container = ({ children, className = '' }) => {
  return (
    <div className={`max-w-[1280px] mx-auto px-4 md:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

export default Container;
