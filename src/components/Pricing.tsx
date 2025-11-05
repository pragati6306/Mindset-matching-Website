import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface PricingProps {
  onSubscribe: () => void;
  hasSubscription: boolean;
}

const plans = [
  {
    name: 'Free',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out MindMatch',
    features: [
      'Complete personality questionnaire',
      'View all matches',
      'See match compatibility scores',
      '1 free chat conversation',
      'Basic profile',
    ],
    limitations: [
      'Limited to 1 chat',
      'No priority matching',
      'Standard support',
    ],
    buttonText: 'Current Plan',
    popular: false,
  },
  {
    name: 'Premium',
    price: 9.99,
    period: 'month',
    description: 'For serious roommate seekers',
    features: [
      'Everything in Free',
      'Unlimited chat conversations',
      'Priority matching algorithm',
      'Advanced filters',
      'See who viewed your profile',
      'Featured profile listing',
      'Email notifications',
      'Priority customer support',
    ],
    limitations: [],
    buttonText: 'Subscribe Now',
    popular: true,
  },
  {
    name: 'Premium Plus',
    price: 19.99,
    period: 'month',
    description: 'Maximum visibility and features',
    features: [
      'Everything in Premium',
      'Boost your profile 3x/month',
      'Video introduction on profile',
      'Advanced compatibility insights',
      'Background verification badge',
      'Move-in assistance resources',
      'Legal agreement templates',
      'Dedicated account manager',
    ],
    limitations: [],
    buttonText: 'Subscribe Now',
    popular: false,
  },
];

export function Pricing({ onSubscribe, hasSubscription }: PricingProps) {
  const handleSubscribe = (planName: string) => {
    if (hasSubscription) {
      toast.info('You already have an active subscription!');
      return;
    }

    if (planName === 'Free') {
      toast.info('You are already on the free plan');
      return;
    }

    toast.success(`Subscribed to ${planName} plan!`);
    onSubscribe();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Find your perfect roommate with our flexible pricing options. Start free and upgrade anytime.
        </p>
      </div>

      {hasSubscription && (
        <div className="max-w-2xl mx-auto mb-8">
          <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200 p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl">You're a Premium Member!</h3>
                <p className="text-gray-600">
                  Enjoy unlimited chats and all premium features
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`p-8 relative ${
              plan.popular
                ? 'border-purple-500 border-2 shadow-xl'
                : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0">
                Most Popular
              </Badge>
            )}

            <div className="mb-6">
              <h3 className="text-2xl mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{plan.description}</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl">${plan.price}</span>
                <span className="text-gray-600">/{plan.period}</span>
              </div>
            </div>

            <Button
              onClick={() => handleSubscribe(plan.name)}
              className={`w-full mb-6 ${
                plan.popular
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
                  : ''
              }`}
              variant={plan.popular ? 'default' : 'outline'}
              disabled={plan.name === 'Free' && !hasSubscription}
            >
              {hasSubscription && plan.name !== 'Free'
                ? 'Current Plan'
                : plan.buttonText}
            </Button>

            <div className="space-y-3">
              {plan.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-green-600" />
                  </div>
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-16 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
        <h2 className="text-3xl text-center mb-8">Frequently Asked Questions</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl mb-2">Can I cancel anytime?</h3>
            <p className="text-gray-600">
              Yes! You can cancel your subscription at any time. You'll continue to have access until the end of your billing period.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2">What payment methods do you accept?</h3>
            <p className="text-gray-600">
              We accept all major credit cards, debit cards, and PayPal for your convenience.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2">How does the free chat work?</h3>
            <p className="text-gray-600">
              Free users get one complete conversation with any match. Once you've chatted with one person, you'll need to subscribe for additional chats.
            </p>
          </div>
          <div>
            <h3 className="text-xl mb-2">Can I upgrade or downgrade?</h3>
            <p className="text-gray-600">
              Absolutely! You can change your plan at any time. Upgrades are immediate, and downgrades take effect at the next billing cycle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
