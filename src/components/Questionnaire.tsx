import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Slider } from './ui/slider';
import { Progress } from './ui/progress';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { UserProfile } from '../App';

const questions = [
  {
    id: 'cleanliness',
    question: 'How would you describe your cleanliness habits?',
    type: 'radio',
    options: [
      'Very messy - I rarely clean',
      'Somewhat messy - I clean occasionally',
      'Average - I keep things moderately clean',
      'Clean - I clean regularly',
      'Very clean - I clean daily and keep everything spotless',
    ],
  },
  {
    id: 'noise',
    question: 'What is your preferred noise level at home?',
    type: 'radio',
    options: [
      'Very quiet - I need silence',
      'Mostly quiet - Soft background noise is okay',
      'Moderate - Normal conversation and activities',
      'Active - Music and socializing is common',
      'Very active - Frequent guests and parties',
    ],
  },
  {
    id: 'schedule',
    question: 'What is your typical daily schedule?',
    type: 'radio',
    options: [
      'Early bird - Awake by 6 AM, sleep by 10 PM',
      'Morning person - Awake by 8 AM, sleep by 11 PM',
      'Flexible - No strict schedule',
      'Night person - Awake by 10 AM, sleep by 1 AM',
      'Night owl - Awake past noon, sleep after 2 AM',
    ],
  },
  {
    id: 'socializing',
    question: 'How often do you have guests over?',
    type: 'radio',
    options: [
      'Never - I prefer privacy',
      'Rarely - Few times a year',
      'Occasionally - Once or twice a month',
      'Regularly - Once a week',
      'Frequently - Multiple times per week',
    ],
  },
  {
    id: 'cooking',
    question: 'How often do you cook at home?',
    type: 'radio',
    options: [
      'Never - I always eat out',
      'Rarely - Few times a month',
      'Sometimes - 2-3 times a week',
      'Often - 4-5 times a week',
      'Always - I cook every day',
    ],
  },
  {
    id: 'sharing',
    question: 'How comfortable are you with sharing household items?',
    type: 'radio',
    options: [
      'Not comfortable - I prefer separate everything',
      'Somewhat comfortable - Only basic items',
      'Comfortable - Kitchen and cleaning supplies',
      'Very comfortable - Most items are shareable',
      'Completely comfortable - Share everything',
    ],
  },
  {
    id: 'pets',
    question: 'What is your stance on pets?',
    type: 'radio',
    options: [
      'No pets - I am allergic or uncomfortable',
      'Not preferred - I would rather not have pets',
      'Neutral - Pets are okay',
      'Like pets - I enjoy having them around',
      'Love pets - I have or want pets',
    ],
  },
  {
    id: 'smoking',
    question: 'What is your smoking preference?',
    type: 'radio',
    options: [
      'I smoke indoors regularly',
      'I smoke but only outdoors',
      'I occasionally smoke',
      'I don\'t smoke but okay with outdoor smoking',
      'Absolutely no smoking - I am strongly opposed',
    ],
  },
];

interface QuestionnaireProps {
  onComplete: (profile: UserProfile) => void;
}

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [name, setName] = useState('');
  const [age, setAge] = useState(25);
  const [location, setLocation] = useState('');
  const [budget, setBudget] = useState([800]);

  const totalSteps = questions.length + 1; // +1 for basic info
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete questionnaire
      const profile: UserProfile = {
        id: `user-${Date.now()}`,
        name,
        age,
        location,
        budget: budget[0],
        responses,
      };
      onComplete(profile);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleResponseChange = (questionId: string, value: string) => {
    setResponses({
      ...responses,
      [questionId]: value,
    });
  };

  const canProceed = () => {
    if (currentStep === 0) {
      return name.trim() !== '' && location.trim() !== '';
    }
    const question = questions[currentStep - 1];
    return question && responses[question.id];
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl mb-2 text-center">Find Your Perfect Match</h1>
        <p className="text-center text-gray-600 mb-6">
          Answer these questions to help us find compatible roommates for you
        </p>
        <Progress value={progress} className="h-2" />
        <p className="text-center text-sm text-gray-500 mt-2">
          Step {currentStep + 1} of {totalSteps}
        </p>
      </div>

      <Card className="p-8">
        {currentStep === 0 ? (
          <div className="space-y-6">
            <h2 className="text-2xl mb-6">Basic Information</h2>
            
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="age">Age: {age}</Label>
              <Slider
                id="age"
                min={18}
                max={65}
                step={1}
                value={[age]}
                onValueChange={(value) => setAge(value[0])}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, State"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="budget">Monthly Budget: ${budget[0]}</Label>
              <Slider
                id="budget"
                min={300}
                max={3000}
                step={50}
                value={budget}
                onValueChange={setBudget}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {questions[currentStep - 1] && (
              <>
                <h2 className="text-2xl mb-6">{questions[currentStep - 1].question}</h2>
                
                <RadioGroup
                  value={responses[questions[currentStep - 1].id] || ''}
                  onValueChange={(value) =>
                    handleResponseChange(questions[currentStep - 1].id, value)
                  }
                  className="space-y-3"
                >
                  {questions[currentStep - 1].options.map((option, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="flex-1 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8 pt-6 border-t">
          <Button
            onClick={handleBack}
            variant="outline"
            disabled={currentStep === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            {currentStep === totalSteps - 1 ? 'Complete' : 'Next'}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}
