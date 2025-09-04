import React, { useState } from 'react';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { Heart, Clock, Shield, Phone } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    workingHours: '',
    freeTime: '',
    emergencyContact: '',
    emergencyName: '',
    phq9Score: 0,
    gad7Score: 0,
    ucla3Score: 0,
    safetyRisk: false
  });
  const [nameError, setNameError] = useState('');

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Calculate risk level based on scores
      const riskLevel = calculateRiskLevel();
      navigate('/dashboard', { state: { riskLevel, formData } });
    }
  };

  const calculateRiskLevel = () => {
    const { phq9Score, gad7Score, safetyRisk } = formData;
    if (safetyRisk) return 5;
    if (phq9Score >= 20 || gad7Score >= 15) return 4;
    if (phq9Score >= 15 || gad7Score >= 10) return 3;
    if (phq9Score >= 5 || gad7Score >= 5) return 2;
    return 1;
  };

  const StepIndicator = () => (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all ${
              i <= step ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Layout background="gradient">
      <Container>
        <StepIndicator />
        
        {step === 1 && (
          <Card className="p-8 shadow-soft border-0">
            <div className="text-center mb-8">
              <Heart className="w-16 h-16 text-primary mx-auto mb-4" />
              <h1 className="text-3xl font-bold mb-2">Welcome to MindPal</h1>
              <p className="text-muted-foreground">Let's get to know you better so we can provide personalized support</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">What's your name?</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow letters and spaces
                    if (/^[a-zA-Z ]*$/.test(value)) {
                      setFormData({ ...formData, name: value });
                      setNameError('');
                    } else {
                      setNameError('Name must contain only letters and spaces');
                    }
                  }}
                  placeholder="Enter your name"
                  className="mt-2"
                />
                {nameError && (
                  <span className="text-destructive text-sm">{nameError}</span>
                )}
              </div>
              
              <div>
                <Label>Are you a...</Label>
                <RadioGroup
                  value={formData.role}
                  onValueChange={(value) => setFormData({...formData, role: value})}
                  className="mt-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="professional" id="professional" />
                    <Label htmlFor="professional">Working Professional</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <WellnessButton 
              onClick={handleNext}
              disabled={!formData.name || !formData.role}
              className="w-full mt-8"
            >
              Continue
            </WellnessButton>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 shadow-soft border-0">
            <div className="text-center mb-8">
              <Clock className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your Schedule</h2>
              <p className="text-muted-foreground">Help us understand your daily routine</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="workingHours">How many hours do you work/study daily?</Label>
                <Input
                  id="workingHours"
                  type="number"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                  placeholder="e.g., 8"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="freeTime">When are your typical free time slots?</Label>
                <Textarea
                  id="freeTime"
                  value={formData.freeTime}
                  onChange={(e) => setFormData({...formData, freeTime: e.target.value})}
                  placeholder="e.g., Morning 7-9 AM, Evening 6-8 PM"
                  className="mt-2"
                />
              </div>
            </div>
            
            <WellnessButton 
              onClick={handleNext}
              disabled={!formData.workingHours || !formData.freeTime}
              className="w-full mt-8"
            >
              Continue
            </WellnessButton>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 shadow-soft border-0">
            <div className="text-center mb-8">
              <Phone className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Emergency Contact</h2>
              <p className="text-muted-foreground">Someone we can reach if you need urgent support</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label htmlFor="emergencyName">Contact person's name</Label>
                <Input
                  id="emergencyName"
                  value={formData.emergencyName}
                  onChange={(e) => setFormData({...formData, emergencyName: e.target.value})}
                  placeholder="Family member or close friend"
                  className="mt-2"
                />
              </div>
              
              <div>
                <Label htmlFor="emergencyContact">Their phone number</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  value={formData.emergencyContact}
                  onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  className="mt-2"
                />
              </div>
              
              <div className="bg-muted/30 p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 inline mr-2" />
                  This contact will only be reached in emergency situations or if we detect you may need urgent support.
                </p>
              </div>
            </div>
            
            <WellnessButton 
              onClick={handleNext}
              disabled={!formData.emergencyName || !formData.emergencyContact}
              className="w-full mt-8"
            >
              Continue
            </WellnessButton>
          </Card>
        )}

        {step === 4 && (
          <Card className="p-8 shadow-soft border-0">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Wellness Assessment</h2>
              <p className="text-muted-foreground">Quick questions to understand how you're feeling</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-safe p-6 rounded-xl">
                <h3 className="font-semibold mb-4">How often have you felt down or hopeless recently?</h3>
                <RadioGroup
                  value={formData.phq9Score.toString()}
                  onValueChange={(value) => setFormData({...formData, phq9Score: parseInt(value)})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="phq0" />
                    <Label htmlFor="phq0">Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="phq5" />
                    <Label htmlFor="phq5">Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="phq10" />
                    <Label htmlFor="phq10">More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="phq15" />
                    <Label htmlFor="phq15">Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="bg-gradient-safe p-6 rounded-xl">
                <h3 className="font-semibold mb-4">How often do you feel anxious or worried?</h3>
                <RadioGroup
                  value={formData.gad7Score.toString()}
                  onValueChange={(value) => setFormData({...formData, gad7Score: parseInt(value)})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="gad0" />
                    <Label htmlFor="gad0">Not at all</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="5" id="gad5" />
                    <Label htmlFor="gad5">Several days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="10" id="gad10" />
                    <Label htmlFor="gad10">More than half the days</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="15" id="gad15" />
                    <Label htmlFor="gad15">Nearly every day</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <WellnessButton 
              onClick={handleNext}
              className="w-full mt-8"
            >
              Complete Assessment
            </WellnessButton>
          </Card>
        )}
      </Container>
    </Layout>
  );
}