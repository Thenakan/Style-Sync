import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { toast, ToastContainer } from 'react-toastify';  // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css';  // Import styles for Toastify
import styles from './Payment.module.css';
import '@/app/globals.css';

const Payment: React.FC = () => {
  const router = useRouter();
  const { plan, price } = router.query;

  const [cardType, setCardType] = useState<string>(''); // State to track the detected card type
  const [cardNumber, setCardNumber] = useState<string>(''); // State for card number
  const [expiry, setExpiry] = useState<string>(''); // State for expiry date
  const [cvv, setCvv] = useState<string>(''); // State for CVV
  const [cvvError, setCvvError] = useState<string>(''); // State for CVV error message
  const [loading, setLoading] = useState<boolean>(false); // Loading state for form submission

  const detectCardType = (cardNumber: string) => {
    const visaPattern = /^4/;
    const masterPattern = /^(5[1-5]|2[2-7])/;
    const amexPattern = /^3[47]/;

    if (visaPattern.test(cardNumber)) {
      setCardType('visa');
    } else if (masterPattern.test(cardNumber)) {
      setCardType('master');
    } else if (amexPattern.test(cardNumber)) {
      setCardType('amex');
    } else {
      setCardType('');
    }
  };

  const validateCvv = (cvv: string) => {
    if (cardType === 'amex' && cvv.length !== 4) {
      setCvvError('CVV must be 4 digits for American Express.');
      return false;
    }
    if ((cardType === 'visa' || cardType === 'master') && cvv.length !== 3) {
      setCvvError('CVV must be 3 digits for Visa or MasterCard.');
      return false;
    }
    setCvvError('');
    return true;
  };

  // Handle card number input change
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\s+/g, ''); // Remove spaces
    if (inputValue.length <= 16) {
      inputValue = inputValue.replace(/(\d{4})(?=\d)/g, '$1 '); // Format in 4-digit groups
    }
    setCardNumber(inputValue);
    detectCardType(inputValue);
  };

  // Handle expiry input change (MM/YY format)
  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (inputValue.length > 2) {
      inputValue = inputValue.substring(0, 2) + '/' + inputValue.substring(2, 4); // Add '/' after MM
    }
    setExpiry(inputValue);
  };

  // Handle CVV input change
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cvvValue = e.target.value;
    setCvv(cvvValue);

    // Validate CVV
    validateCvv(cvvValue);
  };

  const planName = typeof plan === 'string' ? plan : 'Unknown Plan';
  const priceAmount = typeof price === 'string' ? parseInt(price, 10) : 0;

  // Function to handle payment submission
  const handlePaymentSubmit = async () => {
    // Check if any required field is empty
    if (!cardNumber || !expiry || !cvv || cvvError) {
      toast.error('Please fill in all fields correctly before submitting.');
      return;
    }

    setLoading(true);

    try {
      // Send payment details to your backend
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentMethodId: 'pm_card_visa', // Replace with the actual payment method ID
          plan: planName,
          price: priceAmount.toString(),
          returnUrl: 'http://localhost:3000/return', // Replace with the actual return URL
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Payment succeeded
        console.log('Payment successful:', data.paymentIntentId);
        toast.success('Payment was successful! Thank you for your purchase.');
      } else {
        // Payment failed
        toast.error(data.error || 'Payment failed, please try again.');
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('An error occurred while processing your payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.paymentWrapper}>
        <div className={styles.paymentBox}>
          <div className={styles.headerSection}>
            <h1 className={styles.totalLabel}>Total</h1>
            <div className={styles.priceAmount}>
              LKR {priceAmount.toLocaleString()}.00
            </div>
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
                  value={cardNumber}
                  onChange={handleCardNumberChange} // Handle card number change
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
              <div className={styles.inputContainer} style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="CVV"
                  className={styles.textInput}
                  required
                  value={cvv}
                  onChange={handleCvvChange} // Handle CVV change
                />
                <span className={styles.inputFocusEffect}></span>
                {cvvError && <div className={styles.errorText}>{cvvError}</div>}
              </div>
            </div>

            <div className={styles.inputRow}>
              <div className={styles.cardLogos}>
                {cardType === 'visa' && (
                  <div className={styles.cardLogo}>
                    <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229915/icons8-visa-48_1_ubvxmy.png"alt="Visa" width={40} height={25} />
                  </div>
                )}
                {cardType === 'master' && (
                  <div className={styles.cardLogo}>
                    <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229914/icons8-mastercard-48_gf1rjz.png" alt="Mastercard" width={40} height={25} />
                  </div>
                )}
                {cardType === 'amex' && (
                  <div className={styles.cardLogo}>
                    <Image src="https://res.cloudinary.com/dcuarscor/image/upload/v1738229914/icons8-amex-48_sft0yi.png" alt="Amex" width={40} height={25} />
                  </div>
                )}
              </div>
              <div className={styles.inputContainer} style={{ flex: 1 }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className={styles.textInput}
                  required
                  value={expiry}
                  onChange={handleExpiryChange} // Handle expiry change
                />
                <span className={styles.inputFocusEffect}></span>
              </div>
            </div>
          </div>

          <button
            className={styles.submitPaymentButton}
            onClick={handlePaymentSubmit}
            disabled={loading || cvvError !== ''}
          >
            {loading ? 'Processing...' : 'Submit Payment'}
            <div className={styles.buttonOverlayEffect}></div>
          </button>
        </div>
      </div>

      {/* ToastContainer is required to display the toast notifications */}
      <ToastContainer />
    </div>
  );
};

export default Payment;
