import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  Heart,
  Activity,
  Brain,
  Stethoscope,
  Pill,
  Dna,
  Calendar,
  Clock,
  Thermometer,
  Scale,
  Apple,
  Bed,
  AlertTriangle,
  FileText,
  Plus,
  HeartPulse,
  Syringe,
  Microscope,
  Virus,
  Laptop,
  Zap,
  Droplet,
  Bone,
  Bone,
  Wind,
  Cylinder
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock health data
const healthData = {
  vitals: {
    heartRate: {
      current: 72,
      min: 65,
      max: 85,
      trend: 'stable'
    },
    bloodPressure: {
      systolic: 122,
      diastolic: 78,
      trend: 'improving'
    },
    temperature: 36.8,
    oxygenSaturation: 98,
    respiratoryRate: 16,
    bmi: 23.4,
    weight: 70.5,
    height: 173
  },
  sleepMetrics: {
    averageHours: 7.2,
    deepSleep: 2.5,
    remSleep: 1.8,
    sleepScore: 85,
    lastWeek: [
      { date: '2024-03-14', hours: 7.5, quality: 88 },
      { date: '2024-03-15', hours: 6.8, quality: 82 },
      { date: '2024-03-16', hours: 7.8, quality: 90 },
      { date: '2024-03-17', hours: 6.5, quality: 75 },
      { date: '2024-03-18', hours: 7.2, quality: 85 },
      { date: '2024-03-19', hours: 7.0, quality: 83 },
      { date: '2024-03-20', hours: 7.4, quality: 87 }
    ]
  },
  nutrition: {
    caloriesConsumed: 2100,
    caloriesTarget: 2400,
    macros: {
      protein: 25,
      carbs: 55,
      fats: 20
    },
    waterIntake: {
      current: 1.8,
      target: 2.5
    },
    meals: [
      { time: '08:00', type: 'Breakfast', calories: 450 },
      { time: '13:00', type: 'Lunch', calories: 750 },
      { time: '19:00', type: 'Dinner', calories: 650 }
    ]
  },
  medicalHistory: {
    conditions: [
      {
        name: 'Asthma',
        diagnosed: '2018-05-15',
        status: 'controlled',
        medications: ['Albuterol']
      }
    ],
    allergies: ['Pollen', 'Penicillin'],
    vaccinations: [
      {
        name: 'COVID-19',
        date: '2023-09-15',
        dueDate: '2024-09-15'
      },
      {
        name: 'Flu Shot',
        date: '2023-10-20',
        dueDate: '2024-10-20'
      }
    ],
    medications: [
      {
        name: 'Albuterol',
        dosage: '90mcg',
        frequency: 'As needed',
        startDate: '2018-05-15'
      }
    ]
  },
  fitness: {
    dailySteps: 8500,
    stepsGoal: 10000,
    activeMinutes: 45,
    activeMinutesGoal: 60,
    workouts: [
      {
        date: '2024-03-20',
        type: 'Running',
        duration: 30,
        calories: 320
      },
      {
        date: '2024-03-19',
        type: 'Strength Training',
        duration: 45,
        calories: 280
      }
    ]
  },
  mentalHealth: {
    stressLevel: 'moderate',
    moodTrend: 'stable',
    sleepQuality: 'good',
    anxietyScore: 25,
    lastAssessment: '2024-03-15'
  },
  appointments: [
    {
      id: '1',
      doctor: 'Dr. Sarah Chen',
      specialty: 'Primary Care',
      date: '2024-04-05',
      time: '10:00',
      type: 'Annual Checkup'
    }
  ],
  aiInsights: [
    {
      type: 'alert',
      title: 'Sleep Pattern Change',
      description: 'Recent decrease in deep sleep phases',
      recommendation: 'Consider adjusting bedroom temperature',
      impact: 'May affect cognitive performance'
    },
    {
      type: 'improvement',
      title: 'Fitness Progress',
      description: 'Consistent improvement in cardiovascular endurance',
      recommendation: 'Ready to increase workout intensity',
      impact: 'Potential 15% boost in performance'
    }
  ],
  labResults: [
    {
      date: '2024-02-15',
      type: 'Blood Work',
      status: 'normal',
      metrics: {
        hemoglobin: 14.2,
        glucose: 85,
        cholesterol: 175
      }
    }
  ],
  insurance: {
    currentPlan: {
      provider: 'LifeGuard Health',
      planType: 'Premium Plus',
      coverageAmount: 500000,
      premium: 2500,
      renewalDate: '2025-03-15',
      familyCovered: true
    },
    claims: [
      {
        id: 'CLM001',
        date: '2024-01-15',
        amount: 12500,
        status: 'approved',
        type: 'Hospitalization',
        hospital: 'City General'
      },
      {
        id: 'CLM002',
        date: '2023-11-20',
        amount: 3500,
        status: 'processing',
        type: 'Outpatient',
        hospital: 'MediCare Clinic'
      }
    ],
    benefits: [
      'International Coverage',
      'Zero Waiting Period',
      'Dental & Vision',
      'Mental Health Support',
      'Alternative Medicine'
    ]
  },
  medications: {
    currentPrescriptions: [
      {
        id: 'MED001',
        name: 'Vitamin D3',
        dosage: '1000 IU',
        frequency: 'Daily',
        stock: 45,
        refillDate: '2024-04-15'
      },
      {
        id: 'MED002',
        name: 'Omega-3',
        dosage: '1000mg',
        frequency: 'Twice daily',
        stock: 30,
        refillDate: '2024-04-01'
      }
    ],
    orders: [
      {
        id: 'ORD001',
        date: '2024-03-15',
        items: ['Vitamin D3', 'Omega-3'],
        status: 'delivered',
        total: 85.50
      }
    ],
    preferredPharmacies: [
      {
        name: 'HealthPlus Pharmacy',
        location: 'Downtown',
        rating: 4.8,
        deliveryAvailable: true
      }
    ]
  },
  eugenics: {
    geneticProfile: {
      ancestry: {
        regions: [
          { name: 'South Asian', percentage: 65 },
          { name: 'European', percentage: 25 },
          { name: 'East Asian', percentage: 10 }
        ]
      },
      healthPredispositions: [
        {
          condition: 'Type 2 Diabetes',
          risk: 'Moderate',
          preventiveMeasures: [
            'Regular exercise',
            'Low sugar diet',
            'Weight management'
          ]
        },
        {
          condition: 'Cardiovascular Health',
          risk: 'Low',
          preventiveMeasures: [
            'Mediterranean diet',
            'Regular cardio',
            'Stress management'
          ]
        }
      ],
      traits: [
        { name: 'Caffeine Metabolism', value: 'Fast metabolizer' },
        { name: 'Muscle Composition', value: 'Endurance oriented' }
      ]
    }
  },
  longevity: {
    biologicalAge: 29,
    chronologicalAge: 32,
    predictedLifespan: 89,
    optimizations: [
      {
        category: 'Diet',
        impact: 'high',
        recommendations: [
          'Increase antioxidant intake',
          'Reduce processed foods',
          'Intermittent fasting'
        ]
      },
      {
        category: 'Lifestyle',
        impact: 'medium',
        recommendations: [
          'Improve sleep quality',
          'Reduce stress levels',
          'Regular exercise'
        ]
      }
    ],
    biomarkers: [
      {
        name: 'Telomere Length',
        value: 'Above average',
        trend: 'stable'
      },
      {
        name: 'DNA Methylation',
        value: 'Optimal',
        trend: 'improving'
      }
    ]
  }
};

export default function HealthDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAIInsights, setShowAIInsights] = useState(true);

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-blue-900/20 to-purple-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">

      {/* NeuroHealth Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            NeuroHealth Hub
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-green-500/10 text-green-500">
              <HeartPulse className="h-4 w-4 mr-2" />
              Vitals Stable
            </Badge>
            <span className="flex items-center gap-2">
              <Activity className="h-4 w-4" />
              Health Score: 92
            </span>
          </div>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Book Appointment
        </Button>
      </div>

      {/* Vital Signs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <VitalCard
          title="Heart Rate"
          value={healthData.vitals.heartRate.current}
          unit="bpm"
          icon={<Heart className="h-5 w-5 text-red-400" />}
          trend={healthData.vitals.heartRate.trend}
        />
        <VitalCard
          title="Blood Pressure"
          value={`${healthData.vitals.bloodPressure.systolic}/${healthData.vitals.bloodPressure.diastolic}`}
          unit="mmHg"
          icon={<Activity className="h-5 w-5 text-blue-400" />}
          trend={healthData.vitals.bloodPressure.trend}
        />
        <VitalCard
          title="Oxygen"
          value={healthData.vitals.oxygenSaturation}
          unit="%"
          icon={<Cylinder className="h-5 w-5 text-purple-400" />}
          trend="stable"
        />
        <VitalCard
          title="Temperature"
          value={healthData.vitals.temperature}
          unit="°C"
          icon={<Thermometer className="h-5 w-5 text-orange-400" />}
          trend="stable"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="medical">Medical History</TabsTrigger>
          <TabsTrigger value="fitness">Fitness</TabsTrigger>
          <TabsTrigger value="nutrition">Nutrition</TabsTrigger>
          <TabsTrigger value="mental">Mental Health</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="eugenics">Eugenics</TabsTrigger>
          <TabsTrigger value="longevity">Longevity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Health Score Overview */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Health Score Breakdown</h3>
              <Badge variant="outline">92/100</Badge>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <ScoreCard
                title="Physical"
                score={88}
                icon={<Activity className="h-4 w-4" />}
              />
              <ScoreCard
                title="Mental"
                score={94}
                icon={<Brain className="h-4 w-4" />}
              />
              <ScoreCard
                title="Nutrition"
                score={85}
                icon={<Apple className="h-4 w-4" />}
              />
              <ScoreCard
                title="Sleep"
                score={90}
                icon={<Bed className="h-4 w-4" />}
              />
            </div>
          </Card>

          {/* Recent Activity Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6">Health Timeline</h3>
              <ScrollArea className="h-[300px]">
                <div className="space-y-4">
                  {/* Timeline items */}
                </div>
              </ScrollArea>
            </Card>

            {/* AI Health Insights */}
            <Card className="p-6 backdrop-blur-lg bg-white/5">
              <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Health Insights
              </h3>
              <div className="space-y-4">
                {healthData.aiInsights.map((insight, index) => (
                  <div key={index} className={`p-4 rounded-lg ${
                    insight.type === 'alert' 
                      ? 'bg-red-500/10 border-red-500/30'
                      : 'bg-green-500/10 border-green-500/30'
                  } border`}>
                    <div className="flex items-center gap-2 mb-2">
                      {insight.type === 'alert' ? (
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                      ) : (
                        <Zap className="h-4 w-4 text-green-400" />
                      )}
                      <span className="font-medium">{insight.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {insight.description}
                    </p>
                    <div className="text-sm font-medium">
                      {insight.recommendation}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="vitals" className="space-y-6">
          {/* Vital Signs */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <VitalCard
                title="Heart Rate"
                value={healthData.vitals.heartRate.current}
                unit="bpm"
                icon={<Heart className="h-5 w-5 text-red-400" />}
                trend={healthData.vitals.heartRate.trend}
              />
              <VitalCard
                title="Blood Pressure"
                value={`${healthData.vitals.bloodPressure.systolic}/${healthData.vitals.bloodPressure.diastolic}`}
                unit="mmHg"
                icon={<Activity className="h-5 w-5 text-blue-400" />}
                trend={healthData.vitals.bloodPressure.trend}
              />
              <VitalCard
                title="Oxygen"
                value={healthData.vitals.oxygenSaturation}
                unit="%"
                icon={<Cylinder className="h-5 w-5 text-purple-400" />}
                trend="stable"
              />
              <VitalCard
                title="Temperature"
                value={healthData.vitals.temperature}
                unit="°C"
                icon={<Thermometer className="h-5 w-5 text-orange-400" />}
                trend="stable"
              />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="medical" className="space-y-6">
          {/* Medical History */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Medical History</h3>
            <div className="space-y-4">
              {healthData.medicalHistory.conditions.map((condition, index) => (
                <div key={index} className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{condition.name}</div>
                    <Badge variant="outline" className={
                      condition.status === 'controlled' ? 'text-green-500' : 'text-yellow-500'
                    }>
                      {condition.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Diagnosed: {condition.diagnosed}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Medications: {condition.medications.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fitness" className="space-y-6">
          {/* Fitness Metrics */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Fitness Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Daily Steps</h4>
                <div className="text-2xl font-bold">{healthData.fitness.dailySteps}</div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Active Minutes</h4>
                <div className="text-2xl font-bold">{healthData.fitness.activeMinutes}</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition" className="space-y-6">
          {/* Nutrition Metrics */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Nutrition Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Calories Consumed</h4>
                <div className="text-2xl font-bold">{healthData.nutrition.caloriesConsumed}</div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Calories Target</h4>
                <div className="text-2xl font-bold">{healthData.nutrition.caloriesTarget}</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="mental" className="space-y-6">
          {/* Mental Health Metrics */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Mental Health Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Stress Level</h4>
                <div className="text-2xl font-bold">{healthData.mentalHealth.stressLevel}</div>
              </div>
              <div>
                <h4 className="font-medium mb-4">Anxiety Score</h4>
                <div className="text-2xl font-bold">{healthData.mentalHealth.anxietyScore}</div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="insurance" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Current Insurance Plan</h3>
              <Badge variant="outline" className="bg-green-500/10 border-green-500/30">
                Active
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Provider</div>
                <div className="font-medium">{healthData.insurance.currentPlan.provider}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Coverage</div>
                <div className="font-medium">
                  ${healthData.insurance.currentPlan.coverageAmount.toLocaleString()}
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Renewal Date</div>
                <div className="font-medium">{healthData.insurance.currentPlan.renewalDate}</div>
              </div>
            </div>
          </Card>

          {/* Claims History */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Claims History</h3>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {healthData.insurance.claims.map(claim => (
                  <div key={claim.id} className="p-4 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{claim.type}</div>
                      <Badge variant="outline" className={
                        claim.status === 'approved' ? 'text-green-500' : 'text-yellow-500'
                      }>
                        {claim.status}
                      </Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {claim.hospital} • ${claim.amount.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </TabsContent>

        <TabsContent value="medications" className="space-y-6">
          {/* Current Prescriptions */}
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Active Prescriptions</h3>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                New Order
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {healthData.medications.currentPrescriptions.map(med => (
                <div key={med.id} className="p-4 rounded-lg bg-white/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium">{med.name}</div>
                    <Badge variant="outline" className={
                      med.stock > 10 ? 'text-green-500' : 'text-red-500'
                    }>
                      {med.stock} left
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {med.dosage} • {med.frequency}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="eugenics" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <h3 className="text-lg font-semibold mb-6">Genetic Profile</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Ancestry Composition</h4>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={healthData.eugenics.geneticProfile.ancestry.regions}
                      dataKey="percentage"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                    >
                      {healthData.eugenics.geneticProfile.ancestry.regions.map((entry, index) => (
                        <Cell key={index} fill={`hsl(${index * 60}, 70%, 60%)`} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h4 className="font-medium mb-4">Health Predispositions</h4>
                <div className="space-y-4">
                  {healthData.eugenics.geneticProfile.healthPredispositions.map((item, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{item.condition}</div>
                        <Badge variant="outline" className={
                          item.risk === 'Low' ? 'text-green-500' : 'text-yellow-500'
                        }>
                          {item.risk} Risk
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="longevity" className="space-y-6">
          <Card className="p-6 backdrop-blur-lg bg-white/5">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Longevity Profile</h3>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Biological Age</div>
                  <div className="text-2xl font-bold">{healthData.longevity.biologicalAge}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Predicted Lifespan</div>
                  <div className="text-2xl font-bold">{healthData.longevity.predictedLifespan}</div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-4">Biomarkers</h4>
                <div className="space-y-4">
                  {healthData.longevity.biomarkers.map((marker, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{marker.name}</div>
                        <Badge variant="outline" className={
                          marker.trend === 'improving' ? 'text-green-500' : 'text-blue-500'
                        }>
                          {marker.trend}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">{marker.value}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-4">Optimization Recommendations</h4>
                <div className="space-y-4">
                  {healthData.longevity.optimizations.map((opt, index) => (
                    <div key={index} className="p-4 rounded-lg bg-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{opt.category}</div>
                        <Badge variant="outline" className={
                          opt.impact === 'high' ? 'text-purple-500' : 'text-blue-500'
                        }>
                          {opt.impact} Impact
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {opt.recommendations.map((rec, i) => (
                          <div key={i} className="text-sm text-muted-foreground">
                            • {rec}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Floating Action Button */}
      <Button className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 
        shadow-lg">
        <Plus className="h-6 w-6" />
      </Button>

      {/* Neural Background Effect */}
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

// Helper Components
function VitalCard({ title, value, unit, icon, trend }: {
  title: string;
  value: number | string;
  unit: string;
  icon: React.ReactNode;
  trend: string;
}) {
  return (
    <Card className="p-6 backdrop-blur-lg bg-white/5">
      <div className="flex items-center justify-between mb-4">
        {icon}
        <Badge variant="outline" className={`
          ${trend === 'improving' ? 'text-green-500' : 
            trend === 'declining' ? 'text-red-500' : 
            'text-blue-500'}
        `}>
          {trend}
        </Badge>
      </div>
      <div className="space-y-1">
        <div className="text-2xl font-bold">
          {value}
          <span className="text-sm font-normal ml-1">{unit}</span>
        </div>
        <div className="text-sm text-muted-foreground">{title}</div>
      </div>
    </Card>
  );
}

function ScoreCard({ title, score, icon }: {
  title: string;
  score: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="p-4 rounded-lg bg-white/5">
      <div className="flex items-center gap-2 mb-2">
        {icon}
        <span className="font-medium">{title}</span>
      </div>
      <div className="space-y-2">
        <div className="text-2xl font-bold">{score}</div>
        <Progress value={score} className="h-1" />
      </div>
    </div>
  );
}
