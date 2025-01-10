import Image from 'next/image';
import './Output.css';
import output from '../../public/assets/Outputmain.jpg';
import sub from '../../public/assets/Outputsub.jpg';

const Output = () => {
  return (
    <div className="output-container">
      <div className="output-preview-section">
        <div className="output-main-preview">
          <Image src={output} alt="Main preview" />
        </div>
        <div className="output-preview-info">
          <h2>Wow! Bravo it's Looking Perfect..</h2>
          <div className="output-thumbnail-grid">
            <div className="output-thumbnail">
              <Image src={sub} alt="Style 1" />
            </div>
            <div className="output-thumbnail">
              <Image src={sub} alt="Style 2" />
            </div>
            <div className="output-thumbnail">
              <Image src={sub} alt="Style 3" />
            </div>
            <div className="output-thumbnail">
              <Image src={sub} alt="Style 4" />
            </div>
          </div>
        </div>
      </div>
      <div className="output-action-buttons">
        <button className="output-download-btn">Download</button>
        <button className="output-try-another-btn">Try On Another Hair Style</button>
      </div>
    </div>
  );
};

export default Output;
