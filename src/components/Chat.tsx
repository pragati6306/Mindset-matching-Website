import { useState, useEffect, useRef } from 'react';
import { AppUser, UserProfile, Message } from '../App';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Send, Lock, ArrowLeft, Sparkles } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';
import { toast } from 'sonner@2.0.3';

interface ChatProps {
  currentUser: AppUser;
  match: UserProfile;
  messages: Message[];
  onSendMessage: (receiverId: string, text: string) => void;
  canChat: boolean;
  onUpgrade: () => void;
}

export function Chat({
  currentUser,
  match,
  messages,
  onSendMessage,
  canChat,
  onUpgrade,
}: ChatProps) {
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [autoResponses, setAutoResponses] = useState<Message[]>([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, autoResponses]);

  // Simulate auto-responses from the match
  useEffect(() => {
    const userMessages = messages.filter((m) => m.senderId === currentUser.id);
    const matchMessages = autoResponses.filter((m) => m.senderId === match.id);

    if (userMessages.length > matchMessages.length) {
      const timeout = setTimeout(() => {
        const responses = [
          'That sounds great! Tell me more about yourself.',
          'I completely agree! We seem to have similar preferences.',
          'That\'s interesting! I\'d love to discuss this further.',
          'Absolutely! I think we could be great roommates.',
          'I appreciate you reaching out. Let\'s chat more!',
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];

        const newResponse: Message = {
          id: `auto-${Date.now()}`,
          senderId: match.id,
          receiverId: currentUser.id,
          text: randomResponse,
          timestamp: new Date(),
        };

        setAutoResponses([...autoResponses, newResponse]);
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [messages, currentUser.id, match.id, autoResponses]);

  const allMessages = [...messages, ...autoResponses].sort(
    (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
  );

  const handleSend = () => {
    if (!messageText.trim()) return;

    if (!canChat) {
      toast.error('You need a subscription to continue chatting');
      return;
    }

    onSendMessage(match.id, messageText);
    setMessageText('');
    
    if (!currentUser.hasSubscription && currentUser.chatCredits === 1) {
      toast.info('This is your free chat! Subscribe for unlimited messaging.');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const isFirstChat = allMessages.length === 0;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-t-lg shadow-sm border border-b-0 border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
              {match.name.charAt(0)}
            </div>
            <div>
              <h2 className="text-xl">{match.name}</h2>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-700 border-green-200 border">
                  {match.matchScore}% Match
                </Badge>
                {!currentUser.hasSubscription && (
                  <Badge variant="outline" className="text-gray-600">
                    {currentUser.chatCredits > 0 ? `${currentUser.chatCredits} free chat left` : 'Subscribe to chat'}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <Card className="rounded-none border-x min-h-[500px] max-h-[500px] overflow-y-auto p-6 bg-gray-50">
        {isFirstChat && canChat && (
          <Alert className="mb-4 bg-blue-50 border-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Start your first conversation with {match.name}! This is your free chat.
              {!currentUser.hasSubscription && ' Subscribe for unlimited chats.'}
            </AlertDescription>
          </Alert>
        )}

        {!canChat && (
          <Alert className="mb-4 bg-amber-50 border-amber-200">
            <Lock className="w-4 h-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              You've used your free chat. Subscribe to continue messaging your matches.
              <Button
                onClick={onUpgrade}
                className="ml-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                size="sm"
              >
                View Plans
              </Button>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          {allMessages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isCurrentUser
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                      : 'bg-white border border-gray-200 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isCurrentUser ? 'text-purple-100' : 'text-gray-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </Card>

      {/* Input */}
      <div className="bg-white rounded-b-lg shadow-sm border border-t-0 border-gray-200 p-4">
        <div className="flex gap-2">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={canChat ? 'Type your message...' : 'Subscribe to send messages'}
            disabled={!canChat}
            className="flex-1"
          />
          <Button
            onClick={handleSend}
            disabled={!canChat || !messageText.trim()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        {!canChat && (
          <p className="text-sm text-gray-500 mt-2">
            You need an active subscription to continue chatting.{' '}
            <button
              onClick={onUpgrade}
              className="text-purple-600 hover:underline"
            >
              Upgrade now
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
