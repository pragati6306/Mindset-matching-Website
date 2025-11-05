import { useState, useEffect } from 'react';
import { Home } from './components/Home';
import { Questionnaire } from './components/Questionnaire';
import { Matches } from './components/Matches';
import { Chat } from './components/Chat';
import { Pricing } from './components/Pricing';
import { Profile } from './components/Profile';
import { Toaster } from './components/ui/sonner';

export type UserProfile = {
  id: string;
  name: string;
  age: number;
  location: string;
  budget: number;
  avatar?: string;
  responses: Record<string, string>;
  matchScore?: number;
};

export type AppUser = {
  id: string;
  name: string;
  email: string;
  profile?: UserProfile;
  hasSubscription: boolean;
  chatCredits: number;
};

export type Message = {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Date;
};

type Page = 'home' | 'questionnaire' | 'matches' | 'chat' | 'pricing' | 'profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<UserProfile | null>(null);
  const [messages, setMessages] = useState<Record<string, Message[]>>({});

  // Initialize demo user
  useEffect(() => {
    const demoUser: AppUser = {
      id: 'user-1',
      name: 'You',
      email: 'you@example.com',
      hasSubscription: false,
      chatCredits: 1, // One free chat
    };
    setCurrentUser(demoUser);
  }, []);

  const handleQuestionnaireComplete = (profile: UserProfile) => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        profile,
      });
      setCurrentPage('matches');
    }
  };

  const handleMatchSelect = (match: UserProfile) => {
    setSelectedMatch(match);
    setCurrentPage('chat');
  };

  const handleSubscribe = () => {
    if (currentUser) {
      setCurrentUser({
        ...currentUser,
        hasSubscription: true,
        chatCredits: -1, // Unlimited
      });
      setCurrentPage('matches');
    }
  };

  const handleSendMessage = (receiverId: string, text: string) => {
    if (!currentUser) return;

    const chatKey = [currentUser.id, receiverId].sort().join('-');
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      receiverId,
      text,
      timestamp: new Date(),
    };

    setMessages((prev) => ({
      ...prev,
      [chatKey]: [...(prev[chatKey] || []), newMessage],
    }));

    // Deduct chat credit if needed
    if (currentUser.chatCredits > 0 && !currentUser.hasSubscription) {
      const chatHistory = messages[chatKey] || [];
      const userMessageCount = chatHistory.filter((m) => m.senderId === currentUser.id).length;
      
      if (userMessageCount === 0) {
        // This is the first message in this conversation, deduct credit
        setCurrentUser({
          ...currentUser,
          chatCredits: currentUser.chatCredits - 1,
        });
      }
    }
  };

  const getChatHistory = (userId: string) => {
    if (!currentUser) return [];
    const chatKey = [currentUser.id, userId].sort().join('-');
    return messages[chatKey] || [];
  };

  const canChat = (userId: string) => {
    if (!currentUser) return false;
    if (currentUser.hasSubscription) return true;
    
    const chatKey = [currentUser.id, userId].sort().join('-');
    const chatHistory = messages[chatKey] || [];
    const hasChattedBefore = chatHistory.length > 0;
    
    return currentUser.chatCredits > 0 || hasChattedBefore;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
              <span className="text-xl text-purple-600">MindMatch</span>
            </div>
            
            <div className="flex gap-4 items-center">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'home' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Home
              </button>
              {currentUser?.profile && (
                <>
                  <button
                    onClick={() => setCurrentPage('matches')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'matches' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Matches
                  </button>
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === 'profile' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Profile
                  </button>
                </>
              )}
              <button
                onClick={() => setCurrentPage('pricing')}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === 'pricing' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Pricing
              </button>
              {currentUser?.hasSubscription && (
                <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm">
                  Premium
                </span>
              )}
              {!currentUser?.hasSubscription && currentUser && (
                <span className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">
                  {currentUser.chatCredits} free chat{currentUser.chatCredits !== 1 ? 's' : ''} left
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        {currentPage === 'home' && (
          <Home onGetStarted={() => setCurrentPage('questionnaire')} />
        )}
        {currentPage === 'questionnaire' && (
          <Questionnaire onComplete={handleQuestionnaireComplete} />
        )}
        {currentPage === 'matches' && currentUser?.profile && (
          <Matches
            userProfile={currentUser.profile}
            onMatchSelect={handleMatchSelect}
          />
        )}
        {currentPage === 'chat' && selectedMatch && currentUser && (
          <Chat
            currentUser={currentUser}
            match={selectedMatch}
            messages={getChatHistory(selectedMatch.id)}
            onSendMessage={handleSendMessage}
            canChat={canChat(selectedMatch.id)}
            onUpgrade={() => setCurrentPage('pricing')}
          />
        )}
        {currentPage === 'pricing' && (
          <Pricing
            onSubscribe={handleSubscribe}
            hasSubscription={currentUser?.hasSubscription || false}
          />
        )}
        {currentPage === 'profile' && currentUser?.profile && (
          <Profile
            userProfile={currentUser.profile}
            onEditProfile={() => setCurrentPage('questionnaire')}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
}
