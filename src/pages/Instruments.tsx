import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Search, 
  Plus, 
  Eye, 
  Download,
  ShieldCheck,
  Briefcase,
  History
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { InstrumentDetailModal } from '@/src/components/modals/InstrumentDetailModal';

const instruments = [
  { id: 'INS-001', type: 'Certificate of Deposit (CD)', amount: '$50,000.00', issueDate: '2023-01-15', expiryDate: '2024-01-15', status: 'Active', ref: 'PB-CD-9821' },
  { id: 'INS-002', type: 'Standby Letter of Credit (SBLC)', amount: '$500,000.00', issueDate: '2023-05-20', expiryDate: '2024-05-20', status: 'Active', ref: 'PB-SBLC-4432' },
  { id: 'INS-003', type: 'Bank Guarantee (BG)', amount: '$250,000.00', issueDate: '2023-03-10', expiryDate: '2023-09-10', status: 'Expired', ref: 'PB-BG-1120' },
  { id: 'INS-004', type: 'Safe Keeping Receipt (SKR)', amount: 'Gold Bullion (10kg)', issueDate: '2022-11-05', expiryDate: 'N/A', status: 'Active', ref: 'PB-SKR-7765' },
  { id: 'INS-005', type: 'Key Tested Telex (KTT)', amount: '$1,000,000.00', issueDate: '2023-08-12', expiryDate: 'N/A', status: 'Active', ref: 'PB-KTT-0091' },
];

export const Instruments = () => {
  const [selectedInstrument, setSelectedInstrument] = React.useState<any>(null);

  return (
    <div className="space-y-8">
      <InstrumentDetailModal 
        instrument={selectedInstrument} 
        isOpen={!!selectedInstrument} 
        onClose={() => setSelectedInstrument(null)} 
      />
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Banking Instruments</h2>
          <p className="text-muted-foreground">Manage and view your active banking products and instruments.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Apply for Instrument
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Active Value</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,800,000.00</div>
            <p className="text-xs text-muted-foreground">+2.5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Instruments</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Across 3 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Under compliance review</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Instrument Portfolio</CardTitle>
              <CardDescription>A detailed list of all your banking instruments and their current status.</CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search reference..." className="pl-10" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Instrument Type</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Amount/Value</TableHead>
                <TableHead>Issue Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {instruments.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.type}</TableCell>
                  <TableCell className="font-mono text-xs">{item.ref}</TableCell>
                  <TableCell>{item.amount}</TableCell>
                  <TableCell>{item.issueDate}</TableCell>
                  <TableCell>
                    <Badge variant={item.status === 'Active' ? 'default' : 'secondary'}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="View Details"
                        onClick={() => setSelectedInstrument(item)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Download PDF">
                        <Download className="w-4 h-4" />
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
