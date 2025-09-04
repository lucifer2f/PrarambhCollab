import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { Card } from '@/components/ui/card';
import { Heart, Brain, MessageCircle, Shield, Sparkles, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <Layout background="gradient">
      <Container className="max-w-4xl text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-primary text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Gen AI for Youth Mental Wellness
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            Meet MindPal
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Your AI-powered companion for mental wellness. Get personalized support, 
            build healthy habits, and never feel alone on your journey.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <WellnessButton 
              size="lg" 
              onClick={() => navigate('/onboarding')}
              className="text-lg px-8"
            >
              <Heart className="w-5 h-5 mr-2" />
              Start Your Journey
            </WellnessButton>
            
            <WellnessButton 
              variant="outline" 
              size="lg"
              className="text-lg px-8"
            >
              Learn More
            </WellnessButton>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-8 shadow-soft border-0 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">AI Companion</h3>
            <p className="text-muted-foreground leading-relaxed">
              Chat with MindPal anytime you need support. Our AI understands 
              youth mental health and provides empathetic, helpful responses.
            </p>
          </Card>

          <Card className="p-8 shadow-soft border-0 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-safe rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Brain className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Smart Wellness</h3>
            <p className="text-muted-foreground leading-relaxed">
              Evidence-based assessments and personalized interventions. 
              Track your progress and build lasting mental wellness habits.
            </p>
          </Card>

          <Card className="p-8 shadow-soft border-0 hover:shadow-lg transition-all">
            <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold mb-4">Crisis Support</h3>
            <p className="text-muted-foreground leading-relaxed">
              Advanced safety features detect when you need help and connect 
              you with professional support when necessary.
            </p>
          </Card>
        </div>

        {/* How it Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-12">How MindPal Supports You</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-left">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Complete Your Assessment</h4>
                  <p className="text-muted-foreground">Quick, evidence-based screening to understand your current wellness level.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Get Your Personalized Plan</h4>
                  <p className="text-muted-foreground">Receive tailored wellness activities and coping strategies for your needs.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Build Healthy Habits</h4>
                  <p className="text-muted-foreground">Smart nudges and engaging challenges help you form lasting wellness habits.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-semibold text-sm">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Connect When Needed</h4>
                  <p className="text-muted-foreground">Automatic escalation to professional help when your wellness needs extra support.</p>
                </div>
              </div>
            </div>
            
            <Card className="p-8 shadow-soft border-0 bg-gradient-subtle">
              <div className="text-center">
                <Users className="w-16 h-16 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4">You're Not Alone</h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of young people who are taking control of their mental wellness with MindPal.
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">10k+</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">95%</div>
                    <div className="text-sm text-muted-foreground">Feel Supported</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground">AI Support</div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-12 shadow-soft border-0 bg-gradient-primary text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Wellness Journey?</h2>
          <p className="text-white/90 mb-8 text-lg max-w-2xl mx-auto">
            Take the first step towards better mental health. MindPal is here to support you every step of the way.
          </p>
          <WellnessButton 
            variant="outline" 
            size="lg"
            onClick={() => navigate('/onboarding')}
            className="bg-white/20 border-white/40 text-white hover:bg-white/30 text-lg px-8"
          >
            Get Started - It's Free
          </WellnessButton>
        </Card>
      </Container>
    </Layout>
  );
};

export default Index;
