import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserPlus, MoreVertical, ShieldCheck, UserCircle, Eye } from 'lucide-react';
import { useAuth } from '@/src/lib/auth-context';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const mockCustomers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'client', kycStatus: 'Approved', balance: '$124,592.00', joinDate: '2023-01-10' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'client', kycStatus: 'Pending', balance: '$0.00', joinDate: '2023-05-15' },
  { id: '3', name: 'Soto Import SRL', email: 'soto@import.com', role: 'client', kycStatus: 'Approved', balance: '$988,840.00', joinDate: '2022-11-20' },
  { id: '4', name: 'Alice Johnson', email: 'alice@crypto.com', role: 'client', kycStatus: 'Rejected', balance: '$0.00', joinDate: '2023-02-28' },
];

export const AdminCustomers = () => {
  const { setImpersonatedUser } = useAuth();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const handleImpersonate = (customer: any) => {
    setImpersonatedUser(customer);
    toast.info(`Now viewing as ${customer.name}`);
    navigate('/');
  };

  const filteredCustomers = mockCustomers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Customer Management</h2>
          <p className="text-muted-foreground">Manage bank clients, review KYC, and perform administrative actions.</p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add New Client
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+12 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending KYC</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Requires review</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">86</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Directory</CardTitle>
              <CardDescription>Search and manage all registered bank customers.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search name or email..." 
                className="pl-10" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>KYC Status</TableHead>
                <TableHead>Total Balance</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{customer.name}</p>
                        <p className="text-xs text-muted-foreground">{customer.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      customer.kycStatus === 'Approved' ? 'default' : 
                      customer.kycStatus === 'Pending' ? 'secondary' : 'destructive'
                    }>
                      {customer.kycStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">{customer.balance}</TableCell>
                  <TableCell className="text-muted-foreground">{customer.joinDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleImpersonate(customer)}>
                        <Eye className="w-4 h-4" />
                        View As
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
