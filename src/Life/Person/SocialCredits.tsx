// components/LifeScore.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer
} from 'recharts';
import {
  Trophy,
  Sparkles,
  Globe,
  Medal,
  Gift,
  Shield,
  Star,
  Zap,
  Rocket,
  BadgeCheck,
  Users
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import { Progress } from '@/components/ui/progress';
  

// Mock data
const scoreData = {
  currentScore: 784,
  maxScore: 1000,
  tier: 'Diamond',
  progress: 78.4,
  globalRank: 142,
  percentile: 97.8,
  rewards: [
    { id: 1, name: 'Global Citizen Pass', points: 800, claimed: false },
    { id: 2, name: 'Luxury World Tour', points: 950, claimed: false },
    { id: 3, name: 'AI Concierge Year', points: 1000, claimed: false }
  ],
  badges: [
    { id: 1, name: 'Earth Guardian', icon: '🌍', progress: 100 },
    { id: 2, name: 'Health Hero', icon: '🦸', progress: 85 },
    { id: 3, name: 'Financial Guru', icon: '💸', progress: 92 },
    { id: 4, name: 'Social Catalyst', icon: '🤝', progress: 78 }
  ],
  leaderboard: [
    { rank: 1, name: 'Sarah K.', score: 992, tier: 'Diamond' },
    { rank: 2, name: 'Mike R.', score: 965, tier: 'Diamond' },
    { rank: 3, name: 'Emma L.', score: 958, tier: 'Diamond' },
    { rank: 142, name: 'You', score: 784, tier: 'Platinum' }
  ],
  tiers: [
    { name: 'Bronze', min: 0, max: 399, rewards: ['Basic Cashback'] },
    { name: 'Silver', min: 400, max: 599, rewards: ['Travel Discounts'] },
    { name: 'Gold', min: 600, max: 799, rewards: ['VIP Services'] },
    { name: 'Platinum', min: 800, max: 899, rewards: ['Global Access'] },
    { name: 'Diamond', min: 900, max: 1000, rewards: ['Elite Experiences'] }
  ]
};

export default function SocialCredits() {
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'global' | 'community'>('global');

  const RadialScore = () => (
    <div className="relative h-64 w-64">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="70%"
          outerRadius="100%"
          data={[{ value: scoreData.progress }]}
          startAngle={180}
          endAngle={-180}
        >
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill="url(#scoreGradient)"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-4xl font-bold">{scoreData.currentScore}</div>
        <div className="text-muted-foreground">LifeScore</div>
        <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-500">
          {scoreData.tier} Tier
        </Badge>
      </div>
      <defs>
        <linearGradient id="scoreGradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </div>
  );

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-purple-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* Quantum Score Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 
            to-blue-300 bg-clip-text text-transparent">
            Quantum LifeScore
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500 animate-pulse" />
            Real-time Social Impact Tracking Active
          </p>
        </div>
        <Badge variant="outline" className="border-purple-500/30 bg-purple-500/10">
          AI-Impact 5.0 Enabled
        </Badge>
      </motion.div>

      {/* Core Score Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holographic Score Sphere */}
        <div className="lg:col-span-2 flex justify-center">
          <RadialScore />
        </div>

        {/* Social Impact Badges */}
        <div className="grid grid-cols-2 gap-4">
          {scoreData.badges.map(badge => (
            <motion.div
              key={badge.id}
              whileHover={{ scale: 1.05 }}
              className="relative group"
            >
              <Card className="p-4 backdrop-blur-lg bg-white/5 hover:bg-white/10 
                transition-colors cursor-pointer"
                onClick={() => setSelectedBadge(badge.id)}>
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{badge.icon}</div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{badge.name}</h3>
                    <Progress value={badge.progress} className="h-2" />
                  </div>
                </div>
                {badge.progress === 100 && (
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-5 w-5 text-yellow-500 animate-spin" />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Universal Impact Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tier Galaxy */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-purple-400" />
            Ascension Matrix
          </h3>
          <div className="space-y-6">
            <div className="relative h-2 rounded-full bg-white/5">
              <div 
                className="absolute h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                style={{ width: `${scoreData.progress}%` }}
              />
            </div>
            <div className="grid grid-cols-5 gap-4 text-center">
              {scoreData.tiers.map(tier => (
                <div key={tier.name} className="space-y-2">
                  <div className={`mx-auto h-8 w-8 rounded-full flex items-center justify-center
                    ${scoreData.tier === tier.name 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-500' 
                      : 'bg-white/5'}`}>
                    <Shield className="h-4 w-4" />
                  </div>
                  <p className="text-sm">{tier.name}</p>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Universal Leaderboard */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-400" />
              Universal Leaderboard
            </h3>
            <div className="flex gap-2">
              <Button 
                variant={viewMode === 'global' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('global')}
              >
                Global
              </Button>
              <Button 
                variant={viewMode === 'community' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setViewMode('community')}
              >
                Community
              </Button>
            </div>
          </div>
          
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Tier</TableHead>
                <TableHead className="text-right">Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scoreData.leaderboard.map(entry => (
                <TableRow key={entry.rank} className={entry.name === 'You' ? 'bg-purple-500/10' : ''}>
                  <TableCell>
                    {entry.rank === 1 ? <Trophy className="h-5 w-5 text-yellow-500" /> : entry.rank}
                  </TableCell>
                  <TableCell className="font-medium">{entry.name}</TableCell>
                  <TableCell>{entry.score}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-blue-500/30 bg-blue-500/10">
                      {entry.tier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Progress value={(entry.score / 1000) * 100} className="h-2 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* Quantum Rewards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {scoreData.rewards.map(reward => (
          <motion.div
            key={reward.id}
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <Card className="p-6 backdrop-blur-lg bg-white/5 hover:bg-white/10 
              transition-colors h-full">
              <div className="flex flex-col h-full justify-between">
                <div className="space-y-4">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/10 
                    to-purple-500/10 w-max">
                    <Gift className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold">{reward.name}</h3>
                  <div className="flex items-center gap-2">
                    <Medal className="h-5 w-5 text-yellow-500" />
                    <span className="text-muted-foreground">
                      {reward.points} LifeScore Required
                    </span>
                  </div>
                </div>
                <Button 
                  className="mt-4 w-full" 
                  disabled={scoreData.currentScore < reward.points}
                >
                  {reward.claimed ? 'Claimed' : 'Unlock Reward'}
                </Button>
              </div>
              {!reward.claimed && scoreData.currentScore >= reward.points && (
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-5 w-5 text-yellow-500 animate-pulse" />
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Impact Assistant */}
      <motion.div
        className="absolute bottom-6 right-6 flex gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="default" className="shadow-lg gap-2">
          <Zap className="h-4 w-4" />
          Generate Impact Report
        </Button>
      </motion.div>
    </div>
  );
}