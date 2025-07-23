import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  Apple,
  ArrowDown,
  ArrowUp,
  Bed,
  Book,
  CheckCircle,
  Clock,
  Code,
  Coffee,
  Download,
  Droplet,
  FileText,
  Heart,
  HeartPulse,
  HelpCircle,
  Laptop,
  Loader2,
  Mail,
  MessageSquare,
  Monitor,
  Moon,
  Notebook,
  PenTool,
  RefreshCw,
  Settings,
  Shield,
  Speech,
  Sun,
  Trash2,
  Upload,
  User,
  Users,
  Utensils,
  Video,
  Wifi,
  Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Log event types for life digital twin
const LOG_TYPES = {
  HEALTH: { label: 'Health', icon: <HeartPulse className="h-4 w-4" />, color: 'text-red-400' },
  FITNESS: { label: 'Fitness', icon: <Activity className="h-4 w-4" />, color: 'text-green-400' },
  NUTRITION: { label: 'Nutrition', icon: <Apple className="h-4 w-4" />, color: 'text-yellow-400' },
  SLEEP: { label: 'Sleep', icon: <Bed className="h-4 w-4" />, color: 'text-purple-400' },
  SOCIAL: { label: 'Social', icon: <Users className="h-4 w-4" />, color: 'text-blue-400' },
  PRODUCTIVITY: { label: 'Productivity', icon: <CheckCircle className="h-4 w-4" />, color: 'text-indigo-400' },
  ENVIRONMENT: { label: 'Environment', icon: <Sun className="h-4 w-4" />, color: 'text-orange-400' },
  MENTAL: { label: 'Mental', icon: <Brain className="h-4 w-4" />, color: 'text-cyan-400' }
};

// Mock log events for life digital twin
const generateLogEvent = () => {
  const types = Object.keys(LOG_TYPES);
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const activities = ['Morning Run', 'Work Session', 'Family Dinner', 'Meditation', 'Gym Workout'];
  const locations = ['Home', 'Office', 'Gym', 'Park', 'Cafe'];
  const people = ['Alex', 'Jamie', 'Taylor', 'Morgan', 'Casey'];
  const randomActivity = activities[Math.floor(Math.random() * activities.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomPerson = people[Math.floor(Math.random() * people.length)];

  const baseEvent = {
    id: Date.now(),
    timestamp: now,
    type: randomType,
    source: ['Wearable', 'Smart Home', 'Mobile App', 'Calendar'][Math.floor(Math.random() * 4)],
    status: ['success', 'warning', 'error', 'info'][Math.floor(Math.random() * 4)]
  };

  switch(randomType) {
    case 'HEALTH':
      return {
        ...baseEvent,
        message: `Health measurement recorded`,
        details: {
          metric: ['Heart Rate', 'Blood Pressure', 'Oxygen Level', 'Body Temp'][Math.floor(Math.random() * 4)],
          value: Math.random() > 0.9 
            ? `${Math.floor(50 + Math.random() * 40)} (Low)` 
            : `${Math.floor(70 + Math.random() * 40)}`,
          status: Math.random() > 0.9 ? 'Concerning' : 'Normal',
          device: ['Smart Watch', 'Medical Device', 'Health App'][Math.floor(Math.random() * 3)]
        }
      };
    case 'FITNESS':
      return {
        ...baseEvent,
        message: `Fitness activity completed: ${randomActivity}`,
        details: {
          activity: randomActivity,
          duration: `${Math.floor(10 + Math.random() * 50)} minutes`,
          calories: Math.floor(100 + Math.random() * 500),
          intensity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
          location: randomLocation
        }
      };
    case 'NUTRITION':
      return {
        ...baseEvent,
        message: `Nutrition logged`,
        details: {
          meal: ['Breakfast', 'Lunch', 'Dinner', 'Snack'][Math.floor(Math.random() * 4)],
          calories: Math.floor(200 + Math.random() * 800),
          macros: `${Math.floor(10 + Math.random() * 40)}g protein, ${Math.floor(20 + Math.random() * 60)}g carbs, ${Math.floor(5 + Math.random() * 30)}g fat`,
          hydration: `${Math.floor(1 + Math.random() * 5)}L water`
        }
      };
    case 'SLEEP':
      const sleepQuality = ['Poor', 'Fair', 'Good', 'Excellent'][Math.floor(Math.random() * 4)];
      return {
        ...baseEvent,
        message: `Sleep analysis completed`,
        details: {
          duration: `${Math.floor(5 + Math.random() * 4)}h ${Math.floor(Math.random() * 60)}m`,
          quality: sleepQuality,
          stages: `${Math.floor(1 + Math.random() * 3)}h deep, ${Math.floor(2 + Math.random() * 3)}h light, ${Math.floor(0.5 + Math.random() * 2)}h REM`,
          interruptions: Math.floor(Math.random() * 5)
        },
        status: sleepQuality === 'Poor' ? 'warning' : sleepQuality === 'Excellent' ? 'success' : 'info'
      };
    case 'SOCIAL':
      return {
        ...baseEvent,
        message: `Social interaction with ${randomPerson}`,
        details: {
          type: ['Call', 'Message', 'In-Person', 'Video Chat'][Math.floor(Math.random() * 4)],
          duration: `${Math.floor(5 + Math.random() * 55)} minutes`,
          mood: ['Positive', 'Neutral', 'Negative'][Math.floor(Math.random() * 3)],
          location: randomLocation
        }
      };
    case 'PRODUCTIVITY':
      return {
        ...baseEvent,
        message: `Productivity session completed`,
        details: {
          task: ['Work Project', 'Personal Project', 'Learning', 'Chores'][Math.floor(Math.random() * 4)],
          focusTime: `${Math.floor(25 + Math.random() * 95)} minutes`,
          distractions: Math.floor(Math.random() * 10),
          completion: `${Math.floor(20 + Math.random() * 80)}%`
        }
      };
    case 'ENVIRONMENT':
      return {
        ...baseEvent,
        message: `Environment data recorded`,
        details: {
          location: randomLocation,
          temperature: `${Math.floor(15 + Math.random() * 15)}°C`,
          airQuality: ['Excellent', 'Good', 'Fair', 'Poor'][Math.floor(Math.random() * 4)],
          noiseLevel: ['Quiet', 'Moderate', 'Loud'][Math.floor(Math.random() * 3)]
        }
      };
    case 'MENTAL':
      const stressLevel = Math.floor(1 + Math.random() * 10);
      return {
        ...baseEvent,
        message: `Mental health check-in`,
        details: {
          stressLevel: stressLevel,
          mood: ['Happy', 'Content', 'Neutral', 'Anxious', 'Sad'][Math.floor(Math.random() * 5)],
          activity: ['Meditation', 'Journaling', 'Therapy', 'Breathing'][Math.floor(Math.random() * 4)],
          duration: `${Math.floor(5 + Math.random() * 25)} minutes`
        },
        status: stressLevel > 7 ? 'warning' : 'info'
      };
    default:
      return {
        ...baseEvent,
        message: 'System operation completed',
        details: {
          operation: ['Data sync', 'Backup', 'API call', 'Maintenance'][Math.floor(Math.random() * 4)],
          duration: `${(0.5 + Math.random() * 3).toFixed(2)}s`
        }
      };
  }
};

// Custom brain icon component
function Brain(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 2.5 2.5 0 0 1-3.0-3.08A2.5 2.5 0 0 1 2.5 12 2.5 2.5 0 0 1 4.5 9.5 2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 2.5 2.5 0 0 0 3.0-3.08A2.5 2.5 0 0 0 21.5 12a2.5 2.5 0 0 0-2-2.5 2.5 2.5 0 0 0-5.5-7.5Z" />
    </svg>
  );
}

export default function LogMonitor() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [isPaused, setIsPaused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [stats, setStats] = useState({
    total: 0,
    warnings: 0,
    errors: 0,
    lastHour: 0,
    wellnessScore: 82
  });
  const logsEndRef = useRef(null);

  // Auto-scroll to bottom when logs change
  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  // Simulate live log events
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      const newEvent = generateLogEvent();
      setLogs(prev => [newEvent, ...prev].slice(0, 200));
      setStats(prev => ({
        total: prev.total + 1,
        warnings: prev.warnings + (newEvent.status === 'warning' ? 1 : 0),
        errors: prev.errors + (newEvent.status === 'error' ? 1 : 0),
        lastHour: prev.lastHour + 1,
        wellnessScore: Math.min(100, Math.max(0, prev.wellnessScore + (Math.random() > 0.5 ? 1 : -1)))
      }));
    }, 800 + Math.random() * 1200); // Random interval between 0.8-2s

    return () => clearInterval(interval);
  }, [isPaused]);

  // Reset last hour count every hour
  useEffect(() => {
    const hourTimer = setInterval(() => {
      setStats(prev => ({ ...prev, lastHour: 0 }));
    }, 3600000);

    return () => clearInterval(hourTimer);
  }, []);

  const filteredLogs = logs.filter(log => {
    const matchesFilter = filter === 'all' || log.type === filter.toUpperCase();
    const matchesSearch = searchQuery === '' || 
      log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (log.details.activity && log.details.activity.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (log.details.location && log.details.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
      log.source.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const clearLogs = () => {
    setLogs([]);
    setStats(prev => ({ ...prev, total: 0, warnings: 0, errors: 0 }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-gray-900/20 to-indigo-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-full flex flex-col">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-300 
            to-cyan-300 bg-clip-text text-transparent">
            Life Digital Twin Monitor
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Wifi className="h-4 w-4 mr-2" />
              Live Stream Active
            </Badge>
            <span className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {stats.total} total events
            </span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button 
            variant={isPaused ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setIsPaused(!isPaused)}
            className="gap-2"
          >
            {isPaused ? (
              <>
                <RefreshCw className="h-4 w-4" />
                Resume
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4" />
                Pause
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={clearLogs}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </div>

      {/* Stats and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Wellness Score</div>
              <div className="text-2xl font-bold">{stats.wellnessScore}/100</div>
              <Progress 
                value={stats.wellnessScore} 
                className="h-2 mt-2" 
                indicatorColor={stats.wellnessScore > 75 ? 'bg-green-500' : stats.wellnessScore > 50 ? 'bg-yellow-500' : 'bg-red-500'}
              />
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10">
              <Heart className="h-5 w-5 text-indigo-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Activity Today</div>
              <div className="text-2xl font-bold">
                {logs.filter(l => l.type === 'FITNESS').length}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-green-500/10">
              <Activity className="h-5 w-5 text-green-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">Health Alerts</div>
              <div className="text-2xl font-bold">{stats.warnings}</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-500/10">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
          </div>
        </Card>
        <Card className="p-4 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-muted-foreground">System Issues</div>
              <div className="text-2xl font-bold">{stats.errors}</div>
            </div>
            <div className="p-2 rounded-lg bg-red-500/10">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search logs by activity, location, or metric..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(LOG_TYPES).map(([key, value]) => (
              <SelectItem key={key} value={key.toLowerCase()}>
                <div className="flex items-center gap-2">
                  {value.icon}
                  {value.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Log Container */}
      <Card className="flex-1 backdrop-blur-lg bg-white/5 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-4">
            {filteredLogs.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <Activity className="h-8 w-8 mb-2" />
                <p>No life events match your filters</p>
              </div>
            ) : (
              filteredLogs.map((log) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`p-4 rounded-lg border ${
                    log.status === 'error' 
                      ? 'bg-red-500/10 border-red-500/20' 
                      : log.status === 'warning'
                      ? 'bg-yellow-500/10 border-yellow-500/20'
                      : 'bg-white/5 border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      log.status === 'error' 
                        ? 'bg-red-500/10 text-red-400' 
                        : log.status === 'warning'
                        ? 'bg-yellow-500/10 text-yellow-400'
                        : 'bg-white/5'
                    }`}>
                      {LOG_TYPES[log.type].icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <span className={`font-medium ${LOG_TYPES[log.type].color}`}>
                            {LOG_TYPES[log.type].label}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {log.source}
                          </Badge>
                          {log.status === 'error' && (
                            <Badge variant="destructive" className="text-xs">
                              Error
                            </Badge>
                          )}
                          {log.status === 'warning' && (
                            <Badge variant="secondary" className="text-xs">
                              Warning
                            </Badge>
                          )}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatTime(log.timestamp)}
                        </div>
                      </div>
                      <p className="mb-2">{log.message}</p>
                      <div className="text-sm text-muted-foreground">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {Object.entries(log.details).map(([key, value]) => (
                            <div key={key} className="flex items-center gap-1">
                              <span className="font-medium capitalize">{key}:</span>
                              <span>{value instanceof Date ? formatDate(value) : value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={logsEndRef} />
          </div>
        </ScrollArea>
      </Card>

      {/* Status Bar */}
      <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            {filteredLogs.filter(l => l.status === 'success').length} Normal
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
            {filteredLogs.filter(l => l.status === 'warning').length} Warnings
          </span>
          <span className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-red-500"></div>
            {filteredLogs.filter(l => l.status === 'error').length} Issues
          </span>
        </div>
        <div>
          {isPaused ? 'Updates Paused' : 'Streaming Live'}
        </div>
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-indigo-400 rounded-full"
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

function Search(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}