import { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html, Line } from '@react-three/drei';
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line as LineX,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import {
  Heart,
  Bell,
  Brain,
  Sparkles,
  Calendar,
  Clock,
  Activity,
  Zap,
  School,
  Home,
  Users,
  Briefcase,
  DollarSign,
  Trophy,
  Dumbbell,
  Smile,
  AlertTriangle,
  Star,
  TrendingUp,
  Hourglass,
  Milestone,
  Target,
  BarChart,
  BookOpen,
  GraduationCap,
  Baby,
  Dna,
  Bot,
  QrCode,
  Plus,
  Thermometer,
  Droplets,
  Wind,
  Gauge,
  Mouse,
  HeartPulse,
  Network,
  Tv
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { Link } from "react-router-dom"
const PaymentModal = ({ open, onOpenChange }) => null;

function HumanModel({ modelUrl = "/models/human-anatomy.glb" }) {
  const { scene } = useGLTF(modelUrl);

  return (
    <group>
      <primitive object={scene} scale={[1.5, 1.5, 1.5]} position={[0, -1, 0]} />
    </group>
  );
}

function FallbackHumanModel() {
  return (
    <group>
      <mesh position={[0, 1.6, 0]}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[0, 0.8, 0]}>
        <cylinderGeometry args={[0.4, 0.35, 1, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[-0.6, 1, 0]} rotation={[0, 0, Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.6, 1, 0]} rotation={[0, 0, -Math.PI / 6]}>
        <cylinderGeometry args={[0.1, 0.08, 0.8, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[-0.15, -0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>
      <mesh position={[0.15, -0.3, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 1.2, 8]} />
        <meshStandardMaterial color="#fdbcb4" />
      </mesh>

      <mesh position={[-0.1, 1, 0.2]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#ff4444" emissive="#ff0000" emissiveIntensity={0.3} />
      </mesh>
    </group>
  );
}

const lifeData = {
  birthDate: new Date('2002-09-13'),
  predictedLifespan: 85, // years
  currentAge: 23,
  lifeProgress: 24.7, // percentage

  vitalStats: {
    health: 92,
    happiness: 85,
    fulfillment: 78,
    stress: 45,
    energy: 88
  },

  biometrics: {
    heartRate: 72, // BPM
    bloodPressure: { systolic: 120, diastolic: 80 }, // mmHg
    bodyTemperature: 98.6, // °F
    oxygenSaturation: 98, // %
    respiratoryRate: 16, // breaths per minute
    bloodGlucose: 95, // mg/dL
    bmi: 22.5,
    bodyFat: 15 // %
  },

  lifeDomains: [
    { name: 'Health', score: 85, color: '#10b981' },
    { name: 'Career', score: 72, color: '#3b82f6' },
    { name: 'Relationships', score: 88, color: '#ec4899' },
    { name: 'Finance', score: 65, color: '#f59e0b' },
    { name: 'Personal Growth', score: 79, color: '#8b5cf6' }
  ],

  lifeStages: [
    {
      stage: 'Early Life',
      startAge: 0,
      endAge: 18,
      completed: true,
      highlights: ['Education', 'Childhood Development', 'Core Values Formation']
    },
    {
      stage: 'Young Adult',
      startAge: 18,
      endAge: 30,
      completed: false,
      current: true,
      highlights: ['Higher Education', 'Career Start', 'Self Discovery']
    },
    // ... more stages
  ],

  milestones: [
    {
      age: 18,
      title: 'High School Graduation',
      date: '2020-05-15',
      category: 'education',
      completed: true
    },
    {
      age: 22,
      title: 'University Graduation',
      date: '2024-05-20',
      category: 'education',
      completed: false
    }
    // ... more milestones
  ],

  predictions: {
    careerPeak: 45,
    majorLifeEvents: [
      { age: 25, event: 'Career Breakthrough' },
      { age: 28, event: 'Family Formation' },
      { age: 35, event: 'Peak Professional Achievement' }
    ],
    healthTrajectory: [
      { age: 30, metric: 'Peak Physical Condition' },
      { age: 40, metric: 'Preventive Health Focus' },
      { age: 50, metric: 'Lifestyle Adaptation' }
    ]
  }
};

// Calculate life metrics in years
const calculateLifeMetrics = () => {
  const birth = new Date(lifeData.birthDate);
  const today = new Date();
  const predictedEnd = new Date(birth.getTime() + (lifeData.predictedLifespan * 365.25 * 24 * 60 * 60 * 1000));

  const yearsLived = today.getFullYear() - birth.getFullYear();

  return {
    yearsLived,
    totalYears: lifeData.predictedLifespan,
    yearsRemaining: lifeData.predictedLifespan - yearsLived,
    predictedEndDate: predictedEnd
  };
};

export default function Life() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showPredictions, setShowPredictions] = useState(true);
  const [modelError, setModelError] = useState(false);
  const metrics = calculateLifeMetrics();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900/20 to-blue-900/20 dark:from-gray-900/90 dark:to-gray-800/90 border border-white/20 dark:border-gray-700/50 p-6 space-y-4">

      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 
            to-blue-300 bg-clip-text text-transparent">
            Life Quantum Matrix - Human Digital Twin
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-purple-500/10 text-purple-500">
              <Dna className="h-4 w-4 mr-2" />
              Life Pattern Analysis Active
            </Badge>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Age: {lifeData.currentAge} years
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">Life Journey</h2>
                <p className="text-muted-foreground">
                  Birth Date: {lifeData.birthDate.toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <h3 className="text-xl font-semibold">
                  {metrics.yearsRemaining.toLocaleString()} Years Remaining
                </h3>
                <p className="text-muted-foreground">
                  Predicted: {metrics.predictedEndDate.toLocaleDateString()}
                </p>
              </div>
            </div>

            <div className="space-y-2">
              <Progress value={lifeData.lifeProgress} className="h-3" />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Birth</span>
                <span>{lifeData.lifeProgress.toFixed(1)}% Complete</span>
                <span>Predicted</span>
              </div>
            </div>

            <div className="grid grid-cols-10 gap-1">
              {Array.from({ length: metrics.totalYears }).map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 w-2 rounded-full ${index < metrics.yearsLived
                    ? 'bg-purple-500'
                    : 'bg-white border border-gray-400'
                    }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.02 }}
                />
              ))}
            </div>

            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {/* Health Score Card */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <HeartPulse className="h-5 w-5 text-green-400" />
                      <h3 className="font-semibold">Health Score</h3>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400">
                      Excellent
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-2">92%</div>
                  <div className="text-sm text-muted-foreground">
                    Based on vitals, activity & lifestyle
                  </div>
                </div>

                {/* Wellness Index */}
                <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-white/10">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-400" />
                      <h3 className="font-semibold">Wellness</h3>
                    </div>
                    <Badge className="bg-purple-500/20 text-purple-400">
                      Average
                    </Badge>
                  </div>
                  <div className="text-3xl font-bold mb-2">87%</div>
                  <div className="text-sm text-muted-foreground">
                    Mental & physical well-being
                  </div>
                </div>
              </div>

              {/* Health Trends */}
              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-blue-400" />
                    <h3 className="font-semibold">Health Trends</h3>
                  </div>
                </div>
                <div className="h-[100px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[
                      { month: 'Jan', health: 88 },
                      { month: 'Feb', health: 86 },
                      { month: 'Mar', health: 90 },
                      { month: 'Apr', health: 89 },
                      { month: 'May', health: 92 },
                      { month: 'Jun', health: 91 }
                    ]}>
                      <LineX
                        type="monotone"
                        dataKey="health"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                      />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis domain={[80, 100]} stroke="#6b7280" fontSize={12} />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Medical Insights */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Dumbbell className="h-4 w-4 text-orange-400" />
                    <span className="text-sm font-medium">Fitness Level</span>
                  </div>
                  <div className="text-lg font-semibold">Advanced</div>
                  <Progress value={85} className="h-1 mt-2" />
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm font-medium">Recovery Rate</span>
                  </div>
                  <div className="text-lg font-semibold">Optimal</div>
                  <Progress value={92} className="h-1 mt-2" />
                </div>

                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium">Stress Resilience</span>
                  </div>
                  <div className="text-lg font-semibold">High</div>
                  <Progress value={88} className="h-1 mt-2" />
                </div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Dna className="h-5 w-5 text-green-400" />
              3D Anatomy
            </h3>
            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <Mouse className="h-4 w-4 text-blue-400" />
              <span className="text-sm text-blue-100">Rotate & Zoom to Explore</span>
            </div>
          </div>


          <div className="relative">


            <div className="h-[400px] w-full bg-dark rounded-lg mb-4 border border-white/10">
              <Canvas camera={{ position: [0, 0, 180], fov: 35 }}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={0.5} />

                <Suspense fallback={null}>
                  {!modelError ? (
                    <>
                      <HumanModel />
                      {/* Real-time Metric Labels */}
                      <group>
                        {/* Heart Rate Monitor */}
                        <Html position={[-50, 50, 0]}>
                          <div className="bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-red-500/30">
                            <div className="flex items-center gap-2 text-red-400 text-sm">
                              <Heart className="h-3 w-3" />
                              <span>{lifeData.biometrics.heartRate} BPM</span>
                            </div>
                          </div>
                        </Html>
                        {/* Brain Activity */}
                        <Html position={[40, 30, 0]}>
                          <div className="bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-purple-500/30">
                            <div className="flex items-center gap-2 text-purple-400 text-sm">
                              <Brain className="h-3 w-3" />
                              <span>Neural Activity: High</span>
                            </div>
                          </div>
                        </Html>
                        {/* Muscle Status */}
                        <Html position={[30, 0, 0]}>
                          <div className="bg-black/80 backdrop-blur-sm p-2 rounded-lg border border-green-500/30">
                            <div className="flex items-center gap-2 text-green-400 text-sm">
                              <Activity className="h-3 w-3" />
                              <span>Muscle Recovery: 95%</span>
                            </div>
                          </div>
                        </Html>
                      </group>
                      {/* Connection Lines */}
                      <Line
                        points={[-30, 40, 0, 5, 0, 0]}
                        color="red"
                        lineWidth={1}
                        dashed={true}
                      />
                      <Line
                        points={[10, 30, 0, 90, 10, 0]}
                        color="purple"
                        lineWidth={1}
                        dashed={true}
                      />
                      <Line
                        points={[40, 0, 0, 15, -10, 0]}
                        color="green"
                        lineWidth={1}
                        dashed={true}
                      />
                    </>
                  ) : (
                    <FallbackHumanModel />
                  )}
                </Suspense>

                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  enableRotate={true}
                  maxDistance={180}
                  minDistance={2}
                />

                <Environment preset="studio" />
                <ContactShadows
                  position={[0, -2, 0]}
                  opacity={0.4}
                  scale={4}
                  blur={2.5}
                  far={4}
                />
              </Canvas>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-lg bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm">Heart Rate</span>
                </div>
                <div className="font-mono text-lg">{lifeData.biometrics.heartRate} BPM</div>
                <div className="text-xs text-muted-foreground mt-1">Normal Range</div>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Gauge className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Blood Pressure</span>
                </div>
                <div className="font-mono text-lg">
                  {lifeData.biometrics.bloodPressure.systolic}/{lifeData.biometrics.bloodPressure.diastolic}
                </div>
                <div className="text-xs text-muted-foreground mt-1">Optimal</div>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Wind className="h-4 w-4 text-cyan-500" />
                  <span className="text-sm">O₂ Saturation</span>
                </div>
                <div className="font-mono text-lg">{lifeData.biometrics.oxygenSaturation}%</div>
                <div className="text-xs text-muted-foreground mt-1">Excellent</div>
              </div>

              <div className="p-3 rounded-lg bg-gradient-to-br from-orange-500/10 to-yellow-500/10 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">Temperature</span>
                </div>
                <div className="font-mono text-lg">{lifeData.biometrics.bodyTemperature}°F</div>
                <div className="text-xs text-muted-foreground mt-1">Normal</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-400" />
            Vital Statistics
          </h3>
          <div className="space-y-4">
            {Object.entries(lifeData.vitalStats).map(([key, value]) => (
              <div key={key} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="capitalize">{key}</span>
                  <span>{value}%</span>
                </div>
                <Progress value={value} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <HeartPulse className="h-5 w-5 text-red-400" />
            Additional Biometrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(lifeData.biometrics)
              .filter(([key]) => !['heartRate', 'bloodPressure', 'oxygenSaturation', 'bodyTemperature'].includes(key))
              .map(([key, value]) => {
                let displayValue = value;
                let unit = '';
                let icon = Activity;
                let color = 'text-blue-400';

                switch (key) {
                  case 'bodyFat':
                    unit = '%';
                    icon = Wind;
                    color = 'text-cyan-400';
                    break;
                  case 'respiratoryRate':
                    unit = ' /min';
                    icon = Wind;
                    color = 'text-green-400';
                    break;
                  case 'bloodGlucose':
                    unit = ' mg/dL';
                    icon = Droplets;
                    color = 'text-purple-400';
                    break;
                  default:
                    break;
                }

                const IconComponent = icon;

                return (
                  <div key={key} className="p-3 rounded-lg bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className={`h-4 w-4 ${color}`} />
                      <span className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <div className="text-lg font-mono">
                      {displayValue}{unit}
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-400" />
            Life Domain Balance
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={lifeData.lifeDomains}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <Radar
                name="Score"
                dataKey="score"
                stroke="#8b5cf6"
                fill="#8b5cf6"
                fillOpacity={0.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-green-400" />
            AI Life Insights
          </h3>
          <div className="space-y-4">
            {lifeData.predictions.majorLifeEvents.map((event, index) => (
              <HoverCard key={index}>
                <HoverCardTrigger asChild>
                  <div className="p-4 rounded-lg bg-white/5 hover:bg-white/10 
                    cursor-pointer transition-colors">
                    <div className="flex items-center gap-3">
                      <Milestone className="h-5 w-5 text-purple-400" />
                      <div>
                        <div className="font-medium">Age {event.age}</div>
                        <div className="text-sm text-muted-foreground">
                          {event.event}
                        </div>
                      </div>
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Event Analysis</h4>
                    <p className="text-sm">
                      Based on your current trajectory and life patterns
                    </p>
                  </div>
                </HoverCardContent>
              </HoverCard>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6 backdrop-blur-lg bg-white/5">
        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Hourglass className="h-5 w-5 text-yellow-400" />
          Life Stages Journey
        </h3>
        <div className="relative">
          <div className="absolute top-0 bottom-0 left-[15px] w-px bg-white/20" />
          <div className="space-y-8">
            {lifeData.lifeStages.map((stage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative pl-10"
              >
                <div className="absolute left-0 w-8 h-8 rounded-full 
                  flex items-center justify-center
                  bg-white/5 border border-white/20">
                  {stage.completed ? (
                    <Star className="h-4 w-4 text-yellow-400" />
                  ) : stage.current ? (
                    <Activity className="h-4 w-4 text-purple-400" />
                  ) : (
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <div className="space-y-2">
                  <div className="font-semibold">{stage.stage}</div>
                  <div className="text-sm text-muted-foreground">
                    Age {stage.startAge} - {stage.endAge}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {stage.highlights.map((highlight, i) => (
                      <Badge key={i} variant="outline">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Card>

      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 bg-purple-400 rounded-full"
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

      <div className="fixed bottom-6 right-6 flex gap-3">
        <Link to="/ai">
          <Button className="rounded-full shadow-lg flex flex-col border-4 border-black h-16 w-16">
            <Bot className="h-4 w-4" />
            <span className="text-xs">AI</span>
          </Button>
        </Link>
        <div className="flex flex-col items-center justify-center">
          <Button variant="outline" className="rounded-full shadow-lg flex flex-col border-4 border-black h-16 w-16" onClick={() => setOpen(true)}>
            <QrCode className="h-4 w-4" />
            <span className="text-xs">Pay</span>
          </Button>
        </div>
        <Link to="/agentic-ai">
          <Button className="rounded-full shadow-lg gap-2">
            <Network className="h-4 w-4" />
            Agentic AI
          </Button>
        </Link>
        <Link to="/log-monitor">
          <Button className="rounded-full shadow-lg gap-2">
            <Tv className="h-4 w-4" />
            Log Monitor
          </Button>
        </Link>
      </div>
      <PaymentModal open={open} onOpenChange={setOpen} />
    </div>
  );
}