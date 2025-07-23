import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  Heart,
  Bell,
  Brain,
  Sparkles,
  Calendar,
  Clock,
  Activity,
  Zap,
  School,
  Home,
  Users,
  Briefcase,
  DollarSign,
  Trophy,
  HeartPulse,
  Dumbbell,
  Smile,
  AlertTriangle,
  Star,
  TrendingUp,
  Hourglass,
  Milestone,
  Target,
  BarChart,
  BookOpen,
  GraduationCap,
  Baby,
  Dna,
  Bot,
  QrCode,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Link } from 'react-router-dom'

// Life data and analytics
const lifeData = {
  birthDate: new Date('2002-09-13'),
  predictedLifespan: 85, // years
  currentAge: 21,
  lifeProgress: 24.7, // percentage

  vitalStats: {
    health: 92,
    happiness: 85,
    fulfillment: 78,
    stress: 45,
    energy: 88
  },

  lifeDomains: [
    { name: 'Health', score: 85, color: '#10b981' },
    { name: 'Career', score: 72, color: '#3b82f6' },
    { name: 'Relationships', score: 88, color: '#ec4899' },
    { name: 'Finance', score: 65, color: '#f59e0b' },
    { name: 'Personal Growth', score: 79, color: '#8b5cf6' }
  ],

  lifeStages: [
    {
      stage: 'Early Life',
      startAge: 0,
      endAge: 18,
      completed: true,
      highlights: ['Education', 'Childhood Development', 'Core Values Formation']
    },
    {
      stage: 'Young Adult',
      startAge: 18,
      endAge: 30,
      completed: false,
      current: true,
      highlights: ['Higher Education', 'Career Start', 'Self Discovery']
    },
    // ... more stages
  ],

  milestones: [
    {
      age: 18,
      title: 'High School Graduation',
      date: '2020-05-15',
      category: 'education',
      completed: true
    },
    {
      age: 22,
      title: 'University Graduation',
      date: '2024-05-20',
      category: 'education',
      completed: false
    }
    // ... more milestones
  ],

  predictions: {
    careerPeak: 45,
    majorLifeEvents: [
      { age: 25, event: 'Career Breakthrough' },
      { age: 28, event: 'Family Formation' },
      { age: 35, event: 'Peak Professional Achievement' }
    ],
    healthTrajectory: [
      { age: 30, metric: 'Peak Physical Condition' },
      { age: 40, metric: 'Preventive Health Focus' },
      { age: 50, metric: 'Lifestyle Adaptation' }
    ]
  }
};

// Calculate life metrics in years
const calculateLifeMetrics = () => {
  const birth = new Date(lifeData.birthDate);
  const today = new Date();
  const predictedEnd = new Date(birth.getTime() + (lifeData.predictedLifespan * 365.25 * 24 * 60 * 60 * 1000));

  const yearsLived = today.getFullYear() - birth.getFullYear();

  return {
    yearsLived,
    totalYears: lifeData.predictedLifespan,
    yearsRemaining: lifeData.predictedLifespan - yearsLived,
    predictedEndDate: predictedEnd
  };
};

export default function Life() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPredictions, setShowPredictions] = useState(true);
  const metrics = calculateLifeMetrics();

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-purple-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Life Dashboard Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 
            to-blue-300 bg-clip-text text-transparent">
            Life Quantum Matrix
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-purple-500/10 text-purple-500">
              <Dna className="h-4 w-4 mr-2" />
              Life Pattern Analysis Active
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Age: {lifeData.currentAge} years
            </span>
          </div>
        </div>
      </div>

      {/* Life Progress Visualization */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Life Journey</h2>
              <p className="text-muted-foreground">
                Birth Date: {lifeData.birthDate.toLocaleDateString()}
              </p>
            </div>
            <div className="text-right">
              <h3 className="text-xl font-semibold">
                {metrics.yearsRemaining.toLocaleString()} Years Remaining
              </h3>
              <p className="text-muted-foreground">
                Predicted: {metrics.predictedEndDate.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Life Progress Bar */}
          <div className="space-y-2">
            <Progress value={lifeData.lifeProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Birth</span>
              <span>{lifeData.lifeProgress.toFixed(1)}% Complete</span>
              <span>Predicted</span>
            </div>
          </div>

          {/* Life Dots Visualization */}
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: metrics.totalYears }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-2 w-2 rounded-full ${index < metrics.yearsLived
                  ? 'bg-purple-500'
                  : 'bg-white border border-black'
                  }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
              />
            ))}
          </div>
        </div>
      </Card>

      {/* Life Domains Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vital Statistics */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-400" />
            Vital Statistics
          </h3>
          <div className="space-y-4">
            {Object.entries(lifeData.vitalStats).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <span>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        {/* Life Radar */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Life Domain Balance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={lifeData.lifeDomains}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* Predictions & AI Insights */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-400" />
            AI Life Insights
          </h3>
          <div className="space-y-4">
            {lifeData.predictions.majorLifeEvents.map((event, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 
                    cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Milestone className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="font-medium">Age {event.age}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Event Analysis</h4>
                    <p className="text-sm">
                      Based on your current trajectory and life patterns
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Card>
      </div>

      {/* Life Stages Timeline */}
      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Hourglass className="h-5 w-5 text-yellow-400" />
          Life Stages Journey
        </h3>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[15px] w-px bg-white/20" />
          <div className="space-y-8">
            {lifeData.lifeStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative pl-10"
              >
                <div className="absolute left-0 w-8 h-8 rounded-full 
                  flex items-center justify-center
                  bg-white/5 border border-white/20">
                  {stage.completed ? (
                    <Star className="h-4 w-4 text-yellow-400" />
                  ) : stage.current ? (
                    <Activity className="h-4 w-4 text-purple-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">{stage.stage}</div>
                  <div className="text-sm text-muted-foreground">
                    Age {stage.startAge} - {stage.endAge}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stage.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      {/* Ambient Background Effects */}
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

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Link to="/ai">
          <Button className="rounded-full shadow-lg flex flex-col border-4 border-black h-16 w-16">
            <Bot className="h-4 w-4" />
            <span className="text-xs">AI</span>
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Button variant="outline" className="rounded-full shadow-lg flex flex-col border-4 border-black h-16 w-16">
            <QrCode className="h-4 w-4" />
            <span className="text-xs">Pay</span>
          </Button>
        </div>
        <Link to="/agentic-ai">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Agentic AI
          </Button>
        </Link>
        <Link to="/log-monitor">
          <Button className="rounded-full shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Log Monitor
          </Button>
        </Link>
      </div>
    </div>
  );
} 