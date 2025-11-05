import { useState, useEffect } from 'react';
import { UserProfile } from '../App';
import { MatchCard } from './MatchCard';
import { Input } from './ui/input';
import { Slider } from './ui/slider';
import { Label } from './ui/label';
import { Search, SlidersHorizontal } from 'lucide-react';
import { Button } from './ui/button';

interface MatchesProps {
  userProfile: UserProfile;
  onMatchSelect: (match: UserProfile) => void;
}

// Mock data for potential matches
const generateMatches = (userProfile: UserProfile): UserProfile[] => {
  const mockMatches: UserProfile[] = [
    {
      id: 'match-1',
      name: 'Sarah Chen',
      age: 26,
      location: userProfile.location,
      budget: 850,
      responses: {
        cleanliness: 'Very clean - I clean daily and keep everything spotless',
        noise: 'Mostly quiet - Soft background noise is okay',
        schedule: 'Morning person - Awake by 8 AM, sleep by 11 PM',
        socializing: 'Occasionally - Once or twice a month',
        cooking: 'Often - 4-5 times a week',
        sharing: 'Comfortable - Kitchen and cleaning supplies',
        pets: 'Like pets - I enjoy having them around',
        smoking: 'Absolutely no smoking - I am strongly opposed',
      },
    },
    {
      id: 'match-2',
      name: 'Alex Kumar',
      age: 24,
      location: userProfile.location,
      budget: 900,
      responses: {
        cleanliness: 'Clean - I clean regularly',
        noise: 'Moderate - Normal conversation and activities',
        schedule: 'Flexible - No strict schedule',
        socializing: 'Regularly - Once a week',
        cooking: 'Sometimes - 2-3 times a week',
        sharing: 'Very comfortable - Most items are shareable',
        pets: 'Neutral - Pets are okay',
        smoking: 'I don\'t smoke but okay with outdoor smoking',
      },
    },
    {
      id: 'match-3',
      name: 'Emily Rodriguez',
      age: 28,
      location: userProfile.location,
      budget: 800,
      responses: {
        cleanliness: 'Very clean - I clean daily and keep everything spotless',
        noise: 'Very quiet - I need silence',
        schedule: 'Early bird - Awake by 6 AM, sleep by 10 PM',
        socializing: 'Rarely - Few times a year',
        cooking: 'Always - I cook every day',
        sharing: 'Comfortable - Kitchen and cleaning supplies',
        pets: 'Love pets - I have or want pets',
        smoking: 'Absolutely no smoking - I am strongly opposed',
      },
    },
    {
      id: 'match-4',
      name: 'Marcus Johnson',
      age: 27,
      location: userProfile.location,
      budget: 950,
      responses: {
        cleanliness: 'Clean - I clean regularly',
        noise: 'Active - Music and socializing is common',
        schedule: 'Night person - Awake by 10 AM, sleep by 1 AM',
        socializing: 'Frequently - Multiple times per week',
        cooking: 'Sometimes - 2-3 times a week',
        sharing: 'Very comfortable - Most items are shareable',
        pets: 'Like pets - I enjoy having them around',
        smoking: 'I smoke but only outdoors',
      },
    },
    {
      id: 'match-5',
      name: 'Lisa Thompson',
      age: 25,
      location: userProfile.location,
      budget: 825,
      responses: {
        cleanliness: 'Average - I keep things moderately clean',
        noise: 'Mostly quiet - Soft background noise is okay',
        schedule: 'Morning person - Awake by 8 AM, sleep by 11 PM',
        socializing: 'Occasionally - Once or twice a month',
        cooking: 'Often - 4-5 times a week',
        sharing: 'Comfortable - Kitchen and cleaning supplies',
        pets: 'Like pets - I enjoy having them around',
        smoking: 'Absolutely no smoking - I am strongly opposed',
      },
    },
    {
      id: 'match-6',
      name: 'David Park',
      age: 29,
      location: userProfile.location,
      budget: 875,
      responses: {
        cleanliness: 'Clean - I clean regularly',
        noise: 'Moderate - Normal conversation and activities',
        schedule: 'Flexible - No strict schedule',
        socializing: 'Regularly - Once a week',
        cooking: 'Sometimes - 2-3 times a week',
        sharing: 'Somewhat comfortable - Only basic items',
        pets: 'Neutral - Pets are okay',
        smoking: 'I don\'t smoke but okay with outdoor smoking',
      },
    },
  ];

  // Calculate match scores
  return mockMatches.map((match) => {
    const score = calculateMatchScore(userProfile, match);
    return { ...match, matchScore: score };
  }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
};

const calculateMatchScore = (user: UserProfile, match: UserProfile): number => {
  let score = 0;
  let totalQuestions = 0;

  // Compare responses
  Object.keys(user.responses).forEach((key) => {
    if (match.responses[key]) {
      totalQuestions++;
      if (user.responses[key] === match.responses[key]) {
        score += 100;
      } else {
        // Partial scoring based on similarity
        const userIndex = getResponseIndex(user.responses[key]);
        const matchIndex = getResponseIndex(match.responses[key]);
        const difference = Math.abs(userIndex - matchIndex);
        score += Math.max(0, 100 - (difference * 25));
      }
    }
  });

  // Budget compatibility
  const budgetDiff = Math.abs(user.budget - match.budget);
  const budgetScore = Math.max(0, 100 - (budgetDiff / 10));
  score += budgetScore;
  totalQuestions++;

  return Math.round(score / totalQuestions);
};

const getResponseIndex = (response: string): number => {
  // Simple index extraction for similarity comparison
  const responses = [
    'never', 'rarely', 'sometimes', 'often', 'always',
    'very messy', 'somewhat messy', 'average', 'clean', 'very clean',
    'very quiet', 'mostly quiet', 'moderate', 'active', 'very active',
  ];
  
  const lowerResponse = response.toLowerCase();
  for (let i = 0; i < responses.length; i++) {
    if (lowerResponse.includes(responses[i])) {
      return i % 5;
    }
  }
  return 2; // Default to middle
};

export function Matches({ userProfile, onMatchSelect }: MatchesProps) {
  const [matches, setMatches] = useState<UserProfile[]>([]);
  const [filteredMatches, setFilteredMatches] = useState<UserProfile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [minScore, setMinScore] = useState([0]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const generatedMatches = generateMatches(userProfile);
    setMatches(generatedMatches);
    setFilteredMatches(generatedMatches);
  }, [userProfile]);

  useEffect(() => {
    let filtered = matches;

    if (searchTerm) {
      filtered = filtered.filter((match) =>
        match.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    filtered = filtered.filter((match) => (match.matchScore || 0) >= minScore[0]);

    setFilteredMatches(filtered);
  }, [searchTerm, minScore, matches]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl mb-2">Your Matches</h1>
        <p className="text-gray-600">
          Found {filteredMatches.length} compatible roommate{filteredMatches.length !== 1 ? 's' : ''} based on your preferences
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name..."
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t">
            <div className="space-y-2">
              <Label>Minimum Match Score: {minScore[0]}%</Label>
              <Slider
                min={0}
                max={100}
                step={5}
                value={minScore}
                onValueChange={setMinScore}
              />
            </div>
          </div>
        )}
      </div>

      {/* Matches Grid */}
      {filteredMatches.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">No matches found. Try adjusting your filters.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMatches.map((match) => (
            <MatchCard
              key={match.id}
              match={match}
              onSelect={() => onMatchSelect(match)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
