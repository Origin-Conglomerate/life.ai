import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Image as ImageIcon,
  Video,
  FileText,
  MapPin,
  Users,
  Tag,
  Plus,
  Sparkles,
  Globe,
  Briefcase,
  Plane,
  Calendar,
  Camera,
  Smile,
  MoreHorizontal,
  TrendingUp,
  Award,
  Brain
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import quantumarchitecture from "@/assets/social/feed/quantum-architecture.jpg";
import morningworkspace from "@/assets/social/feed/morning-workspace.jpg";
import sunsetcoding from "@/assets/social/feed/sunset-coding-session.jpg";

// Mock data for posts
const mockPosts = [
  {
    id: '1',
    author: {
      id: 'user1',
      name: 'Sarah Chen',
      avatar: '/avatars/sarah.jpg',
      role: 'AI Researcher',
      verified: true
    },
    content: 'Just achieved a breakthrough in quantum neural networks! 🎉 This could revolutionize how we process complex data structures.',
    media: [
      { type: 'image', url: quantumarchitecture, caption: 'New quantum architecture' }
    ],
    category: 'career',
    tags: ['tech', 'research', 'quantum-computing'],
    location: 'Quantum Labs, Silicon Valley',
    timestamp: new Date('2024-03-20T15:30:00'),
    stats: {
      likes: 234,
      comments: 45,
      shares: 89,
      saves: 56
    },
    aiInsights: {
      sentiment: 'extremely positive',
      impact: 'groundbreaking',
      reach: 'growing exponentially',
      trending: true
    }
  },
  {
    id: '2',
    author: {
      id: 'user2',
      name: 'Alex Rivera',
      avatar: '/avatars/alex.jpg',
      role: 'Digital Nomad',
      verified: true
    },
    content: 'Working from the beaches of Bali 🌊 Remote work has truly transformed how we experience life. Building the future while living in paradise!',
    media: [
      { type: 'image', url: morningworkspace, caption: 'Morning workspace' },
      { type: 'image', url: sunsetcoding, caption: 'Sunset coding session' }
    ],
    category: 'travel',
    tags: ['digital-nomad', 'remote-work', 'bali'],
    location: 'Canggu, Bali',
    timestamp: new Date('2024-03-20T10:15:00'),
    stats: {
      likes: 567,
      comments: 89,
      shares: 123,
      saves: 234
    },
    aiInsights: {
      sentiment: 'inspiring',
      impact: 'lifestyle-changing',
      reach: 'global community',
      trending: true
    }
  }
];

const categories = [
  { id: 'all', name: 'All Updates', icon: Globe },
  { id: 'career', name: 'Career', icon: Briefcase },
  { id: 'travel', name: 'Travel', icon: Plane },
  { id: 'events', name: 'Events', icon: Calendar },
  { id: 'achievements', name: 'Achievements', icon: Award }
];

export default function Feed() {
  const [posts, setPosts] = useState(mockPosts);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [newPostContent, setNewPostContent] = useState('');
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, stats: { ...post.stats, likes: post.stats.likes + 1 }} 
        : post
    ));
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-rose-900/20 to-orange-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* LifeStream Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-400 
            to-orange-300 bg-clip-text text-transparent">
            LifeStream
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Your window to the world
          </p>
        </div>
        <Dialog open={isCreatingPost} onOpenChange={setIsCreatingPost}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Share Moment
            </Button>
          </DialogTrigger>
          <CreatePostDialog />
        </Dialog>
      </div>

      {/* Category Navigation */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {categories.map(category => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            className="gap-2"
            onClick={() => setSelectedCategory(category.id)}
          >
            <category.icon className="h-4 w-4" />
            {category.name}
          </Button>
        ))}
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map(post => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{post.author.name}</span>
                      {post.author.verified && (
                        <Badge variant="outline" className="text-blue-500">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{post.author.role}</span>
                      {post.location && (
                        <>
                          <span>•</span>
                          <MapPin className="h-3 w-3" />
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Save Post</DropdownMenuItem>
                    <DropdownMenuItem>Share Post</DropdownMenuItem>
                    <DropdownMenuItem>Report</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Content */}
              <p className="mb-4">{post.content}</p>

              {/* Media Grid */}
              {post.media && post.media.length > 0 && (
                <div className={`grid gap-4 mb-4 ${
                  post.media.length > 1 ? 'grid-cols-2' : 'grid-cols-1'
                }`}>
                  {post.media.map((item, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden">
                      {item.type === 'image' ? (
                        <img
                          src={item.url}
                          alt={item.caption}
                          className="w-full h-64 object-cover"
                        />
                      ) : (
                        <video
                          src={item.url}
                          className="w-full h-64 object-cover"
                          controls
                        />
                      )}
                      {item.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-2 
                          bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-sm text-white">{item.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="hover:bg-white/10 
                    cursor-pointer transition-colors">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* AI Insights */}
              {post.aiInsights && (
                <Card className="p-4 mb-4 bg-gradient-to-r from-purple-500/10 
                  to-blue-500/10 border-purple-500/30">
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <span className="text-purple-400">AI Insights:</span>
                    <span className="text-muted-foreground">
                      {post.aiInsights.sentiment} • {post.aiInsights.impact}
                    </span>
                    {post.aiInsights.trending && (
                      <Badge variant="outline" className="ml-auto">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Trending
                      </Badge>
                    )}
                  </div>
                </Card>
              )}

              {/* Interaction Bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <Button variant="ghost" className="gap-2" 
                    onClick={() => handleLike(post.id)}>
                    <Heart className="h-4 w-4" />
                    {post.stats.likes}
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <MessageCircle className="h-4 w-4" />
                    {post.stats.comments}
                  </Button>
                  <Button variant="ghost" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    {post.stats.shares}
                  </Button>
                </div>
                <Button variant="ghost" className="gap-2">
                  <Bookmark className="h-4 w-4" />
                  {post.stats.saves}
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function CreatePostDialog() {
  return (
    <DialogContent className="max-w-2xl rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Share Your Moment</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <Input placeholder="What's on your mind?" className="min-h-[100px]" />
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1 gap-2">
            <ImageIcon className="h-4 w-4" />
            Add Photos
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <Video className="h-4 w-4" />
            Add Video
          </Button>
          <Button variant="outline" className="flex-1 gap-2">
            <MapPin className="h-4 w-4" />
            Add Location
          </Button>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" className="flex-1">Cancel</Button>
          <Button className="flex-1">Share</Button>
        </div>
      </div>
    </DialogContent>
  );
}
