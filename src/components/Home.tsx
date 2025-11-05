import { Users, Heart, MessageCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';

interface HomeProps {
  onGetStarted: () => void;
}

export function Home({ onGetStarted }: HomeProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl mb-6 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Find Your Perfect Roommate
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Match with like-minded people based on lifestyle, habits, and preferences. 
          Our intelligent questionnaire helps you find roommates who truly get you.
        </p>
        <Button
          onClick={onGetStarted}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-6 text-lg"
        >
          Get Started - It's Free
        </Button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-purple-600" />
          </div>
          <h3 className="text-xl mb-2">Smart Matching</h3>
          <p className="text-gray-600">
            Our algorithm matches you with roommates based on compatibility scores from detailed questionnaires.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
            <Heart className="w-6 h-6 text-pink-600" />
          </div>
          <h3 className="text-xl mb-2">Mindset Match</h3>
          <p className="text-gray-600">
            Find people who share your values, lifestyle preferences, and daily habits for harmonious living.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
            <MessageCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl mb-2">Direct Chat</h3>
          <p className="text-gray-600">
            Start conversations with matches. First chat is free, subscribe for unlimited messaging.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
            <Shield className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl mb-2">Safe & Secure</h3>
          <p className="text-gray-600">
            Your privacy matters. We keep your information secure and only share what you choose.
          </p>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-16">
        <h2 className="text-3xl text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              1
            </div>
            <h3 className="text-xl mb-2">Complete Questionnaire</h3>
            <p className="text-gray-600">
              Answer questions about your lifestyle, habits, and preferences to build your profile.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              2
            </div>
            <h3 className="text-xl mb-2">View Matches</h3>
            <p className="text-gray-600">
              Get matched with compatible roommates ranked by similarity score.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
              3
            </div>
            <h3 className="text-xl mb-2">Connect & Chat</h3>
            <p className="text-gray-600">
              Start chatting with your matches and find your perfect roommate.
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-12 text-white">
        <h2 className="text-4xl mb-4">Ready to Find Your Match?</h2>
        <p className="text-xl mb-6 opacity-90">
          Join thousands of people who found their perfect roommate through MindMatch
        </p>
        <Button
          onClick={onGetStarted}
          className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-6 text-lg"
        >
          Start Matching Now
        </Button>
      </div>
    </div>
  );
}
