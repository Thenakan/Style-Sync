import './Tryon.css';

const Tryon: React.FC = () => {
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
            {/* Main image space */}
            <div className="image-placeholder">
              <img src="" alt="" />
            </div>
          </div>
          <div className="style-grid">
            {/* 8 small image spaces in a grid */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="small-image"></div>
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
              <button className="upload-btn">Choose an image</button>
              <p className="upload-text">JPEG or PNG files accepted</p>
            </div>
            <button className="try-on-btn">Try On</button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Tryon;
