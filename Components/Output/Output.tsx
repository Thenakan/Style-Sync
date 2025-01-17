import { useRouter } from 'next/router';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import './Output.css';

const Output = () => {
  const router = useRouter();
  const { selectedStyle, mainImage } = router.query;
  const [styledImage, setStyledImage] = useState<string | null>(null);

  // Simulate API call to get the styled image based on selected style
  useEffect(() => {
    if (selectedStyle && mainImage) {
      // Here you should call your hairstyle generation API.
      // For demo purposes, we will use the selected style and uploaded image URL.
      
      // Simulate an API call to get the styled image URL
      setStyledImage(`/api/generateStyledImage?style=${selectedStyle}&image=${mainImage}`);
    }
  }, [selectedStyle, mainImage]);

  // Function to handle the download of the image
  const handleDownload = () => {
    if (styledImage) {
      // Create a link element
      const link = document.createElement('a');
      link.href = styledImage; // URL of the image
      link.download = `styled_image_${selectedStyle}.jpg`; // Provide a name for the image file
      link.click(); // Trigger the download
    }
  };

  return (
    <div className="output-container">
      <div className="output-preview-section">
        <div className="output-main-preview">
          {styledImage ? (
            <Image
              src={styledImage}
              alt="Styled preview"
              width={350} // Medium size width
              height={350} // Medium size height
              style={{ objectFit: 'cover', borderRadius: '8px' }} // Optional: Add a border radius for better styling
            />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div className="output-preview-info">
          <h2>Wow! Bravo it's Looking Perfect..</h2>
          <div className="output-thumbnail-grid">
            <div className="output-thumbnail">
              <Image
                src="/assets/style1.jpg"
                alt="Style 1"
                width={150}
                height={150}
              />
            </div>
            <div className="output-thumbnail">
              <Image
                src="/assets/style2.jpg"
                alt="Style 2"
                width={150}
                height={150}
              />
            </div>
            <div className="output-thumbnail">
              <Image
                src="/assets/style3.jpg"
                alt="Style 3"
                width={150}
                height={150}
              />
            </div>
            <div className="output-thumbnail">
              <Image
                src="/assets/style4.jpg"
                alt="Style 4"
                width={150}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="output-action-buttons">
        <button className="output-download-btn" onClick={handleDownload}>
          Download
        </button>
        <button className="output-try-another-btn" onClick={() => router.push('/tryon')}>
          Try On Another Hair Style
        </button>
      </div>
    </div>
  );
};

export default Output;
