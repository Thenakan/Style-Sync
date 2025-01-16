import React from 'react';
import styles from './Hero.module.css'; // Updated to use CSS Modules
// import TypedText from './TypedText';
import TypedText from '../Hero/TypedText';

const Hero = () => {
  return (
    <div className={styles.heroSection}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>
          Find Your <span className={styles.text}><TypedText /></span>
        </h1>
        <p>Discover your perfect hairstyle with StyleSync—the ultimate AI-powered solution for hairstyling.</p>
        <div className={styles.container}>
          <a href="tryon">
            <button className={styles.glowingButton}>Try Your Style</button>
          </a>
        </div>

      </div>
    </div>
  );
};

export default Hero;
