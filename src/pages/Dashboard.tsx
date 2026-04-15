import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Clock, 
  ShieldAlert,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Briefcase
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { useAuth } from '@/src/lib/auth-context';
import { Badge } from '@/components/ui/badge';

const data = [
  { name: 'Jan', balance: 4000 },
  { name: 'Feb', balance: 3000 },
  { name: 'Mar', balance: 5000 },
  { name: 'Apr', balance: 4500 },
  { name: 'May', balance: 6000 },
  { name: 'Jun', balance: 5500 },
  { name: 'Jul', balance: 7000 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
  <Card>
    <CardContent className="p-6">
      <div className="flex items-center justify-between">
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trendValue}
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { profile } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back, {profile?.displayName?.split(' ')[0] || 'User'}</h2>
          <p className="text-muted-foreground">Here's what's happening with your accounts today.</p>
        </div>
        <div className="flex gap-3">
          <Badge variant="outline" className="px-3 py-1 gap-1">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            KYC Approved
          </Badge>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Available Balance" 
          value="$124,592.00" 
          icon={DollarSign} 
          trend="up" 
          trendValue="+12.5%" 
          color="bg-primary" 
        />
        <StatCard 
          title="Held / In-Transit" 
          value="$12,400.00" 
          icon={Clock} 
          color="bg-orange-500" 
        />
        <StatCard 
          title="Total Assets" 
          value="$1,240,000.00" 
          icon={Briefcase} 
          trend="up" 
          trendValue="+5.2%" 
          color="bg-secondary" 
        />
        <StatCard 
          title="Active Instruments" 
          value="4" 
          icon={ShieldAlert} 
          color="bg-slate-700" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Balance History</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#002B49" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#002B49" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#64748b' }}
                    tickFormatter={(value) => `$${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="balance" 
                    stroke="#002B49" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorBalance)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { label: 'Wire Transfer Out', amount: '-$2,400.00', date: 'Today, 2:45 PM', icon: ArrowUpRight, color: 'text-red-600', bg: 'bg-red-50' },
                { label: 'Dividend Credit', amount: '+$450.00', date: 'Yesterday, 10:20 AM', icon: ArrowDownLeft, color: 'text-green-600', bg: 'bg-green-50' },
                { label: 'Internal Transfer', amount: '-$1,200.00', date: 'Oct 12, 2023', icon: ArrowUpRight, color: 'text-slate-600', bg: 'bg-slate-50' },
                { label: 'CD Interest Posting', amount: '+$125.40', date: 'Oct 10, 2023', icon: ArrowDownLeft, color: 'text-green-600', bg: 'bg-green-50' },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${item.bg}`}>
                      <item.icon className={`w-4 h-4 ${item.color}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                  <p className={`text-sm font-bold ${item.color}`}>{item.amount}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <CardTitle>Official Funding Instructions</CardTitle>
          </div>
          <CardDescription>Use these instructions for all incoming wire transfers and deposits.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">USD Wire Instructions</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Bank Name:</span>
                  <span className="font-medium">Prominence Bank Corp.</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">SWIFT/BIC:</span>
                  <span className="font-mono font-medium">PRMNKM11XXX</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-mono font-medium">990011223344</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-muted-foreground">Beneficiary:</span>
                  <span className="font-medium">Prominence Bank Client Funds</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Important Notes</h4>
              <ul className="text-sm space-y-2 list-disc pl-4 text-muted-foreground">
                <li>Always include your <strong>Customer ID</strong> in the reference field.</li>
                <li>Transfers typically clear within 1-3 business days.</li>
                <li>For amounts over $50,000, please notify your account manager.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
