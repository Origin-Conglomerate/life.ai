// components/DailyRhythm.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import {
  Plus,
  CheckCircle,
  AlarmClock,
  Flame,
  Brain,
  Clock,
  Zap,
  Trophy,
  Calendar,
  GanttChart,
  Goal,
  Stethoscope,
  List
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';  
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"


interface Task {
  id: string;
  title: string;
  category: 'health' | 'work' | 'learning' | 'personal';
  priority: number;
  timeEstimate: number;
  completed: boolean;
  streak: number;
  timeBlocks: { start: string; end: string }[];
  energyLevel: number;
  dependencies?: string[];
}

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Morning Meditation',
    category: 'health',
    priority: 1,
    timeEstimate: 20,
    completed: true,
    streak: 7,
    timeBlocks: [{ start: '06:00', end: '06:20' }],
    energyLevel: 85
  },
  {
    id: '2',
    title: 'Learn Quantum Computing',
    category: 'learning',
    priority: 2,
    timeEstimate: 45,
    completed: false,
    streak: 3,
    timeBlocks: [{ start: '09:00', end: '09:45' }],
    energyLevel: 65
  },
  {
    id: '3',
    title: 'Project Brainstorm',
    category: 'work',
    priority: 1,
    timeEstimate: 30,
    completed: false,
    streak: 0,
    timeBlocks: [{ start: '11:00', end: '11:30' }],
    energyLevel: 75
  }
];

const productivityData = [
  { hour: 6, productivity: 20 },
  { hour: 9, productivity: 85 },
  { hour: 12, productivity: 65 },
  { hour: 15, productivity: 45 },
  { hour: 18, productivity: 75 },
  { hour: 21, productivity: 30 }
];

export function DailyRhythm() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'hologram'>('list');
  const [energyFlow, setEnergyFlow] = useState(true);

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const calculateProductivityScore = () => {
    const completed = tasks.filter(t => t.completed).length;
    return (completed / tasks.length) * 100 || 0;
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-green-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* NeuroSync Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 
            to-blue-300 bg-clip-text text-transparent">
            ChronoSync Matrix
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Flame className="h-4 w-4 mr-2" />
              {tasks.filter(t => t.completed).length}/{tasks.length} Tasks Completed
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setViewMode(v => v === 'list' ? 'hologram' : 'list')}>
            {viewMode === 'list' ? <GanttChart className="h-4 w-4 mr-2" /> : <List className="h-4 w-4 mr-2" />}
            {viewMode === 'list' ? 'Hologram View' : 'List View'}
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Quantum Task
              </Button>
            </DialogTrigger>
            <TaskForm />
          </Dialog>
        </div>
      </div>

      {/* Productivity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* NeuroEnergy Flow */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              Cognitive Energy Flow
            </h3>
            <Switch checked={energyFlow} onCheckedChange={setEnergyFlow} />
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={productivityData}>
              <defs>
                <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stop="#4ade80" stopOpacity={0.8} />
                  <stop offset="95%" stop="#3b82f6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="productivity"
                stroke="#3b82f6"
                fill="url(#productivityGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Achievement Core */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              NeuroPerformance
            </h3>
            <Badge variant="outline" className="border-green-500/30">
              Day Streak: {Math.max(...tasks.map(t => t.streak))}
            </Badge>
          </div>
          <div className="flex flex-col items-center justify-center h-[160px]">
            <div className="relative">
              <Progress
                value={calculateProductivityScore()}
                className="h-32 w-32"
                indicatorClassName="stroke-blue-500"
                circle
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{calculateProductivityScore().toFixed(0)}%</span>
                <span className="text-sm text-muted-foreground">Efficiency</span>
              </div>
            </div>
          </div>
        </Card>

        {/* BioRhythm Radar */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-red-400" />
            Cognitive Spectrum
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={tasks}>
              <PolarGrid />
              <PolarAngleAxis dataKey="category" />
              <PolarRadiusAxis />
              <Radar
                name="Performance"
                dataKey="energyLevel"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Time Continuum Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quantum Task Stream */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {tasks.map(task => (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Card className={`p-4 backdrop-blur-lg transition-all
                    ${task.completed ? 'bg-green-500/10 border-green-500/20' : 'bg-white/5 hover:bg-white/10'}`}>
                    <div className="flex items-center gap-4">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTask(task.id)}
                        className={task.completed ? 'text-green-500' : ''}
                      >
                        <CheckCircle className="h-6 w-6" />
                      </Button>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-medium">{task.title}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <Badge variant="outline">{task.category}</Badge>
                          <span>{task.timeEstimate} mins</span>
                          <span>•</span>
                          <Flame className="h-4 w-4 text-red-500" />
                          <span>{task.energyLevel}% Energy</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <Goal className="h-4 w-4" />
                          <span className="text-xs">{task.streak}🔥</span>
                        </Avatar>
                        <Button variant="ghost" size="sm">Reschedule</Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Temporal Analytics */}
        <div className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Time Fractal Analysis
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold">4.2h</div>
                <div className="text-sm">Deep Work</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">1.5h</div>
                <div className="text-sm">Learning</div>
              </div>
              <div className="p-4 rounded-lg bg-red-500/10">
                <div className="text-2xl font-bold">38m</div>
                <div className="text-sm">Distractions</div>
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-yellow-500" />
              AI Chrono Suggestions
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <Zap className="h-5 w-5 text-green-500" />
                  <div>
                    <div className="font-medium">Energy Match: Move workout to 18:00</div>
                    <div className="text-sm text-muted-foreground">Matches your historical energy peaks</div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-white/5">
                <div className="flex items-center gap-3">
                  <AlarmClock className="h-5 w-5 text-red-500" />
                  <div>
                    <div className="font-medium">Focus Zone Alert: 09:00-11:00</div>
                    <div className="text-sm text-muted-foreground">Protect this high-productivity window</div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Temporal Flux Particles */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-green-400 rounded-full"
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

function TaskForm() {
  const [task, setTask] = useState({
    title: '',
    category: 'health',
    priority: 1,
    timeEstimate: 30
  });

  return (
    <DialogContent className="max-w-md rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Create Quantum Task</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Input
          placeholder="Task Title"
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <Select
          value={task.category}
          onValueChange={value => setTask({ ...task, category: value as any })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="health">Health</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="learning">Learning</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
          </SelectContent>
        </Select>
        <div className="grid grid-cols-2 gap-4">
          <Button variant="outline">Cancel</Button>
          <Button>Create Time Flux</Button>
        </div>
      </div>
    </DialogContent>
  );
}