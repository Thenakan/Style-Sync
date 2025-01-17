// pages/tryon.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import './Tryon.css';

const Tryon: React.FC = () => {
  const router = useRouter();
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setMainImage(reader.result as string); // Update the main image with the uploaded file
      };
      reader.readAsDataURL(file);
    }
  };

  // Trigger the hidden file input when "Add image" button is clicked
  const handleButtonClick = () => {
    document.getElementById('imageUploadInput')?.click();
  };

  // Handle style selection
  const handleStyleSelect = (style: string) => {
    setSelectedStyle(style);  // Store the selected style
  };

  // Handle try-on button click
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
            {/* Render 4 small example image spaces in a grid */}
            {['style1', 'style2', 'style3', 'style4'].map((style, index) => (
              <div
                key={index}
                className={`small-image ${selectedStyle === style ? 'selected' : ''}`}
                onClick={() => handleStyleSelect(style)}
              >
                <Image 
                  src={`/assets/${style}.jpg`} // Assuming these are your styles
                  alt={`Style ${index + 1}`}
                  width={150}
                  height={150}
                />
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
                style={{ display: 'none' }} // Hidden input
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
