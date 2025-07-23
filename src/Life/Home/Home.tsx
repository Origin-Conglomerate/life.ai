import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer
} from 'recharts';
import {
  Home,
  Lightbulb,
  Thermometer,
  Lock,
  Shield,
  Users,
  Calendar,
  AlertTriangle,
  Battery,
  Wifi,
  Droplet,
  Wind,
  Sun,
  Moon,
  Clock,
  ShoppingCart,
  Trash,
  Camera,
  Brain,
  Zap,
  Settings,
  Plus,
  Sprout,
  Hammer
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

// Mock home data
const homeData = {
  smartHome: {
    temperature: 22.5,
    humidity: 45,
    lighting: {
      livingRoom: true,
      kitchen: false,
      bedrooms: true,
      outdoor: false
    },
    security: {
      doorsLocked: true,
      camerasActive: true,
      motionDetected: false,
      lastEvent: '2024-03-20T15:30:00'
    },
    energy: {
      currentUsage: 3.2,
      dailyAverage: 12.5,
      solarGeneration: 2.8,
      batteryLevel: 85
    }
  },
  maintenance: [
    {
      id: '1',
      title: 'HVAC Filter Change',
      dueDate: '2024-04-01',
      priority: 'high',
      status: 'pending',
      cost: 50
    },
    {
      id: '2',
      title: 'Garden Sprinkler Check',
      dueDate: '2024-03-25',
      priority: 'medium',
      status: 'scheduled',
      cost: 30
    }
  ],
  inventory: {
    groceries: [
      { item: 'Milk', quantity: 2, expiry: '2024-03-25' },
      { item: 'Bread', quantity: 1, expiry: '2024-03-22' }
    ],
    supplies: [
      { item: 'Paper Towels', quantity: 4 },
      { item: 'Laundry Detergent', quantity: 1 }
    ]
  },
  familySchedule: [
    {
      member: 'Dad',
      events: [
        { title: 'Work Meeting', time: '09:00', location: 'Home Office' },
        { title: 'Soccer Practice', time: '17:00', location: 'Park' }
      ]
    },
    {
      member: 'Mom',
      events: [
        { title: 'Yoga Class', time: '08:00', location: 'Living Room' },
        { title: 'Grocery Shopping', time: '16:00', location: 'Supermarket' }
      ]
    }
  ],
  aiInsights: [
    {
      type: 'energy',
      title: 'Peak Usage Alert',
      description: 'High energy consumption predicted between 18:00-20:00',
      recommendation: 'Consider shifting laundry to off-peak hours',
      impact: 'Save up to 15% on energy costs'
    },
    {
      type: 'security',
      title: 'Pattern Detected',
      description: 'Unusual activity near garage door at night',
      recommendation: 'Consider installing additional motion sensor',
      impact: 'Enhance security coverage by 30%'
    }
  ],
  sustainability: {
    solarEfficiency: 92,
    waterUsage: {
      current: 250,
      average: 300,
      trend: 'decreasing'
    },
    wasteManagement: {
      recycling: 75,
      compost: 60,
      general: 40
    }
  },
  keyMetrics: {
    residents: {
      total: 4,
      adults: 2,
      children: 2
    },
    property: {
      area: 2400, // sq ft
      bedrooms: 4,
      bathrooms: 3,
      yearBuilt: 2015
    },
    monthlyExpenses: {
      mortgage: 2500,
      electricity: 180,
      water: 75,
      internet: 89,
      groceries: 850,
      maintenance: 200
    },
    taxes: {
      propertyTax: 6000, // annual
      lastPaid: '2024-02-15',
      nextDue: '2024-07-15'
    }
  }
};

export default function HomeDashboard() {
  const [activeZone, setActiveZone] = useState('living');
  const [aiMode, setAiMode] = useState(true);
  const [viewMode, setViewMode] = useState<'dashboard' | 'floorplan'>('dashboard');
  
  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-emerald-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Smart Home Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 
            to-blue-300 bg-clip-text text-transparent">
            NeuroHome Hub
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-green-500/10 text-green-500">
              <Zap className="h-4 w-4 mr-2" />
              Energy Optimal
            </Badge>
            <span className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security Active
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setViewMode(v => v === 'dashboard' ? 'floorplan' : 'dashboard')}>
            {viewMode === 'dashboard' ? 'Floor Plan' : 'Dashboard'}
          </Button>
          <Switch checked={aiMode} onCheckedChange={setAiMode} />
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Climate Control */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Thermometer className="h-5 w-5 text-blue-400" />
            Climate Control
          </h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold">
                {homeData.smartHome.temperature}°C
              </div>
              <div className="flex items-center gap-4">
                <Droplet className="h-6 w-6 text-blue-400" />
                <span>{homeData.smartHome.humidity}%</span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={[
                { time: '00:00', temp: 21 },
                { time: '06:00', temp: 20 },
                { time: '12:00', temp: 23 },
                { time: '18:00', temp: 22 },
                { time: '24:00', temp: 21 }
              ]}>
                <Area
                  type="monotone"
                  dataKey="temp"
                  stroke="#3b82f6"
                  fill="url(#tempGradient)"
                />
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Energy Management */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Battery className="h-5 w-5 text-green-400" />
            Energy Matrix
          </h3>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold">
                  {homeData.smartHome.energy.currentUsage}kW
                </div>
                <div className="text-sm text-muted-foreground">Current Usage</div>
              </div>
              <div className="p-4 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">
                  {homeData.smartHome.energy.solarGeneration}kW
                </div>
                <div className="text-sm text-muted-foreground">Solar Input</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Battery Level</span>
                <span>{homeData.smartHome.energy.batteryLevel}%</span>
              </div>
              <Progress value={homeData.smartHome.energy.batteryLevel} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Security Overview */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-purple-400" />
            Security Matrix
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className={`h-16 ${
                homeData.smartHome.security.doorsLocked 
                  ? 'bg-green-500/10 border-green-500/30' 
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <Lock className="h-6 w-6 mr-2" />
                All Doors
              </Button>
              <Button variant="outline" className={`h-16 ${
                homeData.smartHome.security.camerasActive
                  ? 'bg-green-500/10 border-green-500/30'
                  : 'bg-red-500/10 border-red-500/30'
              }`}>
                <Camera className="h-6 w-6 mr-2" />
                Cameras
              </Button>
            </div>
            {homeData.smartHome.security.motionDetected && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <div>
                    <div className="font-medium">Motion Detected</div>
                    <div className="text-sm text-muted-foreground">
                      Front Door - 2 minutes ago
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Residents & Property */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-indigo-400" />
            Household
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Residents</span>
              <span className="font-semibold">{homeData.keyMetrics.residents.total} people</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Area</span>
              <span className="font-semibold">{homeData.keyMetrics.property.area} sq ft</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Rooms</span>
              <span className="font-semibold">{homeData.keyMetrics.property.bedrooms}bd {homeData.keyMetrics.property.bathrooms}ba</span>
            </div>
          </div>
        </Card>

        {/* Monthly Expenses */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-rose-400" />
            Monthly Expenses
          </h3>
          <div className="space-y-2">
            {Object.entries(homeData.keyMetrics.monthlyExpenses).map(([key, value]) => (
              <div key={key} className="flex justify-between items-center">
                <span className="text-muted-foreground capitalize">{key}</span>
                <span className="font-semibold">${value}</span>
              </div>
            ))}
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="font-bold">
                  ${Object.values(homeData.keyMetrics.monthlyExpenses).reduce((a, b) => a + b, 0)}
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Utilities Usage */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Utilities
          </h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Electricity - ${homeData.keyMetrics.monthlyExpenses.electricity}</span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30">
                    paid
                </Badge>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Water - ${homeData.keyMetrics.monthlyExpenses.water}</span>
                <span></span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30">
                    paid
                </Badge>
              </div>
              <Progress value={60} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Internet - ${homeData.keyMetrics.monthlyExpenses.internet}</span>
                <Badge variant="outline" className="bg-green-500/10 border-green-500/30">
                    paid
                </Badge>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </div>
        </Card>

        {/* Tax Information */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-emerald-400" />
            Property Tax
          </h3>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-emerald-500/10">
              <div className="text-2xl font-bold">
                ${homeData.keyMetrics.taxes.propertyTax}
              </div>
              <div className="text-sm text-muted-foreground">Annual Tax</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Last Paid</span>
                <span>{new Date(homeData.keyMetrics.taxes.lastPaid).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Next Due</span>
                <span>{new Date(homeData.keyMetrics.taxes.nextDue).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Secondary Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Maintenance Hub */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Hammer className="h-5 w-5 text-orange-400" />
            Maintenance Schedule
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-4">
              {homeData.maintenance.map(task => (
                <motion.div
                  key={task.id}
                  whileHover={{ scale: 1.02 }}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">{task.title}</div>
                      <div className="text-sm text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                    <Badge variant="outline" className={
                      task.priority === 'high' 
                        ? 'border-red-500/30 bg-red-500/10'
                        : 'border-yellow-500/30 bg-yellow-500/10'
                    }>
                      {task.priority}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Family Schedule */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-400" />
            Family Sync
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-6">
              {homeData.familySchedule.map((member, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{member.member[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{member.member}</span>
                  </div>
                  <div className="ml-12 space-y-2">
                    {member.events.map((event, eventIndex) => (
                      <div key={eventIndex} className="p-3 rounded-lg bg-white/5">
                        <div className="font-medium">{event.title}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.time} - {event.location}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* AI Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {homeData.aiInsights.map((insight, index) => (
          <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center gap-2 mb-4">
              <Brain className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold">{insight.title}</h3>
            </div>
            <p className="text-muted-foreground mb-4">{insight.description}</p>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/30">
                <div className="font-medium">Recommendation</div>
                <div className="text-sm text-muted-foreground">
                  {insight.recommendation}
                </div>
              </div>
              <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/30">
                <div className="font-medium">Impact</div>
                <div className="text-sm text-muted-foreground">
                  {insight.impact}
                </div>
              </div>
            </div>
          </Card>
        ))}

        {/* Sustainability Score */}
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center gap-2 mb-4">
            <Sprout className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold">Eco Impact</h3>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-lg bg-green-500/10">
                <div className="text-2xl font-bold">
                  {homeData.sustainability.solarEfficiency}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Solar Efficiency
                </div>
              </div>
              <div className="p-3 rounded-lg bg-blue-500/10">
                <div className="text-2xl font-bold">
                  {homeData.sustainability.waterUsage.current}L
                </div>
                <div className="text-sm text-muted-foreground">
                  Water Usage
                </div>
              </div>
              <div className="p-3 rounded-lg bg-purple-500/10">
                <div className="text-2xl font-bold">
                  {homeData.sustainability.wasteManagement.recycling}%
                </div>
                <div className="text-sm text-muted-foreground">
                  Recycling Rate
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Floating Action Button */}
      <Button className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 
        shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>

      {/* Background Effects */}
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
