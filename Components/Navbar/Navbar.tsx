'use client'; // Add this directive at the top

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if localStorage is available in the client
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setIsAdmin(user?.role === 'admin');
    }
  }, []); // Empty dependency array ensures this runs only once after mount

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image
          src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229173/Screenshot_from_2025-01-16_09-42-56_i6gqwk.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/">Home</a></li>
        <li><a href="tryon">Styles</a></li>
        <li><a href="subscription">Upgrade</a></li>
        <li><a href="contact">Support</a></li>

        {/* Conditionally render the Dashboard link only if the user is an admin */}
        {isAdmin && (
          <li><a href="admin">Dashboard</a></li>
        )}
      </ul>
      <div className={styles.icons}>
        <a href="subscription">
          <Image src="/assets/scissors.png" alt="scissors" width={50} height={50} />
        </a>
        <a href="Profile">
          <Image src="/assets/Navuser.png" alt="User Icon" width={50} height={50} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
