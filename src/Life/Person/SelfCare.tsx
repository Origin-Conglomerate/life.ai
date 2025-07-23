// components/SelfCare.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    RadialBarChart,
    RadialBar,
    AreaChart,
    Area,
    ResponsiveContainer
} from 'recharts';
import {
    Droplet,
    Moon,
    Sunset,
    Laptop,
    Activity,
    Brain,
    AlertCircle,
    Clock,
    HeartPulse,
    Zap
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tooltip, TooltipProvider } from '@/components/ui/tooltip';
import { TooltipContent } from '@radix-ui/react-tooltip';

// Mock biometric data
const wellnessData = {
    daily: {
        sleep: { current: 6.2, goal: 8, quality: 84 },
        water: { current: 5, goal: 8 },
        activity: { calories: 420, goal: 500, steps: 8432 },
        screenTime: { current: 3.1, goal: 2 },
        mindfulness: { minutes: 12, goal: 20 }
    },
    trends: [
        { day: 'Mon', sleep: 7, water: 8, activity: 90, screen: 2.5 },
        { day: 'Tue', sleep: 6.5, water: 7, activity: 85, screen: 3 },
        { day: 'Wed', sleep: 5.8, water: 6, activity: 70, screen: 4 },
        { day: 'Thu', sleep: 7.2, water: 8, activity: 95, screen: 2 },
        { day: 'Fri', sleep: 6.8, water: 7.5, activity: 88, screen: 2.8 },
        { day: 'Sat', sleep: 8.5, water: 9, activity: 60, screen: 1.5 },
        { day: 'Sun', sleep: 7, water: 8, activity: 75, screen: 2 }
    ]
};

export function SelfCare() {
    const [activeMetric, setActiveMetric] = useState('sleep');
    const [isHolographic, setIsHolographic] = useState(true);

    const MetricRadial = ({ value, goal, icon, color }: {
        value: number;
        goal: number;
        icon: React.ReactNode;
        color: string;
    }) => (
        <div className="relative">
            <ResponsiveContainer width="100%" height={120}>
                <RadialBarChart
                    innerRadius="70%"
                    outerRadius="100%"
                    data={[{ value: (value / goal) * 100 }]}
                    startAngle={180}
                    endAngle={-180}
                >
                    <RadialBar
                        background
                        dataKey="value"
                        cornerRadius={10}
                        fill={color}
                        className="transition-all duration-300"
                    />
                </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                {icon}
                <span className="text-lg font-bold mt-1">{value}/{goal}</span>
            </div>
        </div>
    );

    return (
        <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

            {/* Holographic Header */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center justify-between"
            >
                <div className="space-y-1">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
                        NeuroWellness Hub
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
                        Real-time Biometric Integration Active
                    </p>
                </div>
                <Badge variant="outline" className="border-green-500/30 bg-green-500/10">
                    AI-Care 3.0 Enabled
                </Badge>
            </motion.div>

            {/* Quantum Wellness Galaxy */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Central Hologram */}
                <div className="relative lg:col-span-2 h-96 rounded-2xl overflow-hidden
          bg-gradient-to-br from-blue-500/10 to-purple-500/10
          border border-white/10 backdrop-blur-lg">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400/20 
                to-purple-500/20 border-2 border-white/10"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center 
              space-y-4">
                            <Avatar className="h-32 w-32 border-4 border-white/20">
                                <AvatarImage src="/bio-hologram.png" />
                                <AvatarFallback className="bg-gradient-to-br from-blue-400 
                  to-purple-500 animate-pulse" />
                            </Avatar>
                            <span className="text-lg font-semibold">Live Biofeedback</span>
                            <div className="flex gap-4">
                                <Button variant="ghost" size="sm" className="gap-2">
                                    <HeartPulse className="h-4 w-4" />
                                    Scan Body
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orbital Metrics */}
                <div className="space-y-6">
                    {[
                        {
                            id: 'sleep',
                            icon: <Moon className="h-6 w-6 text-blue-400" />,
                            color: '#60a5fa'
                        },
                        {
                            id: 'water',
                            icon: <Droplet className="h-6 w-6 text-blue-400" />,
                            color: '#3b82f6'
                        },
                        {
                            id: 'activity',
                            icon: <Activity className="h-6 w-6 text-purple-400" />,
                            color: '#a855f7'
                        },
                        {
                            id: 'screenTime',
                            icon: <Laptop className="h-6 w-6 text-red-400" />,
                            color: '#ef4444'
                        }
                    ].map((metric, index) => (
                        <motion.div
                            key={metric.id}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer"
                            onClick={() => setActiveMetric(metric.id)}
                        >
                            <Card className="p-4 backdrop-blur-lg bg-white/5 hover:bg-white/10 
                transition-colors">
                                <MetricRadial
                                    value={wellnessData.daily[metric.id].current}
                                    goal={wellnessData.daily[metric.id].goal}
                                    icon={metric.icon}
                                    color={metric.color}
                                />
                                <div className="mt-2 text-center text-sm">
                                    {metric.id === 'screenTime' ? (
                                        <span className="text-red-400">
                                            +{wellnessData.daily.screenTime.current - wellnessData.daily.screenTime.goal}h
                                        </span>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            {((wellnessData.daily[metric.id].current / wellnessData.daily[metric.id].goal) * 100).toFixed(0)}%
                                        </span>
                                    )}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* AI Wellness Timeline */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Brain className="h-5 w-5 text-purple-400" />
                            NeuroPattern Timeline
                        </h3>
                        <div className="flex gap-2">
                            <Button variant="outline" size="sm">Week</Button>
                            <Button variant="outline" size="sm">Month</Button>
                        </div>
                    </div>
                    <ResponsiveContainer width="100%" height={200}>
                        <AreaChart data={wellnessData.trends}>
                            <Area
                                type="monotone"
                                dataKey="sleep"
                                stackId="1"
                                fill="#3b82f6"
                                stroke="#3b82f6"
                                fillOpacity={0.2}
                            />
                            <Area
                                type="monotone"
                                dataKey="water"
                                stackId="1"
                                fill="#60a5fa"
                                stroke="#60a5fa"
                                fillOpacity={0.2}
                            />
                            <Area
                                type="monotone"
                                dataKey="activity"
                                stackId="1"
                                fill="#a855f7"
                                stroke="#a855f7"
                                fillOpacity={0.2}
                            />
                            <Area
                                type="monotone"
                                dataKey="screen"
                                stackId="1"
                                fill="#ef4444"
                                stroke="#ef4444"
                                fillOpacity={0.2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Card>

                {/* AI Recommendations */}
                <Card className="p-6 backdrop-blur-lg bg-white/5 space-y-6">
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                            Critical Alerts
                        </h3>
                        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                            <div className="flex items-center gap-3">
                                <Droplet className="h-6 w-6 text-red-500" />
                                <div>
                                    <h4 className="font-semibold">Hydration Emergency</h4>
                                    <p className="text-sm">42% below daily requirement</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2">
                            <Zap className="h-5 w-5 text-yellow-500" />
                            Instant Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-12 gap-2">
                                <Sunset className="h-4 w-4" />
                                Start Meditation
                            </Button>
                            <Button variant="outline" className="h-12 gap-2">
                                <Clock className="h-4 w-4" />
                                Schedule Break
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Floating Quantum Controls */}
            <motion.div
                className="absolute bottom-6 right-6 flex gap-3"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
            >
                <TooltipProvider>
                    <Tooltip>
                        <TooltipContent>
                            <Button
                                variant="outline"
                                size="icon"
                                onClick={() => setIsHolographic(!isHolographic)}
                            >
                                <div className={`h-6 w-6 transition-all ${isHolographic ?
                                    'bg-gradient-to-r from-blue-400 to-purple-500 rounded-full' :
                                    'bg-muted'}`} />
                            </Button>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <Button variant="default" className="shadow-lg gap-2">
                    <Activity className="h-4 w-4" />
                    Generate Wellness Report
                </Button>
            </motion.div>
        </div>
    );
}