import { Link } from 'expo-router';
import React from 'react';
import { styles } from '../data';

const BottomNav: React.FC = () => {
  return (
    <footer className={`py-6 bg-gray-50 text-black space-y-6 md:space-y-0 flex max-md:flex-col md:justify-between justify-center ${styles.body} relative z-10`}>
      {/* Address Section */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">Surulere</h2>
        <p>1 Olaogun Dickson avenue off Alhaji Masha road, Onilegogoro, Surulere.</p>
        <p>Phone: +234 807 539 5649</p>
        <p>Email: <a href="mailto:localgovernmentsurulere@gmail.com" className="text-primary hover:underline">localgovernmentsurulere@gmail.com</a></p>
      </div>

      {/* Quick Links Section */}
      <div className="space-y-2">
        <h2 className="font-bold text-lg">Quick Links</h2>
        <ul className="space-y-1">
          <li>
            <Link href="/website" className="text-primary hover:underline text-[15px]">Home</Link>
          </li>
          <li>
            <Link href="/website/history" className="text-primary hover:underline text-[15px]">History</Link>
          </li>
          <li>
            <Link href="/website/contact" className="text-primary hover:underline text-[15px]">Contact Us</Link>
          </li>
          <li>
            <Link href="/website/departments" className="text-primary hover:underline text-[15px]">Departments</Link>
          </li>
        </ul>
      </div>

      {/* Latest News Section */}
      <div className="space-y-2 max-w-[250px] w-full">
        <h2 className="font-bold text-lg">Latest News</h2>
        <p>
          Click <Link href="/website/allBlogs" className="text-primary hover:underline text-[15px]">here</Link> to visit our blog for the latest news about Surulere Local Government
        </p>
      </div>
    </footer>
  );
};

export default BottomNav;
