import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Download, FileText, Calendar as CalendarIcon, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export const Statements = () => {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Account Statements</h2>
          <p className="text-muted-foreground">Download official bank statements for your records.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CalendarIcon className="w-4 h-4" />
            Last 30 Days
          </Button>
          <Button className="gap-2">
            <Download className="w-4 h-4" />
            Export All
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Statement Settings</CardTitle>
            <CardDescription>Configure your report preferences.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Account</label>
              <Input value="Current Account (...9367)" readOnly />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Format</label>
              <div className="flex gap-2">
                <Button variant="secondary" className="flex-1">PDF</Button>
                <Button variant="outline" className="flex-1">CSV</Button>
              </div>
            </div>
            <Button className="w-full">Generate Report</Button>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Available Statements</CardTitle>
              <div className="relative w-48">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search..." className="pl-10" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { period: 'May 01, 2022 - May 31, 2022', type: 'Monthly', status: 'Ready' },
                  { period: 'Apr 01, 2022 - Apr 30, 2022', type: 'Monthly', status: 'Ready' },
                  { period: 'Mar 01, 2022 - Mar 31, 2022', type: 'Monthly', status: 'Ready' },
                  { period: 'Feb 01, 2022 - Feb 28, 2022', type: 'Monthly', status: 'Ready' },
                  { period: 'Jan 01, 2022 - Jan 31, 2022', type: 'Monthly', status: 'Archive' },
                ].map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.period}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>
                      <Badge variant={item.status === 'Ready' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Statement Preview (Matching the PDF template) */}
      <Card className="border-2 border-primary/20 shadow-lg overflow-hidden">
        <div className="bg-primary p-6 text-white flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-2xl">P</span>
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">PROMINENCE BANK</h3>
              <p className="text-[10px] uppercase tracking-widest opacity-80">Official Statement</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium">Business Account</p>
            <p className="text-xs opacity-80">Statement Period: May 2022</p>
          </div>
        </div>
        <CardContent className="p-8 space-y-8">
          <div className="flex justify-between">
            <div className="space-y-1">
              <p className="font-bold text-lg">Soto Import SRL</p>
              <p className="text-sm text-muted-foreground">Ave. Venezuela No. 9</p>
              <p className="text-sm text-muted-foreground">Ensanche Ozama, Santo Domingo, DN.</p>
              <p className="text-sm text-muted-foreground">DO. 00000</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-sm font-bold">Questions?</p>
              <p className="text-xs text-muted-foreground">English: +(44) 208 895 6493</p>
              <p className="text-xs text-muted-foreground">Online: prominencebank.com</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 pt-8 border-t">
            <div className="space-y-4">
              <h4 className="font-bold border-b pb-2">Activity Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Beginning balance on 05/01</span>
                  <span className="font-mono">$ 988,880.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Deposits/Credits</span>
                  <span className="font-mono">$ 0.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Withdrawals/Debits</span>
                  <span className="font-mono">- $ 40.00</span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t">
                  <span>Ending balance on 05/31</span>
                  <span className="font-mono">$ 988,840.00</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold border-b pb-2">Account Details</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Account Number</span>
                  <span className="font-mono">588704089367</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Currency</span>
                  <span>USD Account</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Average Ledger Balance</span>
                  <span className="font-mono">$ 988,841.29</span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-8">
            <h4 className="font-bold border-b pb-2">Transaction Detail</h4>
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead className="w-[100px]">Date</TableHead>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Balance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>05/01</TableCell>
                  <TableCell className="font-mono text-xs">8c714a71</TableCell>
                  <TableCell>Monthly fee deduction for the month of May, 2022</TableCell>
                  <TableCell className="text-right text-red-600">- $ 40.00</TableCell>
                  <TableCell className="text-right font-bold">$ 988,840.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          <div className="pt-8 text-[10px] text-muted-foreground text-center italic">
            Prominence Bank Corporation | P.B. 1257 Bonovo Road | Fomboni, Island of Mwali, KM
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
