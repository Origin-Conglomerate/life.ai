import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle,
  Phone,
  Video,
  Image as ImageIcon,
  File,
  Smile,
  Send,
  Mic,
  MapPin,
  Search,
  MoreVertical,
  Star,
  Clock,
  Check,
  CheckCheck,
  Lock,
  Brain,
  Zap,
  Globe,
  Archive,
  Bookmark,
  Share2,
  AlertCircle,
  Users,
  Download
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for chats and messages
const mockChats = [
  {
    id: '1',
    user: {
      id: 'user1',
      name: 'Dr. Elena Zhang',
      avatar: '/avatars/elena.jpg',
      status: 'online',
      lastSeen: new Date(),
      role: 'Quantum Physicist',
      verified: true
    },
    lastMessage: {
      content: 'The quantum entanglement experiment was successful! 🎉',
      timestamp: new Date('2024-03-20T15:45:00'),
      status: 'read'
    },
    unreadCount: 0,
    pinned: true,
    aiSummary: 'Scientific collaboration discussion about quantum physics research'
  },
  {
    id: '2',
    user: {
      id: 'user2',
      name: 'Marcus Chen',
      avatar: '/avatars/marcus.jpg',
      status: 'offline',
      lastSeen: new Date('2024-03-20T14:30:00'),
      role: 'AI Ethics Researcher',
      verified: true
    },
    lastMessage: {
      content: 'Lets discuss the ethical implications of the new AI model.',
      timestamp: new Date('2024-03-20T14:30:00'),
      status: 'sent'
    },
    unreadCount: 3,
    pinned: false,
    aiSummary: 'Discussion about AI ethics and future implications'
  }
];

const mockMessages = [
  {
    id: '1',
    senderId: 'user1',
    content: 'The quantum entanglement experiment was successful! 🎉',
    timestamp: new Date('2024-03-20T15:45:00'),
    status: 'read',
    type: 'text'
  },
  {
    id: '2',
    senderId: 'current_user',
    content: 'Thats amazing! What were the key findings?',
    timestamp: new Date('2024-03-20T15:46:00'),
    status: 'read',
    type: 'text'
  },
  {
    id: '3',
    senderId: 'user1',
    content: 'quantum-results.pdf',
    timestamp: new Date('2024-03-20T15:47:00'),
    status: 'read',
    type: 'file',
    fileType: 'pdf',
    fileSize: '2.4 MB'
  }
];

export default function Messaging() {
  const [chats, setChats] = useState(mockChats);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [messages, setMessages] = useState(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now().toString(),
      senderId: 'current_user',
      content: newMessage,
      timestamp: new Date(),
      status: 'sent',
      type: 'text'
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-violet-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 h-screen">
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
        {/* Chat List */}
        <Card className="lg:col-span-1 backdrop-blur-lg bg-white/5 p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-2">
                {chats.map(chat => (
                  <motion.div
                    key={chat.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <Card className={`p-4 cursor-pointer transition-colors ${
                      selectedChat === chat.id 
                        ? 'bg-violet-500/10 border-violet-500/30' 
                        : 'bg-white/5 hover:bg-white/10'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={chat.user.avatar} />
                            <AvatarFallback>{chat.user.name[0]}</AvatarFallback>
                          </Avatar>
                          {chat.user.status === 'online' && (
                            <div className="absolute bottom-0 right-0 h-3 w-3 
                              bg-green-500 rounded-full border-2 border-background" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="font-semibold truncate">
                              {chat.user.name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {chat.lastMessage.timestamp.toLocaleTimeString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground truncate">
                              {chat.lastMessage.content}
                            </p>
                            {chat.unreadCount > 0 && (
                              <Badge className="bg-violet-500">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </div>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-3 backdrop-blur-lg bg-white/5 p-4 flex flex-col">
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between mb-4 p-2">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={chats[0].user.avatar} />
                    <AvatarFallback>{chats[0].user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{chats[0].user.name}</span>
                      {chats[0].user.verified && (
                        <Badge variant="outline" className="text-blue-500">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {chats[0].user.status === 'online' ? 'Online' : 'Last seen recently'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Search in Chat</DropdownMenuItem>
                      <DropdownMenuItem>Mute Notifications</DropdownMenuItem>
                      <DropdownMenuItem>Block User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Messages Area */}
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4">
                  {messages.map(message => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.senderId === 'current_user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div className={`max-w-[70%] ${
                        message.senderId === 'current_user' 
                          ? 'bg-violet-500/20 rounded-l-2xl rounded-tr-2xl' 
                          : 'bg-white/10 rounded-r-2xl rounded-tl-2xl'
                      } p-4`}>
                        {message.type === 'text' ? (
                          <p>{message.content}</p>
                        ) : message.type === 'file' ? (
                          <div className="flex items-center gap-3 bg-white/5 
                            rounded-lg p-3">
                            <File className="h-8 w-8 text-violet-400" />
                            <div>
                              <p className="font-medium">{message.content}</p>
                              <p className="text-sm text-muted-foreground">
                                {message.fileSize}
                              </p>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : null}
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString()}
                          {message.senderId === 'current_user' && (
                            <div className="flex items-center">
                              {message.status === 'sent' && <Check className="h-3 w-3" />}
                              {message.status === 'read' && <CheckCheck className="h-3 w-3 text-blue-400" />}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Input Area */}
              <div className="mt-4 space-y-4">
                {/* AI Assistant Bar */}
                <Card className="p-3 bg-gradient-to-r from-violet-500/10 
                  to-blue-500/10 border-violet-500/30">
                  <div className="flex items-center gap-2 text-sm">
                    <Brain className="h-4 w-4 text-violet-400" />
                    <span className="text-violet-400">AI Assistant:</span>
                    <span className="text-muted-foreground">
                      Analyzing conversation context and suggesting responses...
                    </span>
                  </div>
                </Card>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <File className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  {newMessage ? (
                    <Button onClick={handleSend}>
                      <Send className="h-4 w-4" />
                    </Button>
                  ) : (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className={isRecording ? 'text-red-500' : ''}
                      onClick={() => setIsRecording(!isRecording)}
                    >
                      <Mic className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-muted-foreground">
              <MessageCircle className="h-16 w-16 mb-4" />
              <p>Select a conversation to start messaging</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
