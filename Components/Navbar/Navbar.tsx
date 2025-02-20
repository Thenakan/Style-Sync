'use client';

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setIsAdmin(user?.role === 'admin');
    }
  }, []);

  useEffect(() => {
    // Disable scrolling when menu is open
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <div className={styles.logo}>
        <Image
          src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229173/Screenshot_from_2025-01-16_09-42-56_i6gqwk.png"
          alt="logo"
          width={150}
          height={150}
        />
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className={styles.menuIcon} onClick={toggleMenu}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`${styles.navLinks} ${menuOpen ? styles.showMenu : ''}`}>
        <li><a href="/">Home</a></li>
        <li><a href="tryon">Styles</a></li>
        <li><a href="subscription">Upgrade</a></li>
        <li><a href="contact">Support</a></li>
        {isAdmin && <li><a href="admin">Dashboard</a></li>}
      </ul>

      {/* Icons */}
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
