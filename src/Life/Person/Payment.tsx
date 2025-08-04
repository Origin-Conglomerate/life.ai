import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CreditCard, Wallet, Bitcoin, Banknote, Scan, ArrowLeft, Check, Loader2, Smartphone, } from 'lucide-react';
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

export default function PaymentModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [activeTab, setActiveTab] = useState('scan');
  const [amount, setAmount] = useState('');
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [qrData, setQrData] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  // Simulate QR code scanning
  useEffect(() => {
    if (activeTab === 'scan' && open) {
      const timer = setTimeout(() => {
        setQrData('payment:john-doe-account|amount:50.00|memo:Dinner');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [activeTab, open]);

  // Simulate camera access for QR scanning
  useEffect(() => {
    if (activeTab === 'scan' && open) {
      // In a real app, you would access the device camera here
      // This is just a simulation with a placeholder
      const timer = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = null; // Simulate camera feed
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [activeTab, open]);

  const handlePayment = () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    setPaymentProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setPaymentProcessing(false);
      setPaymentSuccess(true);
      toast.success(`Payment of $${amount} completed successfully!`);
      
      // Reset after showing success
      setTimeout(() => {
        setPaymentSuccess(false);
        onOpenChange(false);
        setAmount('');
      }, 2000);
    }, 3000);
  };

  const paymentMethods = [
    { id: 'scan', name: 'QR Scan', icon: QrCode, color: 'text-purple-400' },
    { id: 'card', name: 'Credit Card', icon: CreditCard, color: 'text-blue-400' },
    { id: 'wallet', name: 'Digital Wallet', icon: Wallet, color: 'text-green-400' },
    { id: 'crypto', name: 'Crypto', icon: Bitcoin, color: 'text-yellow-400' },
    { id: 'bank', name: 'Bank Transfer', icon: Banknote, color: 'text-emerald-400' },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] rounded-2xl overflow-hidden overflow-y-auto
        bg-gradient-to-br from-purple-900/20 to-blue-900/20
        dark:from-gray-900/90 dark:to-gray-800/90
        border border-white/20 dark:border-gray-700/50
        p-0 backdrop-blur-lg">
        
        <DialogHeader className="p-6 pb-0">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 
              to-blue-300 bg-clip-text text-transparent">
              Quantum Payment Gateway
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="p-6 pt-0 space-y-6">
          {/* Amount Input */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="text-muted-foreground">Amount (USD)</Label>
            <div className="relative">
              <Input
                id="amount"
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-3xl h-16 pl-12 font-bold bg-white/5 border-white/20"
                disabled={paymentProcessing || paymentSuccess}
              />
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold">$</span>
            </div>
          </div>

          {/* Payment Methods Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full h-24 grid-cols-5 bg-white/5 border border-white/20">
              {paymentMethods.map((method) => (
                <TabsTrigger 
                  key={method.id} 
                  value={method.id}
                  className="flex flex-col gap-1 h-20 py-3 data-[state=active]:bg-white/10"
                  disabled={paymentProcessing || paymentSuccess}
                >
                  <method.icon className={`h-5 w-5 ${method.color}`} />
                  <span className="text-xs">{method.name}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* QR Scan Tab */}
            <TabsContent value="scan" className="mt-6">
              <Card className="bg-white/5 border-white/20 overflow-hidden">
                <div className="relative aspect-square flex items-center justify-center">
                  {!qrData ? (
                    <>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Scan className="h-16 w-16 text-white/30 animate-pulse" />
                      </div>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover opacity-20"
                        autoPlay
                        muted
                        playsInline
                      />
                    </>
                  ) : (
                    <div className="p-6 flex flex-col items-center justify-center space-y-4">
                      <div className="relative p-4 bg-white rounded-lg">
                        <QrCode className="h-32 w-32 text-black" />
                        <div className="absolute inset-0 border-2 border-dashed border-purple-400 animate-ping rounded-lg opacity-70" />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">Scan Successful</p>
                        <p className="text-sm text-muted-foreground">Pay to: John Doe</p>
                        <p className="text-lg font-bold mt-2">${amount || '0.00'}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>

            {/* Credit Card Tab */}
            <TabsContent value="card" className="mt-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardDetails.number}
                    onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
                    className="bg-white/5 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cardName">Name on Card</Label>
                  <Input
                    id="cardName"
                    placeholder="John Doe"
                    value={cardDetails.name}
                    onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
                    className="bg-white/5 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
                    className="bg-white/5 border-white/20"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
                    className="bg-white/5 border-white/20"
                  />
                </div>
              </div>
              
              <Card className="p-4 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Current Balance</p>
                    <p className="text-xl font-bold">$4,852.76</p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Digital Wallet Tab */}
            <TabsContent value="wallet" className="mt-6 space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {['Apple Pay', 'Google Pay', 'Samsung Pay', 'PayPal', 'Venmo', 'Cash App'].map((wallet) => (
                  <Button
                    key={wallet}
                    variant="outline"
                    className="flex flex-col gap-2 h-24 bg-white/5 border-white/20 hover:bg-white/10"
                  >
                    <Smartphone className="h-6 w-6" />
                    <span className="text-xs">{wallet}</span>
                  </Button>
                ))}
              </div>
            </TabsContent>

            {/* Other tabs would go here... */}
          </Tabs>

          {/* Payment Button */}
          <Button
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
            onClick={handlePayment}
            disabled={!amount || paymentProcessing || paymentSuccess}
          >
            {paymentProcessing ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : paymentSuccess ? (
              <Check className="h-5 w-5" />
            ) : (
              `Pay $${amount || '0.00'}`
            )}
          </Button>

          {/* Payment Processing Indicator */}
          {paymentProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Processing payment...</span>
                <span>Secured by Quantum Encryption</span>
              </div>
              <Progress value={66} className="h-1 bg-white/10" indicatorClassName="bg-gradient-to-r from-purple-400 to-blue-400" />
            </div>
          )}

          {/* Payment Success Animation */}
          <AnimatePresence>
            {paymentSuccess && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center space-y-2 p-4"
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                  className="p-3 rounded-full bg-green-500/20"
                >
                  <Check className="h-8 w-8 text-green-400" />
                </motion.div>
                <p className="text-xl font-semibold">Payment Successful!</p>
                <p className="text-sm text-muted-foreground">Transaction completed securely</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Ambient Effects */}
        <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 bg-purple-400 rounded-full"
              animate={{
                x: [0, 100, 0],
                y: [0, 50, 0],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 5 + Math.random() * 10,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}