import React, { useState, useRef, useEffect } from 'react';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { ArrowLeft, Send, Heart, AlertTriangle } from 'lucide-react';
import { saveInteraction, getInteractions } from '../lib/database';
=======
import { ArrowLeft, Send, Heart } from 'lucide-react';
>>>>>>> main

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  mood?: 'supportive' | 'concerned' | 'encouraging';
}

export default function AIChat() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! I'm MindPal, your AI companion. I'm here to listen and support you. How are you feeling today? 💙",
      sender: 'ai',
      timestamp: new Date(),
      mood: 'supportive'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userId] = useState<string | null>(localStorage.getItem("app_user_id"));
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

<<<<<<< HEAD
  useEffect(() => {
    if (userId) {
      (async () => {
        const rows = await getInteractions(userId);
        setHistory(rows);
      })();
    }
  }, [userId]);

  const generateAIResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses for demo
    let response = "I hear you. Can you tell me more about what's on your mind?";
    let mood: 'supportive' | 'concerned' | 'encouraging' = 'supportive';

    if (lowerMessage.includes('sad') || lowerMessage.includes('depressed') || lowerMessage.includes('down')) {
      response = "I'm sorry you're feeling this way. It's okay to feel sad sometimes. Would you like to try a quick breathing exercise together, or would you prefer to talk about what's making you feel down?";
      mood = 'concerned';
    } else if (lowerMessage.includes('anxious') || lowerMessage.includes('worried') || lowerMessage.includes('stress')) {
      response = "Anxiety can be really overwhelming. Let's take this one step at a time. Have you tried any grounding techniques today? I can guide you through a simple 5-4-3-2-1 exercise if you'd like.";
      mood = 'supportive';
    } else if (lowerMessage.includes('good') || lowerMessage.includes('great') || lowerMessage.includes('happy')) {
      response = "That's wonderful to hear! I'm so glad you're feeling good today. What's been helping you feel this way? It's great to celebrate these positive moments. 🌟";
      mood = 'encouraging';
    } else if (lowerMessage.includes('tired') || lowerMessage.includes('exhausted')) {
      response = "It sounds like you're really drained. Rest is so important for our mental health. Have you been getting enough sleep lately? Sometimes a short meditation can help us feel more refreshed too.";
      mood = 'supportive';
    } else if (lowerMessage.includes('alone') || lowerMessage.includes('lonely')) {
      response = "Feeling lonely can be really hard. Remember that you're not truly alone - I'm here with you, and there are people who care about you. Would you like to talk about what's making you feel this way?";
      mood = 'concerned';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
      response = "I'm here to help in whatever way I can. If you're looking for professional support, I can help you find resources. For now, I'm here to listen and support you. What kind of help do you need?";
      mood = 'supportive';
    }

    // Crisis detection - simplified for demo
    if (lowerMessage.includes('hurt myself') || lowerMessage.includes('suicide') || lowerMessage.includes('end it all')) {
      response = "I'm very concerned about you right now. Please know that you matter and there are people who want to help. I strongly encourage you to reach out to a crisis hotline: 988 (Suicide & Crisis Lifeline). Would you like me to help you find immediate professional support?";
      mood = 'concerned';
    }

    return {
      id: Date.now().toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      mood
    };
  };

  const handleSendMessage = () => {
=======
  const handleSend = () => {
>>>>>>> main
    if (!inputValue.trim()) return;
    const userMsg: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };
    setMessages((msgs) => [...msgs, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages((msgs) => [
        ...msgs,
        {
          id: (Date.now() + 1).toString(),
          text: "I'm here for you. Tell me more!",
          sender: 'ai',
          timestamp: new Date(),
          mood: 'supportive'
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId) return alert("Create a user first (Onboarding).");
    // Save the Q&A pair
    await saveInteraction(userId, question, answer);
    setQuestion("");
    setAnswer("");
    // refresh list
    const rows = await getInteractions(userId);
    setHistory(rows);
  }

  return (
    <Layout background="gradient">
      <Container className="max-w-lg mx-auto">
        <Card className="p-0 shadow-md border-0 rounded-2xl bg-white mt-10 mb-8">
          <div className="flex items-center gap-2 p-4 border-b">
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:text-blue-800 focus:outline-none">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-bold text-gray-900 flex-1 text-center">MindPal Chat</h2>
            <Heart className="w-5 h-5 text-pink-400" />
          </div>
          <ScrollArea className="h-96 p-4 bg-blue-50/30">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.sender === 'ai' && (
                  <Avatar className="mr-2 w-8 h-8">
                    <AvatarFallback>AI</AvatarFallback>
                  </Avatar>
                )}
                <div className={`rounded-xl px-4 py-2 max-w-xs text-sm shadow ${msg.sender === 'ai' ? 'bg-blue-100 text-blue-900' : 'bg-blue-600 text-white'}`}>{msg.text}</div>
                {msg.sender === 'user' && (
                  <Avatar className="ml-2 w-8 h-8">
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center mb-2">
                <span className="text-xs text-gray-400">MindPal is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </ScrollArea>
          <form className="flex items-center gap-2 p-4 border-t bg-blue-50/50" onSubmit={e => { e.preventDefault(); handleSend(); }}>
            <Input
              className="flex-1 rounded-xl border-gray-200 focus:ring-2 focus:ring-blue-400"
              placeholder="Type your message..."
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              aria-label="Type your message"
            />
            <button type="submit" className="bg-blue-600 text-white rounded-xl px-4 py-2 font-bold hover:bg-blue-700 focus:ring-2 focus:ring-blue-400">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </Card>
<<<<<<< HEAD

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="flex-1 rounded-2xl"
            disabled={isTyping}
          />
          <WellnessButton
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            size="icon"
            className="rounded-2xl"
          >
            <Send className="w-4 h-4" />
          </WellnessButton>
        </div>

        {/* Safety Notice */}
        <div className="mt-4 p-3 bg-muted/30 rounded-xl">
          <p className="text-xs text-muted-foreground text-center">
            <AlertTriangle className="w-3 h-3 inline mr-1" />
            MindPal provides support but not medical advice. In crisis, contact 988 or your local emergency services.
          </p>
        </div>

        {/* History Section - Moved here for better structure */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">Chat History</h3>
          <Card className="p-4 shadow-soft border-0">
            <ScrollArea className="h-60">
              <ul className="space-y-2">
                {history.map((h) => (
                  <li key={h.id} className="flex gap-2">
                    <div className="flex-1 rounded-2xl px-4 py-2 bg-muted">
                      <p className="text-sm font-medium">{h.question}</p>
                      <p className="text-sm text-muted-foreground">{h.answer}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </Card>
        </div>
=======
>>>>>>> main
      </Container>
    </Layout>
  );
}