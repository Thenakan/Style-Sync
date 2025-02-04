import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import './Tryon.css';

const Tryon: React.FC = () => {
  const router = useRouter();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem('user'); // Check if user is logged in
    if (!user) {
      router.push('/login'); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return null; // Prevent rendering until authentication check completes
  }

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('imageUploadInput')?.click();
  };

  const handleStyleSelect = (styleUrl: string) => {
    setSelectedStyle(styleUrl);
  };

  const handleTryOnClick = () => {
    if (selectedStyle) {
      router.push({
        pathname: '/output',
        query: { selectedStyle, mainImage },
      });
    } else {
      alert('Please select a hairstyle!');
    }
  };

  // Cloudinary Base URL (Replace YOUR_CLOUD_NAME with your actual Cloudinary cloud name)
  const cloudinaryBaseUrl = "https://res.cloudinary.com/dcuarscor/image/upload/";

  // Cloudinary Style Image URLs
  const styleImages = [
    `https://res.cloudinary.com/dcuarscor/image/upload/v1738298253/1_pgw4ds.webp`,
    `https://res.cloudinary.com/dcuarscor/image/upload/v1738297549/1_wlhva9.webp`,
    `https://res.cloudinary.com/dcuarscor/image/upload/v1738298065/3_htok6k.webp`,
    `https://res.cloudinary.com/dcuarscor/image/upload/v1738298146/4_qnfdw5.webp`,
  ];

  return (
    <main className="tryon-wrapper">
      <header>
        <h1 className="tryon-h1">StyleSync Try-On</h1>
        <p className="tryon-p">
          Upload your image to try out different styles and find the perfect look!
        </p>
      </header>

      <div className="tryon-container">
        <div className="image-section">
          <div className="main-image">
            <div className="image-placeholder">
              {mainImage ? (
                <img src={mainImage} alt="Uploaded" />
              ) : (
                <p>No image uploaded</p>
              )}
            </div>
          </div>

          <div className="style-grid">
            {styleImages.map((imageUrl, index) => (
              <div
                key={index}
                className={`small-image ${selectedStyle === imageUrl ? 'selected' : ''}`}
                onClick={() => handleStyleSelect(imageUrl)}
              >
                <Image src={imageUrl} alt={`Style ${index + 1}`} width={150} height={150} />
              </div>
            ))}
          </div>
        </div>

        <div className="control-section">
          <h1 className="tryon-h1">StyleSync Hair Style Changer</h1>
          <p className="tryon-p">
            Try different AI hairstyles to find out what suits you best.
          </p>

          <div className="upload-section">
            <h2 className="tryon-h2">Upload Your Photo</h2>
            <div className="upload-box">
              <div className="image-icon">🖼️</div>
              <input
                id="imageUploadInput"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageUpload}
                style={{ display: 'none' }}
              />
              <button className="upload-btn" onClick={handleButtonClick}>
                Add image
              </button>
              <p className="upload-text">JPEG or PNG files accepted</p>
            </div>
            <button className="try-on-btn" onClick={handleTryOnClick}>
              Try On
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tryon;
