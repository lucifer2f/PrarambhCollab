import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { RiskLevel, RiskLevelType } from '@/components/RiskLevel';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  MessageCircle, 
  Brain, 
  BookOpen, 
  Calendar,
  Bell,
  Users,
  Activity
} from 'lucide-react';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [riskLevel, setRiskLevel] = useState<RiskLevelType>(1);
  const [userData, setUserData] = useState<any>({});
  const [dailyProgress, setDailyProgress] = useState(65);

  useEffect(() => {
    if (location.state) {
      setRiskLevel(location.state.riskLevel);
      setUserData(location.state.formData);
    }
  }, [location.state]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const getTodaysTasks = () => {
    return [
      { id: 1, title: '5-minute breathing exercise', completed: true, type: 'meditation' },
      { id: 2, title: 'Mood check-in', completed: true, type: 'mood' },
      { id: 3, title: 'Chat with MindPal', completed: false, type: 'chat' },
      { id: 4, title: 'Evening reflection', completed: false, type: 'journal' },
    ];
  };

  return (
    <Layout background="gradient">
      <Container className="max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {getWelcomeMessage()}, {userData.name || 'Friend'}! 👋
          </h1>
          <p className="text-muted-foreground">Let's make today a good day for your mental wellness</p>
        </div>

        {/* Current Risk Level */}
        <div className="mb-8">
          <RiskLevel level={riskLevel} showDescription className="shadow-gentle" />
        </div>

        {/* Daily Progress */}
        <Card className="p-6 mb-8 shadow-soft border-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Today's Progress
            </h2>
            <Badge variant="secondary" className="bg-gradient-safe">
              {dailyProgress}% Complete
            </Badge>
          </div>
          <Progress value={dailyProgress} className="mb-4" />
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {getTodaysTasks().map((task) => (
              <div key={task.id} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${
                  task.completed ? 'bg-wellness-safe' : 'bg-muted'
                }`} />
                <span className={`text-sm ${
                  task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                }`}>
                  {task.title}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="p-6 shadow-soft border-0 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/chat')}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-2xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Talk to MindPal</h3>
                <p className="text-sm text-muted-foreground">Your AI companion is here</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              "Hey there! How are you feeling today? I'm here to listen and support you. 💙"
            </p>
            <WellnessButton variant="outline" className="w-full">
              Start Chatting
            </WellnessButton>
          </Card>

          <Card className="p-6 shadow-soft border-0 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate('/meditation')}>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-gradient-safe rounded-2xl flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Guided Meditation</h3>
                <p className="text-sm text-muted-foreground">5-minute focused session</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Take a few minutes to center yourself and find calm in the present moment.
            </p>
            <WellnessButton variant="secondary" className="w-full">
              Start Session
            </WellnessButton>
          </Card>
        </div>

        {/* Additional Resources */}
        <div className="grid md:grid-cols-3 gap-4">
          <Card className="p-4 shadow-gentle border-0 hover:shadow-soft transition-shadow cursor-pointer">
            <BookOpen className="w-8 h-8 text-wellness-warm mb-3" />
            <h4 className="font-semibold mb-2">Mood Journal</h4>
            <p className="text-sm text-muted-foreground">Track your feelings and patterns</p>
          </Card>

          <Card className="p-4 shadow-gentle border-0 hover:shadow-soft transition-shadow cursor-pointer">
            <Calendar className="w-8 h-8 text-wellness-calm mb-3" />
            <h4 className="font-semibold mb-2">Schedule Wellness</h4>
            <p className="text-sm text-muted-foreground">Plan your self-care activities</p>
          </Card>

          <Card className="p-4 shadow-gentle border-0 hover:shadow-soft transition-shadow cursor-pointer">
            <Users className="w-8 h-8 text-wellness-nature mb-3" />
            <h4 className="font-semibold mb-2">Find Support</h4>
            <p className="text-sm text-muted-foreground">Connect with professionals</p>
          </Card>
        </div>

        {/* Emergency Notice for High Risk */}
        {riskLevel >= 4 && (
          <Card className="p-6 mt-8 shadow-warm border-0 bg-gradient-warm">
            <div className="flex items-center gap-4">
              <Heart className="w-8 h-8 text-white" />
              <div className="flex-1">
                <h3 className="font-semibold text-white mb-2">You're Not Alone</h3>
                <p className="text-white/90 text-sm mb-4">
                  It looks like you might benefit from professional support. We're here to help you find it.
                </p>
                <WellnessButton variant="outline" className="bg-white/20 border-white/40 text-white hover:bg-white/30">
                  Find Professional Help
                </WellnessButton>
              </div>
            </div>
          </Card>
        )}
      </Container>
    </Layout>
  );
}