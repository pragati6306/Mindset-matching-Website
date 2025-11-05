import { UserProfile } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MessageCircle, MapPin, DollarSign } from 'lucide-react';

interface MatchCardProps {
  match: UserProfile;
  onSelect: () => void;
}

export function MatchCard({ match, onSelect }: MatchCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-700 border-green-200';
    if (score >= 60) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (score >= 40) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Low Match';
  };

  const score = match.matchScore || 0;

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
            {match.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl">{match.name}</h3>
            <p className="text-gray-600">{match.age} years old</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{match.location}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <DollarSign className="w-4 h-4" />
          <span>${match.budget}/month budget</span>
        </div>
      </div>

      <div className="mb-4">
        <Badge className={`${getScoreColor(score)} border`}>
          {score}% Match - {getScoreLabel(score)}
        </Badge>
      </div>

      <div className="mb-4 space-y-2">
        <p className="text-sm">
          <span className="text-gray-500">Cleanliness:</span>{' '}
          {match.responses.cleanliness?.split(' - ')[0] || 'N/A'}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Schedule:</span>{' '}
          {match.responses.schedule?.split(' - ')[0] || 'N/A'}
        </p>
        <p className="text-sm">
          <span className="text-gray-500">Noise Level:</span>{' '}
          {match.responses.noise?.split(' - ')[0] || 'N/A'}
        </p>
      </div>

      <Button
        onClick={onSelect}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Start Chat
      </Button>
    </Card>
  );
}
