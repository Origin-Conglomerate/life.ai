import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  AlertCircle,
  Activity,
  PieChart as PieIcon,
  BarChart2,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Zap,
  Globe,
  Clock,
  Target,
  Shield,
  Briefcase,
  Wallet,
  Plus,
  ChevronRight,
  Search,
  Filter,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Mock investment data
const portfolioData = {
  totalValue: 158420.75,
  todayChange: 2345.50,
  todayPercentage: 1.5,
  allTimeReturn: 23.4,
  riskLevel: 'Moderate',
  diversificationScore: 85,
  sectors: [
    { name: 'Technology', value: 35, color: '#3b82f6' },
    { name: 'Healthcare', value: 25, color: '#10b981' },
    { name: 'Finance', value: 20, color: '#f59e0b' },
    { name: 'Consumer', value: 15, color: '#8b5cf6' },
    { name: 'Energy', value: 5, color: '#ef4444' }
  ],
  holdings: [
    {
      id: '1',
      symbol: 'AAPL',
      name: 'Apple Inc.',
      shares: 50,
      avgPrice: 150.25,
      currentPrice: 175.45,
      dayChange: 2.3,
      totalValue: 8772.50,
      weight: 15.2,
      aiSentiment: 'Strong Buy',
      riskScore: 72
    },
    {
      id: '2',
      symbol: 'NVDA',
      name: 'NVIDIA Corporation',
      shares: 25,
      avgPrice: 220.50,
      currentPrice: 450.75,
      dayChange: 3.8,
      totalValue: 11268.75,
      weight: 12.8,
      aiSentiment: 'Buy',
      riskScore: 85
    }
  ],
  watchlist: [
    {
      symbol: 'TSLA',
      name: 'Tesla, Inc.',
      currentPrice: 242.50,
      dayChange: -1.2,
      aiRecommendation: 'Watch',
      momentum: 'Neutral'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      currentPrice: 338.75,
      dayChange: 1.8,
      aiRecommendation: 'Strong Buy',
      momentum: 'Positive'
    }
  ],
  performanceHistory: [
    { date: '2024-01', value: 142000 },
    { date: '2024-02', value: 148000 },
    { date: '2024-03', value: 158420 }
  ],
  aiInsights: [
    {
      type: 'opportunity',
      title: 'AI Sector Growth',
      description: 'Consider increasing exposure to AI-focused companies',
      impact: 'High',
      confidence: 92
    },
    {
      type: 'risk',
      title: 'Market Volatility',
      description: 'Higher than usual market volatility expected',
      impact: 'Medium',
      confidence: 85
    }
  ]
};

export default function SharesStocksTrading() {
  const [activeTab, setActiveTab] = useState('portfolio');
  const [selectedTimeframe, setSelectedTimeframe] = useState('1M');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-emerald-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* Portfolio Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Portfolio Value</div>
            <div className="text-3xl font-bold">
              ${portfolioData.totalValue.toLocaleString()}
            </div>
            <div className={`flex items-center gap-2 ${
              portfolioData.todayChange >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {portfolioData.todayChange >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              <span>${Math.abs(portfolioData.todayChange).toLocaleString()}</span>
              <span>({portfolioData.todayPercentage}%)</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">All-Time Return</div>
            <div className="text-3xl font-bold text-green-500">
              +{portfolioData.allTimeReturn}%
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>Risk Level: {portfolioData.riskLevel}</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="space-y-2">
            <div className="text-sm text-muted-foreground">Diversification</div>
            <div className="text-3xl font-bold">
              {portfolioData.diversificationScore}/100
            </div>
            <Progress value={portfolioData.diversificationScore} className="h-2" />
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="space-y-4">
            <div className="text-sm text-muted-foreground">AI Market Pulse</div>
            <div className="flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-400" />
              <div className="text-lg font-semibold">Bullish Trend</div>
            </div>
            <Badge className="bg-green-500/10 text-green-500">
              87% Confidence
            </Badge>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio Performance */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Portfolio Performance</h3>
            <div className="flex items-center gap-2">
              {['1D', '1W', '1M', '3M', '1Y', 'ALL'].map(timeframe => (
                <Button
                  key={timeframe}
                  variant={selectedTimeframe === timeframe ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedTimeframe(timeframe)}
                >
                  {timeframe}
                </Button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioData.performanceHistory}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sector Allocation */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6">Sector Allocation</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={portfolioData.sectors}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {portfolioData.sectors.map((sector, index) => (
                  <Cell key={index} fill={sector.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-4 mt-6">
            {portfolioData.sectors.map(sector => (
              <div key={sector.name} className="flex items-center gap-2">
                <div 
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: sector.color }}
                />
                <span className="text-sm">{sector.name}</span>
                <span className="text-sm text-muted-foreground ml-auto">
                  {sector.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Holdings & Watchlist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holdings */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Holdings</h3>
            <Input
              placeholder="Search holdings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-xs"
            />
          </div>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {portfolioData.holdings.map(holding => (
                <Card key={holding.id} className="p-4 bg-white/5">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{holding.symbol}</span>
                        <span className="text-muted-foreground">{holding.name}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {holding.shares} shares @ ${holding.avgPrice}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">
                        ${holding.totalValue.toLocaleString()}
                      </div>
                      <div className={`text-sm ${
                        holding.dayChange >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {holding.dayChange >= 0 ? '+' : ''}{holding.dayChange}%
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <Badge 
                      variant="outline" 
                      className={`${
                        holding.aiSentiment === 'Strong Buy' 
                          ? 'border-green-500/30 bg-green-500/10 text-green-500'
                          : 'border-blue-500/30 bg-blue-500/10 text-blue-500'
                      }`}
                    >
                      <Brain className="h-3 w-3 mr-1" />
                      {holding.aiSentiment}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">
                        Risk Score:
                      </span>
                      <Progress value={holding.riskScore} className="w-20 h-2" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* AI Insights */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6">AI Market Insights</h3>
          <ScrollArea className="h-[400px]">
            <div className="space-y-4">
              {portfolioData.aiInsights.map((insight, index) => (
                <Card key={index} className={`p-4 ${
                  insight.type === 'opportunity' 
                    ? 'bg-green-500/10 border-green-500/30'
                    : 'bg-red-500/10 border-red-500/30'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    {insight.type === 'opportunity' ? (
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="font-semibold">{insight.title}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {insight.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">
                      Impact: {insight.impact}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm">
                      <Brain className="h-3 w-3" />
                      {insight.confidence}% Confidence
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex gap-3">
        <Button className="rounded-full shadow-lg gap-2">
          <Plus className="h-4 w-4" />
          New Trade
        </Button>
        <Button variant="outline" className="rounded-full shadow-lg">
          <Bell className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
