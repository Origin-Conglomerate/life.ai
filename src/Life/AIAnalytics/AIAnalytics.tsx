import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import {
  Brain,
  AlertCircle,
  HeartPulse,
  Activity,
  Clock,
  TrendingUp,
  Zap,
  MessageSquare,
  User,
  Users,
  BarChart2,
  Filter,
  Search,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ShieldAlert,
  Bookmark,
  ClipboardList,
  Rocket,
  Dumbbell,
  Utensils,
  Moon,
  Sun,
  Pill,
  Stethoscope,
  Dna 
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data for life insights
const lifeData = {
  healthRisks: [
    {
      id: "L10045",
      name: "Cardiovascular",
      riskLevel: "high",
      probability: 72,
      factors: ["Family history", "Elevated LDL (145 mg/dL)", "Sedentary lifestyle"],
      prevention: ["Cardio exercise 3x/week", "Mediterranean diet", "Regular cholesterol checks"]
    },
    {
      id: "L10072",
      name: "Type 2 Diabetes",
      riskLevel: "medium",
      probability: 38,
      factors: ["Prediabetic A1C (5.8%)", "BMI 28.4", "Waist circumference > 35in"],
      prevention: ["Reduce sugar intake", "Strength training", "Fiber supplementation"]
    },
    {
      id: "L10089",
      name: "Cognitive Decline",
      riskLevel: "low",
      probability: 15,
      factors: ["Good current markers", "Family history"],
      prevention: ["Cognitive exercises", "Omega-3 supplementation"]
    }
  ],
  wellnessRecommendations: [
    {
      category: "Physical",
      strengths: ["Cardio endurance", "Flexibility"],
      weaknesses: ["Muscle mass", "Bone density"],
      actions: [
        "Resistance training 2x/week",
        "Calcium/Vitamin D supplementation",
        "Protein intake optimization"
      ]
    },
    {
      category: "Mental",
      strengths: ["Stress management", "Creativity"],
      weaknesses: ["Sleep quality", "Focus duration"],
      actions: [
        "Digital detox 1hr before bed",
        "Meditation practice",
        "Pomodoro technique for work"
      ]
    }
  ],
  biometrics: {
    sleep: {
      average: 6.2,
      optimal: 7.5,
      stages: {
        deep: 18,
        rem: 22,
        light: 60
      }
    },
    activity: {
      steps: 7850,
      target: 10000,
      exerciseMinutes: 135,
      targetMinutes: 180
    },
    nutrition: {
      calories: 2150,
      target: 2350,
      protein: 95,
      carbs: 250,
      fats: 80
    }
  },
  automationReports: [
    {
      type: "weekly",
      generated: "12 hours ago",
      recipients: ["Primary care physician", "Wellness coach"],
      highlights: ["Sleep improved 8%", "Exercise consistency 78%"]
    },
    {
      type: "monthly",
      generated: "5 days ago",
      recipients: ["Self", "Family"],
      highlights: ["LDL decreased 12%", "Resting HR down to 62 bpm"]
    }
  ],
  nlpQueries: [
    {
      query: "Show my sleep trends",
      response: "Sleep duration: Avg 6.2h (target 7.5h). Deep sleep increased from 15% to 18% this month."
    },
    {
      query: "What's my optimal workout time?",
      response: "Based on chronotype and cortisol levels, optimal workout window is 7:30-9:00 AM."
    }
  ],
  biomarkerRadarData: [
    {
      metric: "Cardio",
      current: 68,
      optimal: 85
    },
    {
      metric: "Strength",
      current: 55,
      optimal: 75
    },
    {
      metric: "Flexibility",
      current: 72,
      optimal: 80
    },
    {
      metric: "Recovery",
      current: 60,
      optimal: 90
    },
    {
      metric: "Resilience",
      current: 78,
      optimal: 85
    }
  ],
  timelineData: [
    { day: 'Mon', sleep: 6.5, activity: 120, stress: 42 },
    { day: 'Tue', sleep: 5.8, activity: 90, stress: 58 },
    { day: 'Wed', sleep: 7.2, activity: 150, stress: 35 },
    { day: 'Thu', sleep: 6.0, activity: 110, stress: 45 },
    { day: 'Fri', sleep: 6.8, activity: 140, stress: 40 },
    { day: 'Sat', sleep: 8.5, activity: 75, stress: 25 },
    { day: 'Sun', sleep: 7.0, activity: 60, stress: 30 }
  ]
};

const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

export default function AIAnalytics() {
  const [activeTab, setActiveTab] = useState('health');
  const [expandedMetric, setExpandedMetric] = useState(null);
  const [query, setQuery] = useState('');
  const [queryHistory, setQueryHistory] = useState([]);

  const handleQuerySubmit = () => {
    if (!query.trim()) return;
    
    // Simulate AI response
    const newEntry = {
      query,
      response: `AI response to "${query}". Sample data: Based on your biomarkers, we recommend...`,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setQueryHistory([newEntry, ...queryHistory]);
    setQuery('');
  };

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-green-900/20 to-blue-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* Header with animated AI icon */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          >
            <Dna className="h-10 w-10 text-blue-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 
              to-blue-400 bg-clip-text text-transparent">
              Life AI Companion
            </h1>
            <p className="text-muted-foreground">
              Personalized health analytics & optimization
            </p>
          </div>
        </div>
        <Badge className="bg-blue-500/10 text-blue-500 px-4 py-1.5">
          <Activity className="h-4 w-4 mr-2" />
          Active Monitoring Mode
        </Badge>
      </div>

      {/* Main tabs navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 bg-white/5 backdrop-blur-lg">
          <TabsTrigger value="health" className="flex gap-2">
            <HeartPulse className="h-4 w-4" />
            Health Risks
          </TabsTrigger>
          <TabsTrigger value="wellness" className="flex gap-2">
            <Lightbulb className="h-4 w-4" />
            Wellness
          </TabsTrigger>
          <TabsTrigger value="biometrics" className="flex gap-2">
            <Activity className="h-4 w-4" />
            Biometrics
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <ClipboardList className="h-4 w-4" />
            Automation
          </TabsTrigger>
          <TabsTrigger value="ask" className="flex gap-2">
            <MessageSquare className="h-4 w-4" />
            Ask AI
          </TabsTrigger>
        </TabsList>

        {/* Health Risks Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-red-400" />
                Health Risk Assessment
              </h3>
              
              <div className="space-y-4">
                {lifeData.healthRisks.map((risk, index) => (
                  <Card key={index} className={`p-4 ${
                    risk.riskLevel === 'high' 
                      ? 'bg-red-500/10 border-red-500/30'
                      : risk.riskLevel === 'medium'
                      ? 'bg-yellow-500/10 border-yellow-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  }`}>
                    <div 
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedMetric(expandedMetric === index ? null : index)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          risk.riskLevel === 'high' 
                            ? 'bg-red-500/20 text-red-500'
                            : risk.riskLevel === 'medium'
                            ? 'bg-yellow-500/20 text-yellow-500'
                            : 'bg-green-500/20 text-green-500'
                        }`}>
                          {risk.riskLevel === 'high' ? (
                            <AlertCircle className="h-5 w-5" />
                          ) : risk.riskLevel === 'medium' ? (
                            <Activity className="h-5 w-5" />
                          ) : (
                            <HeartPulse className="h-5 w-5" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{risk.name}</div>
                          <div className="text-sm text-muted-foreground">
                            ID: {risk.id}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-24">
                          <Progress 
                            value={risk.probability} 
                            className={`h-2 ${
                              risk.riskLevel === 'high' 
                                ? 'bg-red-500' 
                                : risk.riskLevel === 'medium'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`} 
                          />
                          <div className="text-xs text-right mt-1">
                            {risk.probability}% probability
                          </div>
                        </div>
                        {expandedMetric === index ? (
                          <ChevronUp className="h-5 w-5" />
                        ) : (
                          <ChevronDown className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    {expandedMetric === index && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 space-y-3"
                      >
                        <div>
                          <h4 className="text-sm font-medium mb-1">Risk Factors:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {risk.factors.map((factor, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{factor}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Prevention Plan:</h4>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {risk.prevention.map((action, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span>•</span>
                                <span>{action}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          Schedule Doctor Consultation
                        </Button>
                      </motion.div>
                    )}
                  </Card>
                ))}
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-400" />
                Biomarker Potential
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={lifeData.biomarkerRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="metric" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar 
                      name="Current" 
                      dataKey="current" 
                      stroke="#3b82f6" 
                      fill="#3b82f6" 
                      fillOpacity={0.4} 
                    />
                    <Radar 
                      name="Optimal" 
                      dataKey="optimal" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.4} 
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  Radar chart shows current vs optimal biomarker levels.
                  Gaps indicate areas needing attention.
                </p>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Wellness Recommendations Tab */}
        <TabsContent value="wellness" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lifeData.wellnessRecommendations.map((category, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-full ${
                    index === 0 ? 'bg-blue-500/20 text-blue-500' : 'bg-purple-500/20 text-purple-500'
                  }`}>
                    {index === 0 ? (
                      <Dumbbell className="h-6 w-6" />
                    ) : (
                      <Brain className="h-6 w-6" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{category.category} Wellness</h3>
                    <p className="text-sm text-muted-foreground">
                      Personalized optimization plan
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-green-500">
                      <TrendingUp className="h-4 w-4" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {category.strengths.map((strength, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-3 flex items-center gap-2 text-red-500">
                      <AlertCircle className="h-4 w-4" />
                      Areas to Improve
                    </h4>
                    <ul className="space-y-2">
                      {category.weaknesses.map((weakness, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-red-500"></div>
                          <span className="text-sm">{weakness}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-medium mb-3 flex items-center gap-2 text-blue-500">
                    <Bookmark className="h-4 w-4" />
                    Recommended Actions
                  </h4>
                  <div className="space-y-2">
                    {category.actions.map((action, i) => (
                      <Card key={i} className="p-3 bg-white/5 hover:bg-white/10 transition">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{action}</span>
                          <Button variant="ghost" size="sm">
                            Schedule
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Biometrics Tab */}
        <TabsContent value="biometrics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-400" />
                Weekly Trends
              </h3>
              
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lifeData.timelineData}>
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" domain={[0, 8]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 200]} />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="sleep"
                      name="Sleep (hours)"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="activity"
                      name="Activity (mins)"
                      stroke="#82ca9d"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="stress"
                      name="Stress (%)"
                      stroke="#ff6b6b"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    Sleep
                  </h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {lifeData.biometrics.sleep.average}h
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {lifeData.biometrics.sleep.optimal}h target
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(lifeData.biometrics.sleep.average / lifeData.biometrics.sleep.optimal) * 100} 
                      className="h-2 bg-blue-500/30" 
                      indicatorClassName="bg-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>Deep: {lifeData.biometrics.sleep.stages.deep}%</div>
                    <div>REM: {lifeData.biometrics.sleep.stages.rem}%</div>
                    <div>Light: {lifeData.biometrics.sleep.stages.light}%</div>
                  </div>
                </Card>
                
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Dumbbell className="h-4 w-4" />
                    Activity
                  </h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {lifeData.biometrics.activity.steps}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {lifeData.biometrics.activity.target} steps
                    </span>
                  </div>
                  <div className="mt-2">
                    <Progress 
                      value={(lifeData.biometrics.activity.steps / lifeData.biometrics.activity.target) * 100} 
                      className="h-2 bg-green-500/30" 
                      indicatorClassName="bg-green-500"
                    />
                  </div>
                  <div className="mt-3 text-xs">
                    Exercise: {lifeData.biometrics.activity.exerciseMinutes}/{lifeData.biometrics.activity.targetMinutes} mins
                  </div>
                </Card>
                
                <Card className="p-4 bg-yellow-500/10 border-yellow-500/30">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Utensils className="h-4 w-4" />
                    Nutrition
                  </h4>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-bold">
                      {lifeData.biometrics.nutrition.calories}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      / {lifeData.biometrics.nutrition.target} kcal
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
                    <div>Protein: {lifeData.biometrics.nutrition.protein}g</div>
                    <div>Carbs: {lifeData.biometrics.nutrition.carbs}g</div>
                    <div>Fats: {lifeData.biometrics.nutrition.fats}g</div>
                  </div>
                </Card>
              </div>
            </Card>
            
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Optimization Suggestions
              </h3>
              
              <div className="space-y-4">
                <Card className="p-4 bg-green-500/10 border-green-500/30">
                  <h4 className="font-medium mb-2">Sleep Enhancement</h4>
                  <p className="text-sm text-muted-foreground">
                    Based on your chronotype, adjust bedtime to 10:45 PM for optimal REM cycles.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Set Reminder
                  </Button>
                </Card>
                
                <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                  <h4 className="font-medium mb-2">Workout Timing</h4>
                  <p className="text-sm text-muted-foreground">
                    Your cortisol levels suggest optimal workout window is 7:30-8:30 AM.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Schedule Workout
                  </Button>
                </Card>
                
                <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                  <h4 className="font-medium mb-2">Nutrition Adjustment</h4>
                  <p className="text-sm text-muted-foreground">
                    Increase protein intake by 15g/day to support muscle synthesis.
                  </p>
                  <Button variant="outline" size="sm" className="mt-3">
                    Meal Plan
                  </Button>
                </Card>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Automated Reporting Tab */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {lifeData.automationReports.map((report, index) => (
              <Card key={index} className="p-6 backdrop-blur-lg bg-white/5">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold capitalize">
                      {report.type} Health Report
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Generated {report.generated}
                    </p>
                  </div>
                  <Badge variant="outline">
                    {report.recipients.length} recipients
                  </Badge>
                </div>
                
                <div className="space-y-3 mb-6">
                  <h4 className="font-medium flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    Key Highlights
                  </h4>
                  <ul className="space-y-2">
                    {report.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span>•</span>
                        <span className="text-sm">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <Button>
                    View Full Report
                  </Button>
                  <Button variant="outline">
                    Edit Recipients
                  </Button>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
          
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-400" />
              Scheduled Automations
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-4 bg-green-500/10 border-green-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Medication Reminders</h4>
                  <Badge variant="secondary">Daily</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Omega-3 and Vitamin D reminders at 8:00 AM
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-blue-500/10 border-blue-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Health Check-ins</h4>
                  <Badge variant="secondary">Weekly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Blood pressure and weight tracking every Sunday
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
              
              <Card className="p-4 bg-purple-500/10 border-purple-500/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Doctor Summaries</h4>
                  <Badge variant="secondary">Monthly</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Automated reports sent to your physician
                </p>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </Card>
            </div>
          </Card>
        </TabsContent>

        {/* Natural Language Interface Tab */}
        <TabsContent value="ask" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-blue-400" />
              Ask Life AI
            </h3>
            
            <div className="flex gap-3 mb-6">
              <Input
                placeholder="Ask anything about your health and wellness data..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleQuerySubmit()}
              />
              <Button onClick={handleQuerySubmit}>
                Ask
              </Button>
            </div>
            
            <div className="space-y-1 mb-3">
              <p className="text-sm text-muted-foreground">
                Try asking:
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm" onClick={() => setQuery("Show my sleep trends")}>
                  Show sleep trends
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("What's my optimal workout time?")}>
                  Optimal workout time
                </Button>
                <Button variant="outline" size="sm" onClick={() => setQuery("How can I improve my recovery?")}>
                  Improve recovery
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[300px]">
              <div className="space-y-4 pr-4">
                {queryHistory.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-start gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-500 text-white">
                          <User className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">You</div>
                        <div className="text-sm text-muted-foreground">
                          {item.timestamp}
                        </div>
                        <Card className="p-3 mt-1 bg-white/5">
                          {item.query}
                        </Card>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 ml-11">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-green-500 text-white">
                          <Brain className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="font-medium">Life AI</div>
                        <div className="text-sm text-muted-foreground">
                          {item.timestamp}
                        </div>
                        <Card className="p-3 mt-1 bg-green-500/10 border-green-500/30">
                          {item.response}
                        </Card>
                      </div>
                    </div>
                  </div>
                ))}
                
                {queryHistory.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-[200px] text-center text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mb-2" />
                    <p>Ask questions about your health and wellness data</p>
                    <p className="text-sm">The AI understands complex queries about biomarkers, trends, and optimization</p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating AI Assistant */}
      <motion.div 
        className="fixed bottom-6 right-6"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button className="rounded-full shadow-lg gap-2 h-14 w-14 p-0">
          <Stethoscope className="h-6 w-6" />
        </Button>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-blue-400 rounded-full"
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3
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