import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
    Edit,
    Shield,
    HeartPulse,
    Lock,
    CheckCircle,
    Users,
    Trophy,
    Globe,
    ScanFace
} from 'lucide-react';
import { TooltipContent, TooltipProvider } from '@radix-ui/react-tooltip';
import { Tooltip } from '@/components/ui/tooltip';

export default function Profile() {
    const user = {
        id: '1',
        avatar: '/avatar.jpg',
        name: 'Neeraj',
        age: 22,
        phone: '+919513881008',
        location: 'Bengaluru',
        email: 'neeraj@life.ai',
        lifeScore: 84.5,
        profileCompleteness: 75,
        verified: true,
        securityLevel: 'advanced',
        familyMembers: 2,
        milestonesAchieved: 23,
        lastUpdated: new Date(),
        healthStatus: {
          bmi: 22.5,
          mentalHealth: 'Optimal',
          sleepPattern: '7.5h average'
        }
      };

    return (
        <Card className="rounded-3xl bg-opacity-50 backdrop-blur-lg 
      bg-white dark:bg-gray-900/80 shadow-xl hover:shadow-2xl 
      transition-all duration-300 border border-white/20 
      dark:border-gray-700/50">
            <div className="p-6 space-y-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="relative group">
                        <Avatar className="h-32 w-32 border-4 border-white/20 
              dark:border-gray-800/50 shadow-lg rounded-full 
              transition-transform duration-300 hover:scale-105">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-blue-400 
                to-purple-600 text-white">
                                <ScanFace className="h-16 w-16" />
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 
              to-purple-600/30 rounded-full mix-blend-overlay" />
                    </div>

                    <div className="flex-1 space-y-3 text-center md:text-left">
                        <div className="flex items-center justify-center md:justify-start gap-3">
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 
                to-purple-500 bg-clip-text text-transparent dark:from-blue-400 
                dark:to-purple-300">
                                {user.name}
                            </h1>
                            {user.verified && (
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipContent>

                                            <CheckCircle className="h-6 w-6 text-green-500 
                    animate-pulse" />

                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            )}
                        </div>

                        <div className="flex flex-wrap items-center justify-center 
              md:justify-start gap-4 text-muted-foreground">
                            <div className="flex items-center gap-1">
                                <Globe className="h-4 w-4" />
                                <span>{user.age} years</span>
                                <span className="mx-2">•</span>
                                <span>{user.location || 'Unknown Location'}</span>
                            </div>

                            <Badge variant="outline" className="border-blue-500/30 
                bg-blue-500/10 text-blue-600 dark:text-blue-300 
                hover:bg-blue-500/20">
                                <Shield className="h-4 w-4 mr-2" />
                                {user.securityLevel.toUpperCase()} Security
                            </Badge>
                        </div>
                    </div>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 
            to-white/5 backdrop-blur-sm border border-white/10 
            dark:border-gray-800/50">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Profile Strength</span>
                            <span className="text-sm font-bold text-blue-500">
                                {user.profileCompleteness}%
                            </span>
                        </div>
                        <Progress
                            value={user.profileCompleteness}
                            className="h-2 bg-white/5"
                        />
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 
            to-white/5 backdrop-blur-sm border border-white/10 
            dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                                <Users className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{user.familyMembers}</div>
                                <div className="text-sm text-muted-foreground">
                                    Family Members
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-xl bg-gradient-to-br from-white/10 
            to-white/5 backdrop-blur-sm border border-white/10 
            dark:border-gray-800/50">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                                <Trophy className="h-6 w-6 text-purple-500" />
                            </div>
                            <div>
                                <div className="text-2xl font-bold">{user.milestonesAchieved}</div>
                                <div className="text-sm text-muted-foreground">
                                    Life Milestones
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Advanced Details */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Personal Stats */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 
              text-blue-500">
                            <ScanFace className="h-5 w-5" />
                            Biometric Overview
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <DetailItem
                                label="Life Score"
                                value={user.lifeScore}
                                icon={<HeartPulse className="h-4 w-4" />}
                            />
                            <DetailItem
                                label="Last Updated"
                                value={new Date(user.lastUpdated).toLocaleDateString()}
                                icon={<Lock className="h-4 w-4" />}
                            />
                            {user.healthStatus && (
                                <>
                                    <DetailItem
                                        label="BMI"
                                        value={user.healthStatus.bmi}
                                        icon={<HeartPulse className="h-4 w-4" />}
                                    />
                                    <DetailItem
                                        label="Sleep Pattern"
                                        value={user.healthStatus.sleepPattern}
                                        icon={<HeartPulse className="h-4 w-4" />}
                                    />
                                </>
                            )}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold flex items-center gap-2 
              text-purple-500">
                            <Edit className="h-5 w-5" />
                            Profile Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="h-12 gap-2 hover:bg-blue-500/10 
                hover:border-blue-500/30">
                                <Edit className="h-4 w-4" />
                                Edit Profile
                            </Button>
                            <Button variant="outline" className="h-12 gap-2 hover:bg-purple-500/10 
                hover:border-purple-500/30">
                                <Trophy className="h-4 w-4" />
                                View Milestones
                            </Button>
                            <Button variant="outline" className="h-12 gap-2 hover:bg-green-500/10 
                hover:border-green-500/30">
                                <Users className="h-4 w-4" />
                                Family Tree
                            </Button>
                            <Button variant="outline" className="h-12 gap-2 hover:bg-red-500/10 
                hover:border-red-500/30">
                                <Lock className="h-4 w-4" />
                                Privacy Settings
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}

function DetailItem({ label, value, icon }: {
    label: string;
    value: string | number;
    icon: React.ReactNode
}) {
    return (
        <div className="flex items-center justify-between p-3 rounded-lg 
      bg-white/5 hover:bg-white/10 transition-colors duration-200">
            <div className="flex items-center gap-2 text-muted-foreground">
                {icon}
                <span>{label}</span>
            </div>
            <span className="font-medium">{value}</span>
        </div>
    );
}