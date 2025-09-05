import React, { useState, useRef, useEffect } from 'react';
import { Layout, Container } from '@/components/Layout';
import { WellnessButton } from '@/components/WellnessButton';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Heart } from 'lucide-react';

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
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
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
      </Container>
    </Layout>
  );
}