import { useRouter } from "next/router";
import './Subscription.css';

interface Plan {
  name: string;
  price: number;
  tokens: number;
}

const plans: Plan[] = [
  { name: "Basic", price: 500, tokens: 50 },
  { name: "Pro", price: 800, tokens: 100 },
  { name: "Premium", price: 1000, tokens: 200 },
];

const Subscription: React.FC = () => {
  const router = useRouter();

  const handleSelect = (plan: string, price: number) => {
    router.push({
      pathname: "/payment",
      query: { plan, price },
    });
  };

  return (
    <div className="pricing-section-wrapper">
      <div className="pricing-section">
        <h1 className="Mainheading">Our Pricing Plans</h1>

        <div className="pricing-options">
          {plans.map((plan) => (
            <div key={plan.name} className="plan-card">
              <h2>{plan.name}</h2>
              <div className="price-value">LKR {plan.price}</div>
              <div className="plan-icon">✃</div>
              <div className="token-count">{plan.tokens} Tokens</div>
              <button
                className="button"
                onClick={() => handleSelect(plan.name, plan.price)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Subscription;
