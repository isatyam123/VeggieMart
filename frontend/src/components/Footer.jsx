import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <span className="font-bold text-xl tracking-tight text-grocery">VeggieMart</span>
          <p className="text-gray-400 text-sm mt-1">Fresh from farm to your door.</p>
        </div>
        <div className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} VeggieMart. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
