import React, { useState } from 'react';
import Image from 'next/image';
import location from '../../public/assets/location.png';
import phone2 from '../../public/assets/phone2.png';
import mail from '../../public/assets/mail.png';
import './Contact.css';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for Toastify

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' }); // Clear the form
        toast.success('Message sent successfully!'); // Success toast
      } else {
        setStatus(result.message || 'Error sending message.');
        toast.error(result.message || 'Error sending message.'); // Error toast
      }
    } catch (error) {
      setStatus('Error sending message.');
      toast.error('Error sending message.'); // Error toast on catch
      console.error(error);
    }
  };

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
          <form className="form-container" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input-field"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
              required
            />
            <input
              type="email"
              className="input-field"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              required
            />
            <input
              type="tel"
              className="input-field"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your contact number"
            />
            <input
              type="text"
              className="input-field"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
            />
            <textarea
              className="textarea-field"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your message"
              rows={6}
              required
            ></textarea>
            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
          {status && <p className="status-message">{status}</p>}
        </div>
      </div>

      {/* Add ToastContainer to render the toasts */}
      <ToastContainer />
    </div>
  );
};

export default Contact;
