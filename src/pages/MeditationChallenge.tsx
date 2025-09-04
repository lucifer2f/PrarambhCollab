import React, { useState, useEffect } from 'react';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Pause, RotateCcw, CheckCircle } from 'lucide-react';

export default function MeditationChallenge() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isCompleted, setIsCompleted] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const totalTime = 300;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            setIsCompleted(true);
            setIsActive(false);
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    } else if (timeLeft === 0) {
      setIsCompleted(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const startSession = () => {
    setSessionStarted(true);
    setIsActive(true);
  };

  const pauseSession = () => {
    setIsActive(false);
  };

  const resetSession = () => {
    setIsActive(false);
    setTimeLeft(300);
    setIsCompleted(false);
    setSessionStarted(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGuidanceText = () => {
    const remainingMinutes = Math.ceil(timeLeft / 60);
    
    if (!sessionStarted) {
      return "Ready to begin your mindfulness journey? This 5-minute session will help you center yourself and find inner calm.";
    }
    
    if (isCompleted) {
      return "Beautiful work! You've completed your meditation session. Take a moment to notice how you feel.";
    }

    if (remainingMinutes === 5) {
      return "Close your eyes and take a deep breath. Let your body relax and your mind settle.";
    } else if (remainingMinutes === 4) {
      return "Focus on your breath. Notice the air flowing in and out of your body naturally.";
    } else if (remainingMinutes === 3) {
      return "If your mind wanders, that's perfectly normal. Gently bring your attention back to your breath.";
    } else if (remainingMinutes === 2) {
      return "Feel your body becoming more relaxed with each breath. You're doing wonderfully.";
    } else {
      return "Almost there. Stay present with this moment and continue breathing mindfully.";
    }
  };

  return (
    <Layout background="gradient" className="min-h-screen">
      <Container className="max-w-lg">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <WellnessButton 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-5 h-5" />
          </WellnessButton>
          <h1 className="text-2xl font-bold">Mindful Breathing</h1>
        </div>

        {/* Main Session Card */}
        <Card className="p-8 text-center shadow-soft border-0 mb-6">
          {/* Timer Circle */}
          <div className="relative w-48 h-48 mx-auto mb-8">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                fill="none"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="hsl(var(--wellness-calm))"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 45}`}
                strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
                className="transition-all duration-1000 ease-in-out"
              />
            </svg>
            
            {/* Timer Display */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                {isCompleted ? (
                  <CheckCircle className="w-12 h-12 text-wellness-safe mx-auto" />
                ) : (
                  <span className="text-3xl font-mono font-bold text-primary">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Guidance Text */}
          <div className="mb-8">
            <p className="text-muted-foreground leading-relaxed max-w-sm mx-auto">
              {getGuidanceText()}
            </p>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            {!sessionStarted && !isCompleted && (
              <WellnessButton onClick={startSession} size="lg">
                <Play className="w-5 h-5 mr-2" />
                Begin Session
              </WellnessButton>
            )}

            {sessionStarted && !isCompleted && (
              <>
                <WellnessButton
                  variant={isActive ? "outline" : "primary"}
                  onClick={isActive ? pauseSession : () => setIsActive(true)}
                  size="lg"
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </WellnessButton>
                
                <WellnessButton variant="ghost" onClick={resetSession}>
                  <RotateCcw className="w-5 h-5" />
                </WellnessButton>
              </>
            )}

            {isCompleted && (
              <div className="space-y-4">
                <WellnessButton variant="primary" size="lg" onClick={() => navigate('/dashboard')}>
                  Continue to Dashboard
                </WellnessButton>
                <WellnessButton variant="outline" onClick={resetSession}>
                  Try Again
                </WellnessButton>
              </div>
            )}
          </div>
        </Card>

        {/* Session Info */}
        {sessionStarted && !isCompleted && (
          <Card className="p-4 shadow-gentle border-0 bg-wellness-calm/5">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                🔒 <strong>Focus Mode Active</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Stay present. Exiting early will mark this session as incomplete.
              </p>
            </div>
          </Card>
        )}

        {/* Completion Card */}
        {isCompleted && (
          <Card className="p-6 shadow-soft border-0 bg-gradient-safe">
            <div className="text-center text-white">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Well Done! 🌟</h2>
              <p className="text-white/90 text-sm mb-4">
                You've successfully completed your 5-minute mindfulness session. 
                This dedication to your mental wellness is inspiring!
              </p>
              <p className="text-xs text-white/80">
                +1 Mindfulness session logged • Keep up the great work!
              </p>
            </div>
          </Card>
        )}
      </Container>
    </Layout>
  );
}