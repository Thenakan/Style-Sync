import './Subscription.css';

const Subscription: React.FC = () => {
  return (
    <div className="pricing-section-wrapper">
      <div className="pricing-section">
        <h1>Our Pricing Plans</h1>

        <div className="pricing-options">
          <div className="plan-card">
            <h2>Basic</h2>
            <div className="price-value">LKR 500</div>
            <div className="plan-icon">⚡</div>
            <div className="token-count">50 Tokens</div>
            <button>Select</button>
          </div>

          <div className="plan-card">
            <h2>Pro</h2>
            <div className="price-value">LKR 800</div>
            <div className="plan-icon">⚡</div>
            <div className="token-count">100 Tokens</div>
            <button>Select</button>
          </div>

          <div className="plan-card">
            <h2>Premium</h2>
            <div className="price-value">LKR 1000</div>
            <div className="plan-icon">⚡</div>
            <div className="token-count">200 Tokens</div>
            <button>Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscription;
