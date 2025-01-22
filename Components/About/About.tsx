import React from 'react';
import styles from './About.module.css';

const About = () => {
    return (
        <div className={styles.aboutSection}>
            <div className={styles.content}>
                <h1 className={styles.h1Text}>
                    About <span className={styles.styleSyncName}>StyleSync</span>
                </h1>
                <p className={styles.pText}>
                    Discover your perfect hairstyle with <span className={styles.styleSyncName}>StyleSync</span>—the ultimate AI-powered solution for hairstyling.
                </p>
                <p className={styles.pText}>
                    "Imagine a world where your hairstyle perfectly complements your unique features. With <span className={styles.styleSyncName}>StyleSync</span>, that vision becomes a reality. Using advanced face-scanning AI, we provide tailored hairstyle recommendations and streamline communication with hairstylists, setting a new standard in personalized salon experiences."        </p>
                <div className={styles.container}>
                    <a href="contact">
                        <button className={styles.glowingButton}>Contact Us</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
