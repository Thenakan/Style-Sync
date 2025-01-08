import React from 'react';
import Image from 'next/image';
import location from '../../public/assets/location.png';
import phone2 from '../../public/assets/phone2.png';
import mail from '../../public/assets/mail.png';
import './Contact.css';

const Contact: React.FC = () => {
  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact</h1>
      <p className="contact-description">
        Premier destination for professional hair care and beauty services, delivering 
        award-winning excellence and personalized treatments since 2024.
      </p>

      <div className="contact-layout">
        {/* Left Column */}
        <div className="contact-details">
          <h2 className="heading">Get in Touch</h2>
          <p className="info">Beautiful Hair Today.</p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <span className="contact-icon">
                <Image src={location} alt="Location" width={24} height={24} />
              </span>
              <span>Location: Mullaitivu, Sri Lanka.</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">
                <Image src={phone2} alt="Phone" width={24} height={24} />
              </span>
              <span>Phone: +94772023472</span>
            </div>
            <div className="contact-info-item">
              <span className="contact-icon">
                <Image src={mail} alt="Email" width={24} height={24} />
              </span>
              <span>Email: thenakan12@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="contact-message-form">
          <h2 className="heading">Send a message</h2>
          <form className="form-container">
            <input
              type="text"
              className="input-field"
              placeholder="Your name"
              required
            />
            <input
              type="email"
              className="input-field"
              placeholder="Your email"
              required
            />
            <input
              type="tel"
              className="input-field"
              placeholder="Your contact number"
            />
            <input
              type="text"
              className="input-field"
              placeholder="Subject"
            />
            <textarea
              className="textarea-field"
              placeholder="Your message"
              rows={6}
              required
            ></textarea>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
