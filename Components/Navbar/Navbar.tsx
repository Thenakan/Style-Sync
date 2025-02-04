import React from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229173/Screenshot_from_2025-01-16_09-42-56_i6gqwk.png" alt="logo" width={150} height={150} />
      </div>
      <ul className={styles.navLinks}>
        <li><a href="/">Home</a></li>
        <li><a href="tryon">Styles</a></li>
        <li><a href="subscription">Upgrade</a></li>
        <li><a href="contact">Support</a></li>
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
