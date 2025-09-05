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
import { createUser, getAuthUserId } from '../lib/database';

export default function Onboarding() {
  // Wellness assessment questions
  const wellnessQuestions = [
    {
      key: 'phq9Score',
      question: 'How often have you felt down or hopeless recently?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 5, label: 'Several days' },
        { value: 10, label: 'More than half the days' },
        { value: 15, label: 'Nearly every day' },
      ],
    },
    {
      key: 'gad7Score',
      question: 'How often do you feel anxious or worried?',
      options: [
        { value: 0, label: 'Not at all' },
        { value: 5, label: 'Several days' },
        { value: 10, label: 'More than half the days' },
        { value: 15, label: 'Nearly every day' },
      ],
    },
    // Add more questions here as needed
  ];
  const [wellnessStep, setWellnessStep] = useState(0);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    workingHours: '',
    freeTimeFrom: '',
    freeTimeTo: '',
    emergencyContact: '',
    emergencyName: '',
    phq9Score: 0,
    gad7Score: 0,
    ucla3Score: 0,
    safetyRisk: false
  });
  const [nameError, setNameError] = useState('');
  const [workingHoursError, setWorkingHoursError] = useState('');
  const [freeTimeError, setFreeTimeError] = useState('');
  const [emergencyNameError, setEmergencyNameError] = useState('');
  const [emergencyContactError, setEmergencyContactError] = useState('');
  const [createdUserId, setCreatedUserId] = useState<string | null>(null);

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
              i <= step ? 'bg-blue-600' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    // create user row (will try to use auth ID if present)
    const user = await createUser({ name: formData.name, role: formData.role, free_time: formData.freeTimeFrom + '-' + formData.freeTimeTo });
    if (user?.id) {
      setCreatedUserId(user.id);
      // store locally for quick access in other pages
      localStorage.setItem('app_user_id', user.id);
      console.log('User row created:', user);
    }
  }

  return (
    <Layout background="gradient">
      <Container className="max-w-lg mx-auto">
        <Card className="p-8 mt-10 mb-8 shadow-md border-0 rounded-2xl bg-white">
          <StepIndicator />
          <h2 className="text-2xl font-bold mb-2 text-center text-blue-700">Onboarding</h2>
          <p className="text-gray-500 mb-6 text-center">Let's get to know you and personalize your experience.</p>
          
          {step === 1 && (
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
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="workingHours">How many hours do you work/study daily?</Label>
                <Input
                  id="workingHours"
                  type="number"
                  min={1}
                  max={12}
                  value={formData.workingHours}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (Number(value) >= 1 && Number(value) <= 12)) {
                      setFormData({ ...formData, workingHours: value });
                      setWorkingHoursError('');
                    } else {
                      setWorkingHoursError('Working hours must be between 1 and 12');
                    }
                  }}
                  placeholder="e.g., 8"
                  className="mt-2"
                />
                {workingHoursError && (
                  <span className="text-destructive text-sm">{workingHoursError}</span>
                )}
              </div>
              <div>
                <Label>When are your typical free time slots?</Label>
                <div className="flex gap-4 mt-2">
                  <div>
                    <Label htmlFor="freeTimeFrom">From</Label>
                    <Input
                      id="freeTimeFrom"
                      type="time"
                      value={formData.freeTimeFrom}
                      onChange={(e) => {
                        setFormData({ ...formData, freeTimeFrom: e.target.value });
                        setFreeTimeError('');
                      }}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="freeTimeTo">To</Label>
                    <Input
                      id="freeTimeTo"
                      type="time"
                      value={formData.freeTimeTo}
                      onChange={(e) => {
                        setFormData({ ...formData, freeTimeTo: e.target.value });
                        setFreeTimeError('');
                      }}
                      className="mt-1"
                    />
                  </div>
                </div>
                {freeTimeError && (
                  <span className="text-destructive text-sm">{freeTimeError}</span>
                )}
              </div>
            </div>
<<<<<<< HEAD
            
            <WellnessButton 
              onClick={() => {
                // Validate that from < to
                if (formData.freeTimeFrom && formData.freeTimeTo && formData.freeTimeFrom >= formData.freeTimeTo) {
                  setFreeTimeError('Start time must be before end time');
                  return;
                }
                setFreeTimeError('');
                handleNext();
              }}
              disabled={
                !formData.workingHours ||
                !formData.freeTimeFrom ||
                !formData.freeTimeTo
              }
              className="w-full mt-8"
            >
              Continue
            </WellnessButton>
          </Card>
        )}
=======
          )}
>>>>>>> main

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="emergencyName">Contact person's name</Label>
                <Input
                  id="emergencyName"
                  type="text"
                  value={formData.emergencyName}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z ]*$/.test(value)) {
                      setFormData({ ...formData, emergencyName: value });
                      setEmergencyNameError('');
                    } else {
                      setEmergencyNameError('Name must contain only letters and spaces');
                    }
                  }}
                  placeholder="Family member or close friend"
                  className="mt-2"
                />
                {emergencyNameError && (
                  <span className="text-destructive text-sm">{emergencyNameError}</span>
                )}
              </div>
              <div>
                <Label htmlFor="emergencyContact">Their phone number</Label>
                <Input
                  id="emergencyContact"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={formData.emergencyContact}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setFormData({ ...formData, emergencyContact: value });
                      setEmergencyContactError('');
                    } else {
                      setEmergencyContactError('Phone number must contain only numbers');
                    }
                  }}
                  placeholder="Phone number"
                  className="mt-2"
                />
                {emergencyContactError && (
                  <span className="text-destructive text-sm">{emergencyContactError}</span>
                )}
              </div>
              
              <div className="bg-muted/30 p-4 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <Shield className="w-4 h-4 inline mr-2" />
                  This contact will only be reached in emergency situations or if we detect you may need urgent support.
                </p>
              </div>
            </div>
          )}

<<<<<<< HEAD
        {step === 4 && (
          <Card className="p-8 shadow-soft border-0">
            <div className="text-center mb-8">
              <Shield className="w-16 h-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Wellness Assessment</h2>
              <p className="text-muted-foreground">Quick questions to understand how you're feeling</p>
            </div>
            <div className="space-y-6">
              <div className="bg-gradient-safe p-6 rounded-xl">
                <h3 className="font-semibold mb-4">{wellnessQuestions[wellnessStep].question}</h3>
                <RadioGroup
                  value={formData[wellnessQuestions[wellnessStep].key]?.toString() || ''}
                  onValueChange={(value) => {
                    setFormData({
                      ...formData,
                      [wellnessQuestions[wellnessStep].key]: parseInt(value),
                    });
                  }}
                >
                  {wellnessQuestions[wellnessStep].options.map((opt) => (
                    <div className="flex items-center space-x-2" key={opt.value}>
                      <RadioGroupItem value={opt.value.toString()} id={wellnessQuestions[wellnessStep].key + opt.value} />
                      <Label htmlFor={wellnessQuestions[wellnessStep].key + opt.value}>{opt.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="flex justify-between mt-8">
              {wellnessStep > 0 && (
                <WellnessButton onClick={() => setWellnessStep(wellnessStep - 1)}>
                  Previous
                </WellnessButton>
              )}
              {wellnessStep < wellnessQuestions.length - 1 ? (
                <WellnessButton
                  onClick={() => setWellnessStep(wellnessStep + 1)}
                  disabled={formData[wellnessQuestions[wellnessStep].key] === undefined || formData[wellnessQuestions[wellnessStep].key] === ''}
                >
                  Next
                </WellnessButton>
              ) : (
                <WellnessButton
                  onClick={handleNext}
                  disabled={formData[wellnessQuestions[wellnessStep].key] === undefined || formData[wellnessQuestions[wellnessStep].key] === ''}
                >
                  Complete Assessment
                </WellnessButton>
              )}
            </div>
          </Card>
        )}
=======
          {step === 4 && (
            <div className="space-y-6">
              <div className="rounded-2xl p-6 mb-4 bg-blue-50">
                <Label className="font-semibold mb-2 block">How often have you felt down or hopeless recently?</Label>
                <RadioGroup
                  value={formData.phq9Score.toString()}
                  onValueChange={val => setFormData(f => ({ ...f, phq9Score: Number(val) }))}
                >
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="0" id="phq9-0" /><Label htmlFor="phq9-0">Not at all</Label></div>
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="1" id="phq9-1" /><Label htmlFor="phq9-1">Several days</Label></div>
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="2" id="phq9-2" /><Label htmlFor="phq9-2">More than half the days</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="3" id="phq9-3" /><Label htmlFor="phq9-3">Nearly every day</Label></div>
                </RadioGroup>
              </div>
              <div className="rounded-2xl p-6 bg-blue-50">
                <Label className="font-semibold mb-2 block">How often do you feel anxious or worried?</Label>
                <RadioGroup
                  value={formData.gad7Score.toString()}
                  onValueChange={val => setFormData(f => ({ ...f, gad7Score: Number(val) }))}
                >
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="0" id="gad7-0" /><Label htmlFor="gad7-0">Not at all</Label></div>
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="1" id="gad7-1" /><Label htmlFor="gad7-1">Several days</Label></div>
                  <div className="flex items-center gap-2 mb-1"><RadioGroupItem value="2" id="gad7-2" /><Label htmlFor="gad7-2">More than half the days</Label></div>
                  <div className="flex items-center gap-2"><RadioGroupItem value="3" id="gad7-3" /><Label htmlFor="gad7-3">Nearly every day</Label></div>
                </RadioGroup>
              </div>
            </div>
          )}
          
          <div className="flex justify-between mt-8">
            {step > 1 && (
              <WellnessButton variant="outline" className="border-blue-400 text-blue-700 hover:bg-blue-50 focus:ring-2 focus:ring-blue-300" onClick={() => setStep(step - 1)}>
                Back
              </WellnessButton>
            )}
            <WellnessButton className="bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-400 ml-auto" onClick={handleNext}>
              {step < 4 ? 'Next' : 'Finish'}
            </WellnessButton>
          </div>
        </Card>
>>>>>>> main
      </Container>
    </Layout>
  );
}