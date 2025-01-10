import React from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="/assets/logo.png" alt="logo" width={150} height={150} />
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/">Home</a></li>
        <li><a href="tryon">Hair Styles</a></li>
        <li><a href="subscription">Upgrade</a></li>
        <li><a href="contact">Support</a></li>
      </ul>
      <div className={styles.icons}>
        <Image src="/assets/bolt.png" alt="Bolt Icon" width={50} height={50} />
        <a href="Profile">
          <Image src="/assets/navuser.png" alt="User Icon" width={50} height={50} />
        </a>

      </div>
    </nav>
  );
};

export default Navbar;
