// components/PersonalLocker.tsx
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Folder,
  File,
  Lock,
  Search,
  Fingerprint,
  Shield,
  Brain,
  Scan,
  Binary,
  Database,
  Key,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipProvider, TooltipContent } from '@/components/ui/tooltip';
import img from "@/assets/login/cover1.jpeg";

interface LockerFile {
  id: string;
  name: string;
  type: 'document' | 'image' | 'video' | 'certificate' | 'other';
  size: string;
  category: string;
  encrypted: boolean;
  passkey?: string;
  preview?: string;
  lastModified: Date;
  aiTags?: string[];
}

const mockFiles: LockerFile[] = [
  {
    id: '1',
    name: 'Passport.pdf',
    type: 'document',
    size: '2.4 MB',
    category: 'Travel',
    encrypted: true,
    passkey: 'travel2024',
    lastModified: new Date(),
    aiTags: ['identity', 'government', 'emergency']
  },
  {
    id: '2',
    name: 'Medical_Records.zip',
    type: 'other',
    size: '15.8 MB',
    category: 'Health',
    encrypted: true,
    passkey: 'health#secure',
    lastModified: new Date(),
    aiTags: ['confidential', 'history', 'prescriptions']
  },
  {
    id: '3',
    name: 'Birth_Certificate.jpg',
    type: 'image',
    size: '4.2 MB',
    category: 'Personal',
    encrypted: false,
    lastModified: new Date(),
    aiTags: ['identity', 'legal', 'original']
  }
];

export default function PersonalVault() {
  const [files, setFiles] = useState<LockerFile[]>(mockFiles);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<LockerFile | null>(null);
  const [passkey, setPasskey] = useState('');
  const [lockedFiles, setLockedFiles] = useState<string[]>(['1', '2']);
  const [viewMode, setViewMode] = useState<'grid' | 'hologram'>('grid');
  const [biometricUnlock, setBiometricUnlock] = useState(false);

  const unlockFile = (fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.passkey === passkey) {
      setLockedFiles(prev => prev.filter(id => id !== fileId));
      setPasskey('');
    }
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-gray-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8 h-screen">
      
      {/* Quantum Locker Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            NeuroVault
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Shield className="h-4 w-4 mr-2" />
              Military-Grade Encryption
            </Badge>
            <span className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              23.4 GB / 50 GB Used
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <Scan className="h-4 w-4" />
            AI Scan
          </Button>
          <Button className="gap-2">
            <Fingerprint className="h-4 w-4" />
            Add Biometric
          </Button>
        </div>
      </div>

      {/* Quantum Interface Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[70vh]">
        {/* File Quantum Matrix */}
        <div className="lg:col-span-1 space-y-6">
          <div className="relative">
            <Input
              placeholder="Neural Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          </div>

          <ScrollArea className="h-[60vh]">
            <div className="space-y-4">
              {files.map(file => (
                <motion.div
                  key={file.id}
                  whileHover={{ scale: 1.02 }}
                  className="relative"
                >
                  <Card
                    className={`p-4 backdrop-blur-lg cursor-pointer transition-all
                      ${selectedFile?.id === file.id 
                        ? 'bg-blue-500/10 border-blue-500/30' 
                        : 'bg-white/5 hover:bg-white/10'}`}
                    onClick={() => setSelectedFile(file)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 rounded-lg bg-blue-500/10">
                        {file.type === 'document' ? (
                          <File className="h-6 w-6 text-blue-400" />
                        ) : file.type === 'image' ? (
                          <Scan className="h-6 w-6 text-purple-400" />
                        ) : (
                          <Binary className="h-6 w-6 text-green-400" />
                        )}
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-medium">{file.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{file.size}</span>
                          <span>•</span>
                          <span>{file.category}</span>
                          {file.encrypted && (
                            <Lock className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                      </div>
                    </div>
                    {lockedFiles.includes(file.id) && (
                      <div className="absolute top-2 right-2">
                        <div className="h-3 w-3 bg-red-500 rounded-full animate-pulse" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Holographic Preview */}
        <div className="lg:col-span-3 relative rounded-2xl overflow-hidden
          bg-gradient-to-br from-blue-500/10 to-purple-500/10
          border border-white/10 backdrop-blur-lg">
          
          <div className="absolute inset-0 flex items-center justify-center">
            {selectedFile ? (
              <div className="p-8 space-y-6 w-full h-full">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">{selectedFile.name}</h2>
                  <Badge variant="outline" className="border-blue-500/30">
                    {selectedFile.category}
                  </Badge>
                </div>

                {lockedFiles.includes(selectedFile.id) ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center space-y-6"
                  >
                    <div className="relative">
                      <Lock className="h-24 w-24 text-blue-400" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-purple-500/20 rounded-full animate-pulse" />
                    </div>
                    <div className="space-y-4 w-80">
                      <Input
                        type="password"
                        placeholder="Enter Quantum Passkey"
                        value={passkey}
                        onChange={(e) => setPasskey(e.target.value)}
                        className="text-center"
                      />
                      <Button 
                        className="w-full gap-2"
                        onClick={() => unlockFile(selectedFile.id)}
                      >
                        <Key className="h-4 w-4" />
                        Decrypt File
                      </Button>
                      <Button variant="outline" className="w-full gap-2">
                        <Fingerprint className="h-4 w-4" />
                        Biometric Unlock
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col space-y-6"
                  >
                    <div className="flex-1 bg-white/5 rounded-xl p-4">
                      {selectedFile.type === 'image' ? (
                        <img 
                          src={selectedFile.preview || img} 
                          className="h-full w-full object-contain rounded-lg"
                          alt="Preview"
                        />
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground">
                          File Preview
                        </div>
                      )}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <Card className="p-4 backdrop-blur-lg bg-white/5">
                        <div className="space-y-1">
                          <h3 className="text-sm text-muted-foreground">AI Tags</h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedFile.aiTags?.map(tag => (
                              <Badge key={tag} variant="outline">{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 backdrop-blur-lg bg-white/5">
                        <div className="space-y-1">
                          <h3 className="text-sm text-muted-foreground">Security</h3>
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-green-500" />
                            <span>256-bit AES Encrypted</span>
                          </div>
                        </div>
                      </Card>
                      <Card className="p-4 backdrop-blur-lg bg-white/5">
                        <div className="space-y-1">
                          <h3 className="text-sm text-muted-foreground">Actions</h3>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Share</Button>
                            <Button variant="outline" size="sm">Export</Button>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-4 text-muted-foreground">
                <Folder className="h-16 w-16" />
                <p>Select a file from the Quantum Matrix</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DNA Encryption Footer */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
            <span>Quantum Tunnel Active</span>
          </div>
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-purple-400" />
            <span>AI Auto-Tagging Enabled</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-blue-400" />
          <span>Zero-Knowledge Encryption Protocol</span>
        </div>
      </div>

      {/* Floating Quantum Actions */}
      <div className="absolute bottom-6 right-6 flex gap-3">
        <TooltipProvider>
        <Tooltip>
            <TooltipContent>
          <Button className="rounded-full h-12 w-12 p-0 shadow-lg">
            <Plus className="h-6 w-6" />
          </Button>
          </TooltipContent>
        </Tooltip>
        </TooltipProvider>
      </div>

      {/* Particle Background */}
      <div className="absolute inset-0 -z-10 opacity-20">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`
            }}
          />
        ))}
      </div>
    </div>
  );
}