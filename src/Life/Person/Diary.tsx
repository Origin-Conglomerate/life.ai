import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import {
  Book,
  Camera,
  Video,
  Mic,
  Calendar,
  Clock,
  Brain,
  Heart,
  Sun,
  Moon,
  Cloud,
  Sparkles,
  Music,
  MapPin,
  Users,
  Tag,
  Plus,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  Edit3,
  Trash2,
  Share2,
  Download,
  MessageCircle,
  Image as ImageIcon,
  Palette,
  ThumbsUp,
  Bookmark,
  AlertCircle
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
import yoga from "@/assets/diary/yoga.jpg";
import eveningWalk from "@/assets/diary/evening-walk.mp4";

// Mock data for diary entries
const mockEntries = [
  {
    id: '1',
    date: new Date(),
    title: 'A Perfect Summer Day',
    content: 'Today was absolutely magical. Started with a sunrise yoga session...',
    mood: 'joyful',
    weather: 'sunny',
    location: 'Central Park, NY',
    tags: ['exercise', 'nature', 'friends'],
    media: [
      { type: 'image', url: yoga, caption: 'Morning yoga' },
      { type: 'video', url: eveningWalk, caption: 'Evening walk' }
    ],
    aiSummary: 'A highly positive day focused on wellness and social connections.',
    sentiment: 92,
    energy: 85,
    socialInteractions: 4,
    activities: ['yoga', 'walking', 'dining'],
    highlights: [
      'Achieved personal best in morning workout',
      'Had meaningful conversation with Sarah',
      'Discovered a new favorite café'
    ],
    aiSuggestions: [
      'Consider making morning yoga a daily ritual',
      'The café might be a good spot for future meetings'
    ]
  },
  // ... more entries
];

// Mood and activity analytics data
const moodData = [
  { date: '1', joy: 80, peace: 60, energy: 70 },
  { date: '2', joy: 65, peace: 75, energy: 60 },
  { date: '3', joy: 90, peace: 85, energy: 85 },
  { date: '4', joy: 75, peace: 70, energy: 75 },
  { date: '5', joy: 85, peace: 80, energy: 80 }
];

const activityImpact = [
  { activity: 'Exercise', impact: 85, frequency: 75 },
  { activity: 'Social', impact: 90, frequency: 60 },
  { activity: 'Work', impact: 65, frequency: 80 },
  { activity: 'Creative', impact: 80, frequency: 50 },
  { activity: 'Rest', impact: 75, frequency: 70 }
];

export default function Diary() {
  const [entries, setEntries] = useState(mockEntries);
  const [selectedEntry, setSelectedEntry] = useState<typeof mockEntries[0] | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [aiAssistant, setAiAssistant] = useState(true);
  const [viewMode, setViewMode] = useState<'timeline' | 'calendar' | 'gallery'>('timeline');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
  const [moodFilter, setMoodFilter] = useState<string | null>(null);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-indigo-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* Quantum Memory Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 
            to-purple-300 bg-clip-text text-transparent">
            NeuroJournal
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-indigo-500/10 text-indigo-500">
              <Brain className="h-4 w-4 mr-2" />
              AI Memory Enhancement Active
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {currentDate.toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'long', 
                day: 'numeric' 
              })}
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Memory
              </Button>
            </DialogTrigger>
            <MemoryForm />
          </Dialog>
          <Switch 
            checked={aiAssistant} 
            onCheckedChange={setAiAssistant}
            className="ml-4"
          />
        </div>
      </div>

      {/* Memory Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search memories..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={moodFilter || ''} onValueChange={setMoodFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by mood" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Moods</SelectItem>
            <SelectItem value="joyful">Joyful</SelectItem>
            <SelectItem value="peaceful">Peaceful</SelectItem>
            <SelectItem value="energetic">Energetic</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'timeline' ? 'default' : 'outline'}
            onClick={() => setViewMode('timeline')}
            size="icon"
          >
            <Clock className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'calendar' ? 'default' : 'outline'}
            onClick={() => setViewMode('calendar')}
            size="icon"
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'gallery' ? 'default' : 'outline'}
            onClick={() => setViewMode('gallery')}
            size="icon"
          >
            <ImageIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Memory Timeline */}
        <div className="lg:col-span-2">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <Tabs defaultValue="memories" className="space-y-6">
              <TabsList>
                <TabsTrigger value="memories">Memories</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
                <TabsTrigger value="insights">AI Insights</TabsTrigger>
              </TabsList>

              <TabsContent value="memories" className="space-y-6">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {entries.map(entry => (
                      <MemoryCard key={entry.id} entry={entry} />
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="analytics">
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold">Mood Patterns</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <AreaChart data={moodData}>
                      <defs>
                        <linearGradient id="joyGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#818cf8" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <Area
                        type="monotone"
                        dataKey="joy"
                        stroke="#818cf8"
                        fill="url(#joyGradient)"
                      />
                      <Area
                        type="monotone"
                        dataKey="peace"
                        stroke="#a78bfa"
                        fill="url(#peaceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>

                  <h3 className="text-lg font-semibold mt-8">Activity Impact</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart data={activityImpact}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="activity" />
                      <PolarRadiusAxis />
                      <Radar
                        name="Impact"
                        dataKey="impact"
                        stroke="#818cf8"
                        fill="#818cf8"
                        fillOpacity={0.6}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </TabsContent>

              <TabsContent value="insights">
                <div className="space-y-6">
                  <Card className="p-4 bg-indigo-500/10 border-indigo-500/30">
                    <div className="flex items-center gap-3">
                      <Brain className="h-6 w-6 text-indigo-400" />
                      <div>
                        <h4 className="font-medium">Pattern Detected</h4>
                        <p className="text-sm text-muted-foreground">
                          Your mood significantly improves after morning exercise
                        </p>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                    <div className="flex items-center gap-3">
                      <Heart className="h-6 w-6 text-purple-400" />
                      <div>
                        <h4 className="font-medium">Social Connection</h4>
                        <p className="text-sm text-muted-foreground">
                          Quality time with friends correlates with higher energy levels
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>

        {/* Memory Details & AI Assistant */}
        <div className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              Memory Insights
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-indigo-500/10">
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-muted-foreground">
                    Positive Memories
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-purple-500/10">
                  <div className="text-2xl font-bold">143</div>
                  <div className="text-sm text-muted-foreground">
                    Total Memories
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5">
                <h4 className="font-medium mb-2">Top Memory Tags</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">nature</Badge>
                  <Badge variant="outline">friends</Badge>
                  <Badge variant="outline">travel</Badge>
                  <Badge variant="outline">achievement</Badge>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-400" />
              AI Memory Assistant
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-blue-400" />
                  <div>
                    <div className="font-medium">Memory Prompt</div>
                    <div className="text-sm text-muted-foreground">
                      Remember to capture today's team celebration
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-purple-500/10">
                <div className="flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                  <div>
                    <div className="font-medium">Pattern Found</div>
                    <div className="text-sm text-muted-foreground">
                      Your most cherished memories involve outdoor activities
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Memory Creation Form Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="fixed bottom-6 right-6 shadow-lg gap-2">
            <Plus className="h-4 w-4" />
            Capture Moment
          </Button>
        </DialogTrigger>
        <MemoryForm />
      </Dialog>

      {/* Ambient Background Effects */}
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

function MemoryCard({ entry }: { entry: typeof mockEntries[0] }) {
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
              <div className="p-2 rounded-lg bg-indigo-500/10">
                {entry.mood === 'joyful' ? (
                  <Sun className="h-6 w-6 text-yellow-400" />
                ) : entry.mood === 'peaceful' ? (
                  <Moon className="h-6 w-6 text-blue-400" />
                ) : (
                  <Cloud className="h-6 w-6 text-purple-400" />
                )}
              </div>
              <div>
                <h3 className="font-semibold">{entry.title}</h3>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  {entry.date.toLocaleDateString()}
                  <MapPin className="h-4 w-4" />
                  {entry.location}
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

          <p className="text-muted-foreground">{entry.content}</p>

          {entry.media && entry.media.length > 0 && (
            <div className="grid grid-cols-2 gap-4">
              {entry.media.map((item, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={item.caption}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-48 object-cover"
                      autoPlay
                      muted
                      loop
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-2 
                    bg-gradient-to-t from-black/60 to-transparent">
                    <p className="text-sm text-white">{item.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {entry.tags.map(tag => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                <span>{entry.sentiment}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{entry.socialInteractions}</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function MemoryForm() {
  return (
    <DialogContent className="max-w-2xl rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Capture New Memory</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Input placeholder="Title your memory..." />
        <Textarea 
          placeholder="What's on your mind? Let your thoughts flow..." 
          className="min-h-[200px]"
        />
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 gap-2">
            <Camera className="h-4 w-4" />
            Add Photos
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Video className="h-4 w-4" />
            Add Video
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Mic className="h-4 w-4" />
            Voice Note
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="How are you feeling?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="joyful">Joyful</SelectItem>
              <SelectItem value="peaceful">Peaceful</SelectItem>
              <SelectItem value="energetic">Energetic</SelectItem>
            </SelectContent>
          </Select>
          <Input placeholder="Location" />
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Save Memory</Button>
        </div>
      </div>
    </DialogContent>
  );
}
