import { UserProfile } from '../App';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Edit, MapPin, DollarSign, User, Calendar } from 'lucide-react';

interface ProfileProps {
  userProfile: UserProfile;
  onEditProfile: () => void;
}

export function Profile({ userProfile, onEditProfile }: ProfileProps) {
  const responses = userProfile.responses;

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl">Your Profile</h1>
        <Button
          onClick={onEditProfile}
          variant="outline"
          className="gap-2"
        >
          <Edit className="w-4 h-4" />
          Edit Profile
        </Button>
      </div>

      <div className="grid gap-6">
        {/* Basic Info */}
        <Card className="p-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-4xl">
              {userProfile.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="text-3xl mb-4">{userProfile.name}</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>{userProfile.age} years old</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-5 h-5" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <DollarSign className="w-5 h-5" />
                  <span>${userProfile.budget}/month budget</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Preferences */}
        <Card className="p-6">
          <h2 className="text-2xl mb-6">Your Preferences</h2>
          <div className="space-y-6">
            {responses.cleanliness && (
              <div>
                <h3 className="mb-2 text-gray-600">Cleanliness</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.cleanliness}
                </Badge>
              </div>
            )}

            {responses.noise && (
              <div>
                <h3 className="mb-2 text-gray-600">Noise Preference</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.noise}
                </Badge>
              </div>
            )}

            {responses.schedule && (
              <div>
                <h3 className="mb-2 text-gray-600">Daily Schedule</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.schedule}
                </Badge>
              </div>
            )}

            {responses.socializing && (
              <div>
                <h3 className="mb-2 text-gray-600">Guest Frequency</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.socializing}
                </Badge>
              </div>
            )}

            {responses.cooking && (
              <div>
                <h3 className="mb-2 text-gray-600">Cooking Habits</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.cooking}
                </Badge>
              </div>
            )}

            {responses.sharing && (
              <div>
                <h3 className="mb-2 text-gray-600">Sharing Preference</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.sharing}
                </Badge>
              </div>
            )}

            {responses.pets && (
              <div>
                <h3 className="mb-2 text-gray-600">Pet Preference</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.pets}
                </Badge>
              </div>
            )}

            {responses.smoking && (
              <div>
                <h3 className="mb-2 text-gray-600">Smoking Preference</h3>
                <Badge variant="outline" className="px-4 py-2">
                  {responses.smoking}
                </Badge>
              </div>
            )}
          </div>
        </Card>

        {/* Tips */}
        <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
          <h2 className="text-2xl mb-4">Profile Tips</h2>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Answer all questions honestly to get the best matches</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Update your profile regularly to reflect any changes in preferences</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>More detailed responses lead to better compatibility scores</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-600 mt-1">•</span>
              <span>Consider upgrading to Premium for unlimited chats with matches</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
