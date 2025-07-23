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
  ResponsiveContainer
} from 'recharts';
import {
  Book,
  FileText,
  Folder,
  Star,
  Tag,
  Clock,
  Brain,
  Sparkles,
  Plus,
  Search,
  Filter,
  Edit3,
  Trash2,
  Share2,
  Download,
  MessageCircle,
  Palette,
  ThumbsUp,
  Bookmark,
  AlertCircle,
  Bell,
  Calendar,
  CheckCircle,
  Link2,
  Hash,
  Zap,
  Lightbulb,
  Users,
  Lock,
  Eye,
  BarChart,
  Layers,
  GitBranch
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
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
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"

// Mock data for notes
const mockNotes = [
  {
    id: '1',
    title: 'Project Quantum Architecture',
    content: 'Key points for the new quantum computing initiative...',
    category: 'work',
    tags: ['quantum', 'architecture', 'planning'],
    created: new Date('2024-03-15'),
    modified: new Date('2024-03-16'),
    priority: 'high',
    status: 'in-progress',
    collaborators: ['user1', 'user2'],
    reminders: [
      { date: new Date('2024-03-20'), type: 'deadline' }
    ],
    aiSummary: 'Technical planning document for quantum computing project',
    linkedNotes: ['2', '3'],
    version: 1.2,
    wordCount: 542,
    readTime: '4 min',
    sentiment: 'neutral',
    aiTags: ['technical', 'planning', 'innovative'],
    stats: {
      views: 23,
      edits: 5,
      shares: 2
    }
  },
  // ... more notes
];

// Analytics data
const activityData = [
  { day: 'Mon', notes: 5, edits: 12, views: 25 },
  { day: 'Tue', notes: 3, edits: 8, views: 18 },
  { day: 'Wed', notes: 7, edits: 15, views: 30 },
  { day: 'Thu', notes: 4, edits: 10, views: 22 },
  { day: 'Fri', notes: 6, edits: 14, views: 28 }
];

const categoryDistribution = [
  { name: 'Work', value: 35 },
  { name: 'Personal', value: 25 },
  { name: 'Ideas', value: 20 },
  { name: 'Research', value: 15 },
  { name: 'Other', value: 5 }
];

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function Notes() {
  const [notes, setNotes] = useState(mockNotes);
  const [selectedNote, setSelectedNote] = useState<typeof mockNotes[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'grid' | 'mindmap'>('list');
  const [aiAssistant, setAiAssistant] = useState(true);
  const [showReminders, setShowReminders] = useState(true);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* NeuroNotes Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            NeuroNotes
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Enhancement Active
            </Badge>
            <span className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              {notes.length} Notes
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Note
              </Button>
            </DialogTrigger>
            <NoteForm />
          </Dialog>
          <Switch 
            checked={aiAssistant} 
            onCheckedChange={setAiAssistant}
            className="ml-4"
          />
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search notes..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={categoryFilter || ''} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="work">Work</SelectItem>
            <SelectItem value="personal">Personal</SelectItem>
            <SelectItem value="ideas">Ideas</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
            size="icon"
          >
            <Layers className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
            size="icon"
          >
            <BarChart className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'mindmap' ? 'default' : 'outline'}
            onClick={() => setViewMode('mindmap')}
            size="icon"
          >
            <GitBranch className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notes List */}
        <div className="lg:col-span-2">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <Tabs defaultValue="notes" className="space-y-6">
              <TabsList>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="ai">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="notes" className="space-y-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-4">
                    {notes.map(note => (
                      <NoteCard key={note.id} note={note} />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Activity Overview</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={activityData}>
                      <defs>
                        <linearGradient id="colorNotes" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="notes"
                        stroke="#3b82f6"
                        fill="url(#colorNotes)"
                      />
                      <Area
                        type="monotone"
                        dataKey="views"
                        stroke="#8b5cf6"
                        fill="url(#colorViews)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  <h3 className="text-lg font-semibold mt-8">Category Distribution</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={categoryDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="ai">
                <div className="space-y-6">
                  <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                    <div className="flex items-center gap-3">
                      <Brain className="h-6 w-6 text-blue-400" />
                      <div>
                        <h4 className="font-medium">Content Patterns</h4>
                        <p className="text-sm text-muted-foreground">
                          Your most productive writing occurs between 9-11 AM
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <Lightbulb className="h-6 w-6 text-purple-400" />
                      <div>
                        <h4 className="font-medium">Topic Suggestions</h4>
                        <p className="text-sm text-muted-foreground">
                          Consider expanding on quantum computing concepts
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BarChart className="h-5 w-5 text-blue-400" />
              Quick Stats
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">542</div>
                <div className="text-sm text-muted-foreground">
                  Words Today
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">
                  Active Notes
                </div>
              </div>
            </div>
          </Card>

          {/* Calendar & Reminders */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-purple-400" />
              Reminders
            </h3>
            <div className="space-y-4">
              <CalendarComponent
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
              />
              <div className="space-y-2">
                {showReminders && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-lg bg-yellow-500/10"
                  >
                    <div className="flex items-center gap-2">
                      <Bell className="h-4 w-4 text-yellow-500" />
                      <span>Project deadline tomorrow</span>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </Card>

          {/* AI Assistant */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-green-400" />
              AI Assistant
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="flex items-center gap-3">
                  <Zap className="h-6 w-6 text-green-400" />
                  <div>
                    <div className="font-medium">Smart Suggestion</div>
                    <div className="text-sm text-muted-foreground">
                      Link related quantum computing notes
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <motion.div
        className="fixed bottom-6 right-6 flex gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="default" className="shadow-lg gap-2">
          <Brain className="h-4 w-4" />
          Generate Summary
        </Button>
      </motion.div>

      {/* Ambient Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
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

function NoteCard({ note }: { note: typeof mockNotes[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative"
    >
      <Card className="p-6 backdrop-blur-lg bg-white/5 hover:bg-white/10 
        transition-all duration-300">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-lg bg-blue-500/10">
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold">{note.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  {note.modified.toLocaleDateString()}
                  <span>•</span>
                  <Eye className="h-4 w-4" />
                  {note.stats.views} views
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon">
                <Edit3 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <p className="text-muted-foreground line-clamp-2">{note.content}</p>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {note.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4">
              {note.collaborators.length > 0 && (
                <div className="flex -space-x-2">
                  {note.collaborators.map((user, i) => (
                    <Avatar key={user} className="h-6 w-6 border-2 border-background">
                      <AvatarFallback>
                        {user[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </div>
              )}
              {note.priority === 'high' && (
                <Badge variant="outline" className="border-red-500/30 bg-red-500/10">
                  High Priority
                </Badge>
              )}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function NoteForm() {
  return (
    <DialogContent className="max-w-2xl rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Create New Note</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Input placeholder="Note title..." />
        <Textarea 
          placeholder="Start writing..." 
          className="min-h-[200px]"
        />
        <div className="flex gap-4">
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="work">Work</SelectItem>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="ideas">Ideas</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Create Note</Button>
        </div>
      </div>
    </DialogContent>
  );
}
