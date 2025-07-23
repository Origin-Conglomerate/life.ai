// components/ExpenseTracker.tsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Wallet,
  Zap,
  AlertCircle,
  TrendingUp,
  PiggyBank,
  Satellite,
  SmartphoneNfc,
  Clock,
  Banknote,
  Plus
} from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Badge } from "@/components/ui/badge"
  import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

// Mock financial data
const financialData = {
  currentBalance: 45230.56,
  monthlySpending: 12450.00,
  budget: 20000.00,
  categories: [
    { name: 'Food', value: 4200, color: '#f59e0b', budget: 5000 },
    { name: 'Travel', value: 3100, color: '#3b82f6', budget: 4000 },
    { name: 'Tech', value: 2800, color: '#8b5cf6', budget: 3000 },
    { name: 'Entertainment', value: 1750, color: '#ec4899', budget: 2000 }
  ],
  transactions: [
    { id: 1, amount: -249.99, category: 'Tech', merchant: 'Quantum Compute Inc', timestamp: new Date(), location: 'San Francisco, CA' },
    { id: 2, amount: -89.50, category: 'Food', merchant: 'NeoBistro', timestamp: new Date(), location: 'New York, NY' },
    { id: 3, amount: 1500.00, category: 'Income', merchant: 'NeuroTech Corp', timestamp: new Date(), location: 'Remote' }
  ],
  predictions: [
    { month: 'Jan', projected: 18000, actual: 17500 },
    { month: 'Feb', projected: 18500, actual: 19200 },
    { month: 'Mar', projected: 19000, actual: 21000 },
    { month: 'Apr', projected: 20000, actual: null }
  ]
};

const COLORS = ['#f59e0b', '#3b82f6', '#8b5cf6', '#ec4899', '#10b981'];

export function FinanceDashboard() {
  const [isAdding, setIsAdding] = useState(false);
  const [viewMode, setViewMode] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const FinancialHologram = () => (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full"
    />
  );

  return (
    <div className="relative rounded-3xl overflow-hidden 
      bg-gradient-to-br from-emerald-900/20 to-cyan-900/20
      dark:from-gray-900/90 dark:to-gray-800/90
      border border-white/20 dark:border-gray-700/50
      p-6 space-y-8">
      
      {/* Quantum Financial Header */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex items-center justify-between"
      >
        <div className="space-y-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 
            to-cyan-300 bg-clip-text text-transparent">
            NeuroWealth Matrix
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Zap className="h-4 w-4 text-yellow-500 animate-pulse" />
            Real-time Transaction Sync Active
          </p>
        </div>
        <Badge variant="outline" className="border-cyan-500/30 bg-cyan-500/10">
          AI-Finance 4.0 Enabled
        </Badge>
      </motion.div>

      {/* Financial Quantum Field */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Holographic Balance Sphere */}
        <div className="relative lg:col-span-2 h-96 rounded-2xl overflow-hidden
          bg-gradient-to-br from-emerald-500/10 to-cyan-500/10
          border border-white/10 backdrop-blur-lg">
          <FinancialHologram />
          <div className="absolute inset-0 flex flex-col items-center justify-center 
            space-y-4 z-10">
            <div className="text-center">
              <p className="text-muted-foreground">Quantum Balance</p>
              <h2 className="text-5xl font-bold">
                ${financialData.currentBalance.toLocaleString()}
              </h2>
            </div>
            <div className="grid grid-cols-3 gap-8 text-center">
              <div>
                <p className="text-muted-foreground">Monthly Spend</p>
                <p className="text-2xl">${financialData.monthlySpending.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Budget Remaining</p>
                <p className="text-2xl text-emerald-400">
                  ${(financialData.budget - financialData.monthlySpending).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">AI Projection</p>
                <p className="text-2xl">${(financialData.currentBalance * 1.12).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Orbital Financial Metrics */}
        <div className="space-y-6">
          <Card className="p-4 backdrop-blur-lg bg-white/5">
            <ResponsiveContainer width="100%" height={150}>
              <PieChart>
                <Pie
                  data={financialData.categories}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={60}
                >
                  {financialData.categories.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {financialData.categories.map((category, index) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4 backdrop-blur-lg bg-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">AI Savings Tips</h3>
              <PiggyBank className="h-5 w-5 text-emerald-400" />
            </div>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-emerald-500/10">
                <p className="text-sm">Reduce food spending by 15% to save $630/mo</p>
              </div>
              <div className="p-3 rounded-lg bg-cyan-500/10">
                <p className="text-sm">Optimize subscriptions: Save $240/yr</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Financial Neural Network */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 backdrop-blur-lg bg-white/5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-cyan-400" />
              Spending Quantum Map
            </h3>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {financialData.categories.map(category => (
                  <SelectItem key={category.name} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={financialData.predictions}>
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip
                contentStyle={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  backdropFilter: 'blur(10px)'
                }}
              />
              <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              <Bar dataKey="projected" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Transaction Quantum Stream */}
        <Card className="p-6 backdrop-blur-lg bg-white/5 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Quantum Transaction Feed</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Manual
                </Button>
              </DialogTrigger>
              <TransactionForm />
            </Dialog>
          </div>
          
          <div className="space-y-4">
            {financialData.transactions.map(transaction => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium">
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </span>
                      <Badge variant="outline" className="border-emerald-500/30 
                        bg-emerald-500/10 text-emerald-600 dark:text-emerald-300">
                        {transaction.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {transaction.merchant}
                      <span className="mx-2">•</span>
                      {transaction.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">Edit</Button>
                    <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Financial AI Assistant */}
      <motion.div
        className="absolute bottom-6 right-6 flex gap-3"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <Button variant="default" className="shadow-lg gap-2">
          <Satellite className="h-4 w-4" />
          Request Financial AI Scan
        </Button>
      </motion.div>
    </div>
  );
}

function TransactionForm() {
  return (
    <DialogContent className="max-w-md rounded-2xl">
      <DialogHeader>
        <DialogTitle className="text-2xl">Quantum Transaction Entry</DialogTitle>
      </DialogHeader>
      <div className="space-y-6">
        <div className="space-y-4">
          <Input placeholder="Amount" type="number" />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {financialData.categories.map(category => (
                <SelectItem key={category.name} value={category.name}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="Merchant" />
          <Input placeholder="Location" />
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">Cancel</Button>
            <Button className="flex-1">Add Transaction</Button>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}