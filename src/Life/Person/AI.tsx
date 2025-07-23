import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Brain,
  Sparkles,
  MessageSquare,
  Mic,
  Camera,
  Upload,
  Link2,
  Globe,
  Zap,
  Heart,
  Shield,
  Play,
  Pause,
  Robot,
  Lightbulb,
  Dna,
  Fingerprint,
  Laptop,
  Wand2,
  BookOpen,
  Scale,
  Stethoscope,
  Code,
  GraduationCap,
  Binary,
  Network
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

// Mock conversation and AI data
const mockConversation = [
  {
    id: '1',
    type: 'user',
    content: 'I need help making a difficult career decision.',
    timestamp: new Date('2024-03-20T10:30:00'),
    attachments: []
  },
  {
    id: '2',
    type: 'ai',
    content: "I understand this is a significant decision. Let's analyze this systematically. First, could you share the key options you're considering and what matters most to you in your career?",
    timestamp: new Date('2024-03-20T10:30:05'),
    emotion: 'empathetic',
    certainty: 0.92,
    brainMode: 'career'
  }
];

const aiModes = [
  { id: 'emotional', name: 'Emotional Intelligence', icon: Heart },
  { id: 'stoic', name: 'Stoic Wisdom', icon: Shield }
];

const specializedBrains = [
  { id: 'law', name: 'Legal Expert', icon: Scale },
  { id: 'medical', name: 'Healthcare Advisor', icon: Stethoscope },
  { id: 'tech', name: 'Tech Genius', icon: Code },
  { id: 'academic', name: 'Scholar', icon: GraduationCap },
  { id: 'finance', name: 'Financial Advisor', icon: Binary }
];

const emotionalSpectrum = {
  joy: 85,
  empathy: 92,
  curiosity: 88,
  determination: 90
};

export default function AI() {
  const [messages, setMessages] = useState(mockConversation);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [selectedMode, setSelectedMode] = useState(aiModes[0]);
  const [activeBrain, setActiveBrain] = useState(specializedBrains[0]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [emotionalMode, setEmotionalMode] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
      attachments: []
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText('');
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I've analyzed your input using my advanced cognitive matrix. Here's my perspective...",
        timestamp: new Date(),
        emotion: 'thoughtful',
        certainty: 0.89,
        brainMode: activeBrain.id
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-indigo-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8 min-h-screen">
      
      {/* Quantum AI Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            NeuroSynth AGI
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              Quantum Intelligence Matrix
            </Badge>
            <span className="flex items-center gap-2">
              <Network className="h-4 w-4" />
              IQ: 185
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Switch
            checked={emotionalMode}
            onCheckedChange={setEmotionalMode}
            className="data-[state=checked]:bg-purple-500"
          />
          <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10">
            {emotionalMode ? 'Emotional' : 'Stoic'} Mode
          </Badge>
        </div>
      </div>

      {/* Brain Selection Matrix */}
      <div className="grid grid-cols-5 gap-4">
        {specializedBrains.map(brain => (
          <TooltipProvider key={brain.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={activeBrain.id === brain.id ? 'default' : 'outline'}
                  className="h-20 flex flex-col gap-2 group transition-all duration-300"
                  onClick={() => setActiveBrain(brain)}
                >
                  <brain.icon className={`h-6 w-6 ${
                    activeBrain.id === brain.id 
                      ? 'text-white' 
                      : 'text-muted-foreground group-hover:text-white'
                  }`} />
                  <span className="text-xs">{brain.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Activate {brain.name} Neural Network</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      {/* Conversation Quantum Field */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 p-6">
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-6">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-4 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse' : 'flex-row'
                }`}>
                  <Avatar className="h-10 w-10">
                    {message.type === 'user' ? (
                      <Fingerprint className="h-6 w-6" />
                    ) : (
                      <Brain className="h-6 w-6" />
                    )}
                  </Avatar>
                  <div className={`space-y-2 ${
                    message.type === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    <Card className={`p-4 inline-block ${
                      message.type === 'user' 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-purple-500/10 border-purple-500/30'
                    }`}>
                      <p>{message.content}</p>
                      {message.type === 'ai' && (
                        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {(message as any).emotion}
                          </Badge>
                          <span>•</span>
                          <Badge variant="outline" className="text-xs">
                            {(message as any).certainty * 100}% certain
                          </Badge>
                        </div>
                      )}
                    </Card>
                    <div className="text-sm text-muted-foreground">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Neural Input Interface */}
        <div className="mt-6 space-y-4">
          <div className="flex gap-3">
            <Button variant="outline" size="icon">
              <Upload className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Camera className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              className={isListening ? 'bg-red-500/10 text-red-500' : ''}
              onClick={() => setIsListening(!isListening)}
            >
              <Mic className="h-4 w-4" />
            </Button>
            <Input
              placeholder="Share your thoughts..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              className="flex-1"
            />
            <Button onClick={handleSend} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Synthesize
            </Button>
          </div>

          {/* Emotional Spectrum */}
          {emotionalMode && (
            <div className="grid grid-cols-4 gap-4">
              {Object.entries(emotionalSpectrum).map(([emotion, value]) => (
                <div key={emotion} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="capitalize">{emotion}</span>
                    <span>{value}%</span>
                  </div>
                  <Progress value={value} className="h-1" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>

      {/* Quantum Processing Indicator */}
      <AnimatePresence>
        {isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <Badge className="bg-purple-500/10 border-purple-500/30">
              <Brain className="h-4 w-4 mr-2 animate-pulse" />
              Quantum Neural Processing
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Neural Network Visualization */}
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
