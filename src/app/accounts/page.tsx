'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Plus,
  Edit2,
  Trash2,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ShieldAlert,
  Target
} from 'lucide-react';

const mockAccounts = [
  {
    id: '1',
    name: 'Prop Firm Demo',
    type: 'prop_firm',
    accountGroup: 'Prop Firms',
    baseCurrency: 'USD',
    initialBalance: 100000,
    currentBalance: 102450,
    maxDrawdownLimit: 10000,
    dailyLossLimit: 500,
    profitTarget: 5000,
    maxRiskPerTrade: 1.0,
    isActive: true
  },
  {
    id: '2',
    name: 'Personal Live',
    type: 'personal',
    accountGroup: 'Personal',
    baseCurrency: 'USD',
    initialBalance: 15000,
    currentBalance: 15890,
    maxDrawdownLimit: null,
    dailyLossLimit: null,
    profitTarget: null,
    maxRiskPerTrade: 2.0,
    isActive: true
  },
  {
    id: '3',
    name: 'Challenge Account',
    type: 'prop_firm',
    accountGroup: 'Challenges',
    baseCurrency: 'USD',
    initialBalance: 106000,
    currentBalance: 105200,
    maxDrawdownLimit: 10000,
    dailyLossLimit: 500,
    profitTarget: 5000,
    maxRiskPerTrade: 1.0,
    isActive: true
  }
];

export default function AccountsPage() {
  const [accounts, setAccounts] = useState(mockAccounts);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<any>(null);

  const calculatePnL = (initial: number, current: number) => {
    const pnl = current - initial;
    const percent = ((pnl / initial) * 100).toFixed(2);
    return { pnl, percent };
  };

  const calculateDrawdownProgress = (initial: number, current: number, limit: number) => {
    if (!limit) return 0;
    const drawdown = initial - current;
    const progress = Math.min((drawdown / limit) * 100, 100);
    return progress;
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Accounts</h1>
            <p className="text-muted-foreground mt-1">
              Manage your trading accounts and risk profiles
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Add New Account</DialogTitle>
                <DialogDescription>
                  Set up a new trading account with custom risk parameters
                </DialogDescription>
              </DialogHeader>
              <AddAccountForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Account Stats Summary */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${accounts.reduce((sum, acc) => sum + acc.currentBalance, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                +${accounts.reduce((sum, acc) => sum + (acc.currentBalance - acc.initialBalance), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {accounts.filter(acc => acc.isActive).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accounts Near Limit</CardTitle>
              <ShieldAlert className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600 dark:text-orange-500">
                1
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Accounts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {accounts.map((account) => {
            const pnl = calculatePnL(account.initialBalance, account.currentBalance);
            const isPositive = pnl.pnl >= 0;
            const drawdownProgress = calculateDrawdownProgress(account.initialBalance, account.currentBalance, account.maxDrawdownLimit || 0);

            return (
              <Card key={account.id} className="relative">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge variant={account.type === 'prop_firm' ? 'default' : 'secondary'}>
                          {account.type === 'prop_firm' ? 'Prop Firm' : account.type === 'demo' ? 'Demo' : 'Personal'}
                        </Badge>
                        {account.accountGroup && (
                          <Badge variant="outline">{account.accountGroup}</Badge>
                        )}
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Balance Info */}
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold">
                        ${account.currentBalance.toLocaleString()}
                      </div>
                      <div className={`text-sm ${isPositive ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {isPositive ? '+' : ''}{pnl.pnl.toLocaleString()} ({isPositive ? '+' : ''}{pnl.percent}%)
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">Initial</div>
                      <div className="font-medium">${account.initialBalance.toLocaleString()}</div>
                    </div>
                  </div>

                  <Separator />

                  {/* Risk Parameters */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Max Risk/Trade</span>
                      <span className="font-medium">{account.maxRiskPerTrade}%</span>
                    </div>

                    {account.maxDrawdownLimit && (
                      <>
                        <div>
                          <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-muted-foreground">Drawdown Limit</span>
                            <span className="font-medium">${account.maxDrawdownLimit.toLocaleString()}</span>
                          </div>
                          <Progress value={drawdownProgress} className="h-2" />
                        </div>
                      </>
                    )}

                    {account.dailyLossLimit && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Daily Loss Limit</span>
                        <span className="font-medium">${account.dailyLossLimit.toLocaleString()}</span>
                      </div>
                    )}

                    {account.profitTarget && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Profit Target</span>
                        <span className="font-medium text-green-600 dark:text-green-500">${account.profitTarget.toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Status */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${account.isActive ? 'bg-green-500' : 'bg-gray-500'}`} />
                      <span className="text-sm text-muted-foreground">
                        {account.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">{account.baseCurrency}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}

function AddAccountForm({ onClose }: { onClose: () => void }) {
  return (
    <ScrollArea className="max-h-[60vh] pr-4">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Account Name *</Label>
            <Input id="name" placeholder="My Trading Account" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Account Type *</Label>
            <Select required>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="personal">Personal</SelectItem>
                <SelectItem value="demo">Demo</SelectItem>
                <SelectItem value="prop_firm">Prop Firm</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="group">Account Group (Optional)</Label>
          <Input id="group" placeholder="e.g., Prop Firms, Personal" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="baseCurrency">Base Currency *</Label>
            <Select defaultValue="USD" required>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
                <SelectItem value="GBP">GBP</SelectItem>
                <SelectItem value="JPY">JPY</SelectItem>
                <SelectItem value="AUD">AUD</SelectItem>
                <SelectItem value="CAD">CAD</SelectItem>
                <SelectItem value="CHF">CHF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialBalance">Initial Balance *</Label>
            <Input id="initialBalance" type="number" placeholder="100000" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxRisk">Max Risk Per Trade (%) *</Label>
          <Input id="maxRisk" type="number" step="0.1" placeholder="1.0" required />
        </div>

        <Separator className="my-4" />
        <div className="text-sm font-medium">Prop Firm Settings (Optional)</div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="maxDrawdown">Max Drawdown Limit</Label>
            <Input id="maxDrawdown" type="number" placeholder="10000" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dailyLoss">Daily Loss Limit</Label>
            <Input id="dailyLoss" type="number" placeholder="500" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profitTarget">Profit Target</Label>
            <Input id="profitTarget" type="number" placeholder="5000" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch id="isActive" defaultChecked />
          <Label htmlFor="isActive">Account is active</Label>
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Account</Button>
        </div>
      </form>
    </ScrollArea>
  );
}
