// components/Payment.js
import Image from 'next/image';
import styles from './Payment.module.css'; // Update to use module CSS
import visa from '../../public/assets/visa.png';
import master from '../../public/assets/master.png';
import amex from '../../public/assets/amex.png';

function Payment() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentBox}>
          <div className={styles.headerSection}>
            <h1 className={styles.totalLabel}>Total</h1>
            <div className={styles.priceAmount}>LKR 0.00</div>
          </div>

          <div className={styles.inputGroup}>
            <div className={styles.inputRow}>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="First Name"
                  className={styles.textInput}
                  required
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
              <div className={styles.inputContainer}>
                <input
                  type="text"
                  placeholder="Last Name"
                  className={styles.textInput}
                  required
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.cardNumberContainer}>
                <span className={styles.cardIcon}>💳</span>
                <input
                  type="text"
                  placeholder="Card Number"
                  className={`${styles.textInput} ${styles.cardNumberInput}`}
                  required
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
              <div className={styles.inputContainer} style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="CVV"
                  className={styles.textInput}
                  required
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.cardLogos}>
                <div className={styles.cardLogo}>
                  <Image src={visa} alt="Visa" width={40} height={25} />
                </div>
                <div className={styles.cardLogo}>
                  <Image src={master} alt="Mastercard" width={40} height={25} />
                </div>
                <div className={styles.cardLogo}>
                  <Image src={amex} alt="Amex" width={40} height={25} />
                </div>
              </div>
              <div className={styles.inputContainer} style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={styles.textInput}
                  required
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
            </div>
          </div>

          <button className={styles.submitPaymentButton}>
            <span>Submit Payment</span>
            <div className={styles.buttonOverlayEffect}></div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
