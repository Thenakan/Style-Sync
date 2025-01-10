import Image from 'next/image';
import styles from './Footer.module.css'; // Assuming you're using a CSS Module

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <Image src="/assets/logo.png" alt="footerLogo" width={100} height={50} />
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <Image src="/assets/facebook.png" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <Image src="/assets/insta.png" alt="Instagram" width={24} height={24} />
            </a>
            <a href="#" aria-label="TikTok">
              <Image src="/assets/tictok.png" alt="TikTok" width={24} height={24} />
            </a>
          </div>
        </div>

        <div className={styles.footerLinks}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="tryon">Hair Styles</a></li>
            <li><a href="contact">Support</a></li>
            <li><a href="subscription">Upgrade</a></li>
          </ul>
        </div>

        <div className={styles.footerContact}>
          <h3>Contact Us</h3>
          <p>
            <Image src="/assets/house.png" alt="Location" width={20} height={20} /> Mullaitivu, Sri Lanka.
          </p>
          <p>
            <Image src="/assets/phone.png" alt="Phone" width={20} height={20} /> +94772023472
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2024 StyleSync AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
