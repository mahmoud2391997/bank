import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider, useAuth } from './lib/auth-context';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Instruments } from './pages/Instruments';
import { Statements } from './pages/Statements';
import { AdminCustomers } from './pages/admin/AdminCustomers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Placeholder components for other pages
const Accounts = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">My Accounts</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Current Account</CardTitle>
          <CardDescription>USD - 588704089367</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">$124,592.00</div>
          <p className="text-sm text-muted-foreground mt-2">Available: $124,592.00 | Held: $0.00</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Savings Account</CardTitle>
          <CardDescription>EUR - 112233445566</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">€45,200.00</div>
          <p className="text-sm text-muted-foreground mt-2">Interest Rate: 3.5% APY</p>
        </CardContent>
      </Card>
    </div>
  </div>
);

const Transfers = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">Funds Transfer</h2>
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>New Transfer</CardTitle>
        <CardDescription>Send money to internal or external accounts.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>From Account</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="current">Current Account ($124,592.00)</SelectItem>
              <SelectItem value="savings">Savings Account (€45,200.00)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Beneficiary</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select beneficiary" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">John Doe (Internal)</SelectItem>
              <SelectItem value="2">Soto Import SRL (External Wire)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Amount</Label>
          <Input type="number" placeholder="0.00" />
        </div>
        <Button className="w-full">Initiate Transfer</Button>
      </CardContent>
    </Card>
  </div>
);

const AdminSettings = () => (
  <div className="space-y-8">
    <h2 className="text-3xl font-bold tracking-tight">System Settings</h2>
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Fee Table</CardTitle>
          <CardDescription>Configure transaction and service fees.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center">
            <Label>Monthly Account Fee</Label>
            <Input className="w-24 text-right" defaultValue="40.00" />
          </div>
          <div className="flex justify-between items-center">
            <Label>International Wire Fee (%)</Label>
            <Input className="w-24 text-right" defaultValue="2.0" />
          </div>
          <Button className="w-full">Save Changes</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Crypto Wallets</CardTitle>
          <CardDescription>Manage bank destination addresses.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Bitcoin (BTC)</Label>
            <Input defaultValue="1CxAKLfdXjW9R4pyrfFgUPWRyWywN33qZp" />
          </div>
          <div className="space-y-2">
            <Label>Ethereum (ETH)</Label>
            <Input defaultValue="0x7e3E65A8aeE5d5FAc2a1a59A72aFCa1768636992" />
          </div>
          <Button className="w-full">Update Wallets</Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Initializing Secure Session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <DashboardLayout>{children}</DashboardLayout>;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/accounts" 
            element={
              <ProtectedRoute>
                <Accounts />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/transfers" 
            element={
              <ProtectedRoute>
                <Transfers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/instruments" 
            element={
              <ProtectedRoute>
                <Instruments />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/statements" 
            element={
              <ProtectedRoute>
                <Statements />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">User Profile</h2>
                  <p className="text-muted-foreground">Manage your personal and security settings.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          
          {/* Admin Routes */}
          <Route 
            path="/admin/customers" 
            element={
              <ProtectedRoute>
                <AdminCustomers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/kyc" 
            element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">KYC Compliance</h2>
                  <p className="text-muted-foreground">Admin only: Review and approve KYC requests.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/instruments" 
            element={
              <ProtectedRoute>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold">Manage Instruments</h2>
                  <p className="text-muted-foreground">Admin only: Create and assign instruments to clients.</p>
                </div>
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin/settings" 
            element={
              <ProtectedRoute>
                <AdminSettings />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
