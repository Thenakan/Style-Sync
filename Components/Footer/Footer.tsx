import Image from 'next/image';
import styles from './Footer.module.css'; // Assuming you're using a CSS Module

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerBrand}>
          <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229173/Screenshot_from_2025-01-16_09-42-56_i6gqwk.png" alt="footerLogo" width={100} height={50} />
          
          <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738228126/icons8-facebook-logo-50_muizar.png" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" aria-label="Instagram">
              <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738228126/icons8-instagram-logo-50_ffi8hu.png" alt="Instagram" width={24} height={24} />
            </a>
            <a href="#" aria-label="TikTok">
              <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738228126/icons8-tiktok-50_vp1een.png" alt="TikTok" width={24} height={24} />
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
            <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738230725/house_ew8m9l.png" alt="Location" width={20} height={20} /> Mullaitivu, Sri Lanka.
          </p>
          <p>
            <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738230725/phone_m0yj3r.png" alt="Phone" width={20} height={20} /> +94772023472
          </p>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>&copy; 2025 StyleSync AI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
