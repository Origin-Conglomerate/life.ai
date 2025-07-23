// components/WeatherMatrix.tsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import {
  CloudRain,
  Sun,
  Cloud,
  Thermometer,
  Droplet,
  Wind,
  Calendar,
  AlertTriangle,
  CalendarCheck,
  Brain,
  Satellite,
  Stethoscope,
  Clock
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from '@/components/ui/progress';
  import { Badge } from "@/components/ui/badge"
import { Switch } from '@/components/ui/switch';

const weatherData = {
  current: {
    temp: 22,
    condition: 'Sunny',
    humidity: 65,
    wind: 12,
    uv: 4,
    precipitation: 5,
    feelsLike: 24,
    airQuality: 42
  },
  hourly: [
    { time: '06:00', temp: 18, condition: 'Cloudy' },
    { time: '09:00', temp: 22, condition: 'Sunny' },
    { time: '12:00', temp: 26, condition: 'Sunny' },
    { time: '15:00', temp: 28, condition: 'Partly Cloudy' },
    { time: '18:00', temp: 24, condition: 'Rain' },
    { time: '21:00', temp: 20, condition: 'Clear' }
  ],
  alerts: [
    { type: 'rain', time: '18:00', intensity: 'moderate' },
    { type: 'uv', time: '12:00', level: 'high' }
  ],
  tasks: [
    { id: 1, title: 'Play Soccer', time: '18:00', location: 'Central Park' },
    { id: 2, title: 'Outdoor Meeting', time: '12:00', location: 'Roof Terrace' }
  ]
};

const getConditionGradient = (condition: string) => {
  const c = condition.toLowerCase();
  if (c.includes('rain')) return 'from-blue-900/20 to-purple-900/20';
  if (c.includes('sunny')) return 'from-yellow-900/20 to-orange-900/20';
  return 'from-gray-900/20 to-blue-900/20';
};

export function WeatherMatrix() {
  const [viewMode, setViewMode] = useState<'standard' | 'hologram'>('standard');
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [weatherAI, setWeatherAI] = useState(true);

  const getTaskAlerts = () => {
    return weatherData.tasks.filter(task => 
      weatherData.alerts.some(alert => 
        alert.time === task.time && 
        (alert.type === 'rain' || alert.type === 'uv')
      )
    );
  };

  return (
    <div className={`relative rounded-3xl overflow-hidden 
      bg-gradient-to-br ${getConditionGradient(weatherData.current.condition)}
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8`}>
      
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 
            to-purple-300 bg-clip-text text-transparent">
            AtmosSync
          </h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <Badge className="bg-blue-500/10 text-blue-500">
              <Satellite className="h-4 w-4 mr-2" />
              Live Satellite Sync
            </Badge>
            <span className="flex items-center gap-2">
              <Thermometer className="h-4 w-4" />
              Feels like {weatherData.current.feelsLike}°C
            </span>
          </div>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => setViewMode(v => v === 'standard' ? 'hologram' : 'standard')}>
            {viewMode === 'standard' ? 'Hologram View' : 'Standard View'}
          </Button>
          <Switch checked={weatherAI} onCheckedChange={setWeatherAI} />
        </div>
      </div>

      {/* Main Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-6">
            <div className="text-6xl font-bold">
              {weatherData.current.temp}°C
              <div className="text-xl text-muted-foreground">
                {weatherData.current.condition}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Droplet className="h-6 w-6 text-blue-400" />
                <span>{weatherData.current.humidity}% Humidity</span>
              </div>
              <div className="flex items-center gap-4">
                <Wind className="h-6 w-6 text-green-400" />
                <span>{weatherData.current.wind} km/h Wind</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={[weatherData.current]}>
              <PolarGrid />
              <PolarAngleAxis dataKey="condition" />
              <PolarRadiusAxis />
              <Radar
                name="Metrics"
                dataKey="uv"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </Card>

        {/* AI Recommendations */}
        <Card className="p-6 backdrop-blur-lg bg-white/5 space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-400" />
            Weather AI
          </h3>
          <div className="space-y-4">
            {getTaskAlerts().map(task => (
              <motion.div
                key={task.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-red-500/10 border border-red-500/30"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                  <div>
                    <div className="font-medium">Schedule Conflict!</div>
                    <div className="text-sm">
                      {task.title} at {task.time} might be affected by {weatherData.alerts.find(a => a.time === task.time)?.type}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
              <div className="flex items-center gap-3">
                <CalendarCheck className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-medium">Perfect Weather Window</div>
                  <div className="text-sm">15:00-17:00: Ideal for outdoor activities</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Forecast Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4">Hourly Forecast</h3>
          <div className="grid grid-cols-3 lg:grid-cols-6 gap-4">
            {weatherData.hourly.map(hour => (
              <motion.div
                key={hour.time}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg cursor-pointer transition-all
                  ${selectedTime === hour.time ? 'bg-blue-500/10 border-blue-500/30' : 'bg-white/5'}`}
                onClick={() => setSelectedTime(hour.time)}
              >
                <div className="space-y-2 text-center">
                  <div className="text-sm font-medium">{hour.time}</div>
                  <Thermometer className="h-6 w-6 mx-auto" />
                  <div className="text-xl font-bold">{hour.temp}°C</div>
                  <Badge variant="outline">{hour.condition}</Badge>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4">7-Day Forecast</h3>
          <ResponsiveContainer width="100%" height={150}>
            <AreaChart data={[
              { day: 'Mon', temp: 22, rain: 10 },
              { day: 'Tue', temp: 24, rain: 5 },
              { day: 'Wed', temp: 19, rain: 80 },
              { day: 'Thu', temp: 21, rain: 30 },
              { day: 'Fri', temp: 25, rain: 0 },
              { day: 'Sat', temp: 27, rain: 0 },
              { day: 'Sun', temp: 23, rain: 15 },
            ]}>
              <Area
                dataKey="temp"
                stroke="#f59e0b"
                fill="#f59e0b"
                fillOpacity={0.1}
              />
              <Area
                dataKey="rain"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.1}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Health & Activities Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-green-400" />
            Health Impact
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-purple-500/10">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="h-5 w-5 text-purple-400" />
                <span className="font-medium">Thermal Comfort</span>
              </div>
              <Progress value={78} className="h-2" />
              <span className="text-sm text-muted-foreground">Ideal for outdoor activities</span>
            </div>
            <div className="p-4 rounded-lg bg-red-500/10">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-red-400" />
                <span className="font-medium">UV Exposure</span>
              </div>
              <Progress value={weatherData.current.uv * 20} className="h-2" />
              <span className="text-sm text-muted-foreground">High risk - Use SPF 50+</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 backdrop-blur-lg bg-white/5">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Brain className="h-5 w-5 text-blue-400" />
            Suggested Activities
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <motion.div className="p-4 rounded-lg bg-green-500/10">
              <div className="flex items-center gap-3 mb-2">
                <Cloud className="h-6 w-6 text-green-500" />
                <div>
                  <div className="font-medium">Indoor Yoga</div>
                  <div className="text-sm text-muted-foreground">18:00-19:00</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="p-4 rounded-lg bg-blue-500/10">
              <div className="flex items-center gap-3 mb-2">
                <Sun className="h-6 w-6 text-blue-500" />
                <div>
                  <div className="font-medium">Morning Run</div>
                  <div className="text-sm text-muted-foreground">06:00-07:00</div>
                </div>
              </div>
            </motion.div>
            <motion.div className="p-4 rounded-lg bg-purple-500/10">
              <div className="flex items-center gap-3 mb-2">
                <CloudRain className="h-6 w-6 text-purple-500" />
                <div>
                  <div className="font-medium">Reading Time</div>
                  <div className="text-sm text-muted-foreground">20:00-21:00</div>
                </div>
              </div>
            </motion.div>
          </div>
        </Card>
      </div>

      {/* Visual Effects */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        {weatherData.current.condition.toLowerCase().includes('rain') && 
          Array.from({ length: 100 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-blue-400 rounded-full"
              animate={{ y: [0, window.innerHeight], opacity: [1, 0] }}
              transition={{ duration: 1 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
              style={{ left: `${Math.random() * 100}%` }}
            />
          ))}

        {weatherData.current.uv > 3 && 
          Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-yellow-500 rounded-full"
              animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2 + Math.random() * 3, repeat: Infinity, delay: Math.random() * 2 }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}

        {weatherData.current.condition.toLowerCase().includes('cloudy') && 
          Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-2 w-2 bg-white rounded-full"
              animate={{ x: [0, 100, 0], y: [0, 50, 0], opacity: [0, 0.3, 0] }}
              transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: Math.random() * 5 }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
      </div>

      {/* Solar Flare Effect */}
      {weatherData.current.condition.toLowerCase().includes('sunny') && (
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <motion.div
            className="absolute h-64 w-64 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-2xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ left: '30%', top: '20%' }}
          />
        </div>
      )}
    </div>
  );
}