import React, { useState, useEffect } from 'react';
import {
  IconBrandTwitter,
  IconBrandFacebook,
  IconBrandInstagram,
} from '@tabler/icons-react';
import { styles } from '../data';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [developerName, setDeveloperName] = useState<string>('Morakinyo Akin-Taylor');

  useEffect(() => {
    // Array of developer names to cycle through
    const names = ['Morakinyo Akin-Taylor', 'Osborne Aigbiremolen & Onyebuchi Onyeka'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      // Update the developer name to the next one in the array
      currentIndex = (currentIndex + 1) % names.length;
      setDeveloperName(names[currentIndex]);
    }, 10000); // Change every 10 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className={`flex flex-col md:flex-row justify-between items-center py-4 bg-primary text-black space-y-2 md:space-y-0 md:space-x-4 ${styles.body} relative z-10`}>
      {/* Copyright and Developer Information */}
      <div className="text-sm text-center md:text-left">
        <p>© Copyright <span className='font-semibold'>{currentYear}</span> Surulere LGA. All Rights Reserved</p>
        <p>Developed by <span className='font-semibold'>{developerName}</span></p>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-3 text-black">
        <IconBrandTwitter size={20} className="hover:text-gray-600 cursor-pointer" />
        <IconBrandFacebook size={20} className="hover:text-gray-600 cursor-pointer" />
        <IconBrandInstagram size={20} className="hover:text-gray-600 cursor-pointer" />
      </div>
    </footer>
  );
};

export default Footer;
