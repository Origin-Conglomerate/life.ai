import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  ArrowUp,
  Bot,
  Calendar,
  CheckCircle,
  Clock,
  Coffee,
  HeartPulse,
  Home,
  Laptop,
  Loader2,
  Moon,
  Plus,
  Scissors,
  Search,
  Settings,
  ShoppingCart,
  Sun,
  User,
  Utensils,
  Wallet,
  Workflow,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data sources
const dataSources = [
  { name: "Health Tracker", icon: <HeartPulse className="h-4 w-4" />, connected: true },
  { name: "Calendar", icon: <Calendar className="h-4 w-4" />, connected: true },
  { name: "Financial System", icon: <Wallet className="h-4 w-4" />, connected: true },
  { name: "Smart Home", icon: <Home className="h-4 w-4" />, connected: true },
  { name: "Work Systems", icon: <Laptop className="h-4 w-4" />, connected: false }
];

// Mock messages
const initialMessages = [
  {
    id: 1,
    sender: 'ai',
    content: 'Hello! I\'m your Life Digital Twin. I\'ve been analyzing your daily patterns. Would you like a summary of your current life balance?',
    timestamp: new Date(),
    type: 'greeting'
  },
  {
    id: 2,
    sender: 'ai',
    content: 'Alert: Your sleep duration has been below recommended levels for 3 consecutive nights. Would you like me to adjust your schedule or suggest sleep aids?',
    timestamp: new Date(),
    type: 'alert',
    urgent: true
  },
  {
    id: 3,
    sender: 'ai',
    content: 'Here\'s your life snapshot:\n- Health: 82% optimal\n- Productivity: 76% efficiency\n- Social: 3 meaningful interactions today\n- Finances: On track with 92% budget adherence\n- Leisure: 1.2 hours today (recommend 2+)',
    timestamp: new Date(),
    type: 'summary'
  }
];

export default function AgenticAI() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [activeDataSource, setActiveDataSource] = useState(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate proactive AI messages
  useEffect(() => {
    const proactiveTimer = setTimeout(() => {
      const newAlert = {
        id: messages.length + 1,
        sender: 'ai',
        content: 'Reminder: Your weekly financial review is pending. Would you like me to prepare the report now?',
        timestamp: new Date(),
        type: 'alert',
        urgent: false
      };
      setMessages(prev => [...prev, newAlert]);
    }, 30000); // Every 30 seconds check for new alerts

    return () => clearTimeout(proactiveTimer);
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: input,
      timestamp: new Date(),
      type: 'query'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      let aiResponse;
      
      if (input.toLowerCase().includes('health') || input.toLowerCase().includes('fitness')) {
        // Simulate data gathering process
        setActiveDataSource('Health Tracker');
        setTimeout(() => {
          setActiveDataSource('Calendar');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Health analysis complete:\n\n- Activity: 78% of daily goal\n- Nutrition: Protein intake low\n- Sleep: Quality score 65/100\n- Stress: Moderate levels detected\n\nI can suggest adjustments to improve your wellness. Interested?`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Health Tracker', 'Calendar'],
              analysisTime: '1.5s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('schedule') || input.toLowerCase().includes('calendar')) {
        setActiveDataSource('Calendar');
        setTimeout(() => {
          setActiveDataSource('Work Systems');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Schedule optimization suggestions:\n\n1. Move low-priority meetings to create 2h focus blocks\n2. Identify 3 potential times for self-care\n3. Balance work/leisure ratio (currently 65/35)\n4. Social commitments below average\n\nWould you like me to implement any changes?`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Calendar', 'Work Systems'],
              analysisTime: '2.1s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else if (input.toLowerCase().includes('finance') || input.toLowerCase().includes('money')) {
        setActiveDataSource('Financial System');
        setTimeout(() => {
          setActiveDataSource('Calendar');
          setTimeout(() => {
            setActiveDataSource(null);
            aiResponse = {
              id: messages.length + 2,
              sender: 'ai',
              content: `Financial overview:\n\n- Monthly spending: 82% of budget\n- Savings rate: 18% (target 20%)\n- 3 recurring subscriptions underutilized\n- Investment portfolio +3.2% this month\n\nI can optimize expenses or plan investments if you'd like.`,
              timestamp: new Date(),
              type: 'analysis',
              sources: ['Financial System', 'Calendar'],
              analysisTime: '1.8s'
            };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            setIsTyping(false);
          }, 1500);
        }, 1500);
      } else {
        // Default response
        aiResponse = {
          id: messages.length + 2,
          sender: 'ai',
          content: `I've analyzed your query. Here's what I can share:\n\n- Your life balance score is 78/100\n- Key areas for improvement: leisure time, sleep quality\n- Upcoming commitments: 3 high-priority items\n- Recent positive trend: increased physical activity\n\nHow else can I assist with optimizing your life today?`,
          timestamp: new Date(),
          type: 'response'
        };
        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
        setIsTyping(false);
      }
    }, 1000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-purple-900/20 to-pink-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar className="bg-gradient-to-r from-purple-500 to-pink-500">
            <AvatarFallback className="bg-transparent">
              <User className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-300 
              to-pink-300 bg-clip-text text-transparent">
              Life Digital Twin
            </h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Activity className="h-3 w-3 text-green-500" />
                <span>Active Monitoring</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Workflow className="h-3 w-3 text-purple-500" />
                <span>Holistic Life Mode</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Zap className="h-4 w-4" />
            Actions
          </Button>
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Data Sources Status */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <Workflow className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Connected Life Systems</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {dataSources.map((source, index) => (
            <Badge 
              key={index} 
              variant={source.connected ? 'default' : 'outline'}
              className="gap-2"
            >
              {source.icon}
              {source.name}
              {source.connected ? (
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
              ) : (
                <div className="h-2 w-2 rounded-full bg-gray-500"></div>
              )}
            </Badge>
          ))}
        </div>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden mb-4">
        <ScrollArea className="h-full p-4">
          <div className="space-y-6">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`max-w-[85%] rounded-2xl p-4 ${
                    message.sender === 'ai' 
                      ? 'bg-white/5 border border-white/10 rounded-tl-none'
                      : 'bg-purple-500/10 border border-purple-500/20 rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {message.sender === 'ai' ? (
                      <User className="h-4 w-4 text-purple-400" />
                    ) : (
                      <User className="h-4 w-4 text-pink-400" />
                    )}
                    <span className="text-xs text-muted-foreground">
                      {formatTime(message.timestamp)}
                    </span>
                    {message.urgent && (
                      <Badge variant="destructive" className="ml-auto">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  
                  {message.type === 'summary' || message.type === 'analysis' ? (
                    <div className="whitespace-pre-line">
                      {message.content.split('\n').map((line, i) => (
                        <p key={i} className="mb-2">{line}</p>
                      ))}
                      {message.sources && (
                        <div className="mt-3 pt-2 border-t border-white/10">
                          <div className="text-xs text-muted-foreground mb-1">
                            Analyzed data from:
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {message.sources.map((source, i) => (
                              <Badge key={i} variant="outline" className="text-xs gap-1">
                                {dataSources.find(ds => ds.name === source)?.icon}
                                {source}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {message.analysisTime}
                            </Badge>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="whitespace-pre-line">
                      {message.content}
                    </div>
                  )}
                </motion.div>
              </div>
            ))}
            
            {/* Loading indicator when AI is typing */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="max-w-[85%] rounded-2xl p-4 bg-white/5 border border-white/10 rounded-tl-none">
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-purple-400" />
                      <span className="text-xs text-muted-foreground">
                        {formatTime(new Date())}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-purple-400" />
                      <span>Analyzing life data...</span>
                    </div>
                    {activeDataSource && (
                      <div className="mt-2 text-xs text-muted-foreground flex items-center gap-2">
                        <ArrowUp className="h-3 w-3 animate-bounce" />
                        Connecting to {activeDataSource}...
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="relative">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about health, schedule, finances, home..."
          className="pr-12 backdrop-blur-lg bg-white/5 border-white/20"
          disabled={isLoading}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>

      {/* Quick Action Buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        <Button variant="outline" size="sm" className="gap-2">
          <HeartPulse className="h-4 w-4" />
          Health Check
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Calendar className="h-4 w-4" />
          Schedule Review
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Wallet className="h-4 w-4" />
          Finances
        </Button>
        <Button variant="outline" size="sm" className="gap-2">
          <Home className="h-4 w-4" />
          Home Status
        </Button>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-purple-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function Send(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}