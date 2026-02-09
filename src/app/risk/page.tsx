'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ShieldAlert,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Calculator
} from 'lucide-react';

const propFirmAccounts = [
  {
    id: '1',
    name: 'Prop Firm Demo',
    initialBalance: 100000,
    currentBalance: 102450,
    maxDrawdownLimit: 10000,
    currentDrawdown: 2500,
    dailyLossLimit: 500,
    dailyLoss: 400,
    profitTarget: 5000,
    currentProfit: 2450,
    maxRiskPerTrade: 1.0
  },
  {
    id: '3',
    name: 'Challenge Account',
    initialBalance: 106000,
    currentBalance: 105200,
    maxDrawdownLimit: 10000,
    currentDrawdown: 8800,
    dailyLossLimit: 500,
    dailyLoss: 200,
    profitTarget: 5000,
    currentProfit: -800,
    maxRiskPerTrade: 1.0
  }
];

export default function RiskPage() {
  const [selectedAccount, setSelectedAccount] = useState('1');
  const [simulatedRisk, setSimulatedRisk] = useState(1.0);

  const account = propFirmAccounts.find(a => a.id === selectedAccount) || propFirmAccounts[0];

  const drawdownProgress = (account.currentDrawdown / account.maxDrawdownLimit) * 100;
  const dailyLossProgress = (account.dailyLoss / account.dailyLossLimit) * 100;
  const profitProgress = (account.currentProfit / account.profitTarget) * 100;

  const getProgressColor = (value: number, limit: number) => {
    const percentage = (value / limit) * 100;
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 70) return 'bg-orange-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Risk Management</h1>
            <p className="text-muted-foreground mt-1">
              Monitor risk limits and analyze trading scenarios
            </p>
          </div>
        </div>

        {/* Account Selector */}
        <div className="flex gap-2">
          {propFirmAccounts.map(acc => (
            <Button
              key={acc.id}
              variant={selectedAccount === acc.id ? 'default' : 'outline'}
              onClick={() => setSelectedAccount(acc.id)}
            >
              {acc.name}
            </Button>
          ))}
        </div>

        <Tabs defaultValue="limits" className="space-y-4">
          <TabsList>
            <TabsTrigger value="limits">Prop Firm Limits</TabsTrigger>
            <TabsTrigger value="simulator">What-If Simulator</TabsTrigger>
            <TabsTrigger value="alerts">Risk Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="limits" className="space-y-4">
            {/* Account Overview */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${account.currentBalance.toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Initial: ${account.initialBalance.toLocaleString()}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Net PnL</CardTitle>
                  {account.currentBalance >= account.initialBalance ? (
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-600 dark:text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${account.currentBalance >= account.initialBalance ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                    {account.currentBalance >= account.initialBalance ? '+' : ''}${(account.currentBalance - account.initialBalance).toLocaleString()}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {(((account.currentBalance - account.initialBalance) / account.initialBalance) * 100).toFixed(2)}%
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Max Risk/Trade</CardTitle>
                  <ShieldAlert className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {account.maxRiskPerTrade}%
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    ≈${Math.round(account.currentBalance * account.maxRiskPerTrade / 100)}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Max Drawdown Limit */}
            <Card className={drawdownProgress >= 80 ? 'border-red-500' : ''}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <ShieldAlert className="h-5 w-5" />
                    Max Drawdown Limit
                  </CardTitle>
                  <Badge variant={drawdownProgress >= 80 ? 'destructive' : 'default'}>
                    {drawdownProgress >= 80 ? 'Critical' : drawdownProgress >= 60 ? 'Warning' : 'Safe'}
                  </Badge>
                </div>
                <CardDescription>
                  Total drawdown from initial balance
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Drawdown</span>
                    <span className={`font-bold ${drawdownProgress >= 80 ? 'text-red-600 dark:text-red-500' : ''}`}>
                      ${account.currentDrawdown.toLocaleString()} / ${account.maxDrawdownLimit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={drawdownProgress} className="h-3" />
                  <div className="text-right text-sm mt-1">
                    {drawdownProgress.toFixed(1)}% used
                  </div>
                </div>

                {drawdownProgress >= 70 && (
                  <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
                    <div className="flex items-center gap-2 text-orange-600 dark:text-orange-500">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Approaching Drawdown Limit!</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Buffer Remaining</div>
                    <div className="font-bold">${(account.maxDrawdownLimit - account.currentDrawdown).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Trades Before Limit</div>
                    <div className="font-bold">
                      {Math.floor((account.maxDrawdownLimit - account.currentDrawdown) / (account.currentBalance * account.maxRiskPerTrade / 100))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Daily Loss Limit */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Daily Loss Limit
                </CardTitle>
                <CardDescription>
                  Maximum loss allowed for today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Daily Loss</span>
                    <span className="font-bold">
                      ${account.dailyLoss.toLocaleString()} / ${account.dailyLossLimit.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={dailyLossProgress} className="h-3" />
                  <div className="text-right text-sm mt-1">
                    {dailyLossProgress.toFixed(1)}% used
                  </div>
                </div>

                {dailyLossProgress >= 80 && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Daily Loss Limit Warning!</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Buffer Remaining</div>
                    <div className="font-bold">${(account.dailyLossLimit - account.dailyLoss).toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Safe Trades Left</div>
                    <div className="font-bold">
                      {Math.floor((account.dailyLossLimit - account.dailyLoss) / (account.currentBalance * account.maxRiskPerTrade / 100))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Profit Target */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    Profit Target
                  </CardTitle>
                  {profitProgress >= 100 && (
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
                  )}
                </div>
                <CardDescription>
                  Target profit to pass evaluation
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Current Profit</span>
                    <span className={`font-bold ${account.currentProfit >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                      ${account.currentProfit.toLocaleString()} / ${account.profitTarget.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={profitProgress} className="h-3" />
                  <div className="text-right text-sm mt-1">
                    {profitProgress.toFixed(1)}% achieved
                  </div>
                </div>

                {profitProgress >= 100 && (
                  <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-500">
                      <CheckCircle2 className="h-4 w-4" />
                      <span className="font-medium">Profit Target Reached!</span>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <div className="text-sm text-muted-foreground">Profit Remaining</div>
                    <div className={`font-bold ${account.profitTarget - account.currentProfit > 0 ? 'text-foreground' : 'text-green-600 dark:text-green-500'}`}>
                      ${Math.max(0, account.profitTarget - account.currentProfit).toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Est. Trades to Target</div>
                    <div className="font-bold">
                      {Math.ceil(Math.max(0, account.profitTarget - account.currentProfit) / (account.currentBalance * account.maxRiskPerTrade / 100 * 2))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="simulator" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  What-If Simulator
                </CardTitle>
                <CardDescription>
                  Project equity curve based on different risk parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Risk Slider */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="riskSlider">Risk Per Trade</Label>
                    <div className="text-right">
                      <span className="text-2xl font-bold">{simulatedRisk}%</span>
                      <div className="text-sm text-muted-foreground">
                        ≈${Math.round(account.currentBalance * simulatedRisk / 100)} per trade
                      </div>
                    </div>
                  </div>
                  <Input
                    id="riskSlider"
                    type="range"
                    min="0.5"
                    max="5"
                    step="0.1"
                    value={simulatedRisk}
                    onChange={(e) => setSimulatedRisk(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>

                {/* Strategy Filter */}
                <div className="space-y-2">
                  <Label>Filter by Strategy</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select strategy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Strategies</SelectItem>
                      <SelectItem value="1">NY Open FVG + SMT</SelectItem>
                      <SelectItem value="2">London Breakout</SelectItem>
                      <SelectItem value="3">ICT 2022 Model</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Simulated Results */}
                <div className="space-y-4">
                  <div className="text-sm font-medium">Projected Performance (Next 50 Trades)</div>

                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Expected PnL</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                        +${Math.round(50 * 185 * (simulatedRisk / account.maxRiskPerTrade)).toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Best Case (90% WR)</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                        +${Math.round(50 * 452 * (simulatedRisk / account.maxRiskPerTrade)).toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Worst Case (40% WR)</div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-500">
                        -${Math.round(50 * 188 * (simulatedRisk / account.maxRiskPerTrade)).toLocaleString()}
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-1">Max Drawdown</div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-500">
                        -{(50 * 188 * (simulatedRisk / account.maxRiskPerTrade) / account.currentBalance * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-muted/50 border border-border">
                    <div className="text-sm space-y-2">
                      <div className="flex items-center justify-between">
                        <span>Using historical expectancy: <strong className="text-green-600 dark:text-green-500">+$185</strong> per trade</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Average win: <strong className="text-green-600 dark:text-green-500">+$452</strong></span>
                        <span>Average loss: <strong className="text-red-600 dark:text-red-500">-$188</strong></span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Win rate: <strong>67.5%</strong></span>
                        <span>Profit factor: <strong>2.4</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Scenario Buttons */}
                <div>
                  <Label className="text-sm font-medium mb-3 block">Quick Scenarios</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button variant="outline" onClick={() => setSimulatedRisk(0.5)}>
                      Conservative (0.5%)
                    </Button>
                    <Button variant="outline" onClick={() => setSimulatedRisk(1.0)}>
                      Standard (1.0%)
                    </Button>
                    <Button variant="outline" onClick={() => setSimulatedRisk(2.0)}>
                      Aggressive (2.0%)
                    </Button>
                    <Button variant="outline" onClick={() => setSimulatedRisk(3.0)}>
                      High Risk (3.0%)
                    </Button>
                  </div>
                </div>

                {/* Remove Violations Toggle */}
                <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                  <div>
                    <div className="font-medium">Remove Rule Violations</div>
                    <div className="text-sm text-muted-foreground">
                      Calculate performance excluding trades with rule violations
                    </div>
                  </div>
                  <Button variant="outline">Apply</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Risk Alerts</CardTitle>
                <CardDescription>
                  Notifications for approaching risk limits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg border border-orange-500/50 bg-orange-500/10">
                    <AlertTriangle className="h-5 w-5 text-orange-600 dark:text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-orange-600 dark:text-orange-500">Prop Firm Demo - Daily Loss Limit Warning</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        You've used 80% of your daily loss limit. Consider stopping trading for today to protect your account.
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Current:</span>{' '}
                        <span className="font-medium text-red-600 dark:text-red-500">$400 / $500</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-yellow-600 dark:text-yellow-500">Challenge Account - Max Drawdown Warning</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Your account is at 88% of max drawdown limit. Be extremely cautious with new trades.
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Current:</span>{' '}
                        <span className="font-medium text-red-600 dark:text-red-500">$8,800 / $10,000</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Acknowledge
                    </Button>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <div className="font-medium text-green-600 dark:text-green-500">Prop Firm Demo - Good Progress</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        You're making excellent progress toward your profit target. Keep up the good work!
                      </div>
                      <div className="text-sm mt-2">
                        <span className="text-muted-foreground">Progress:</span>{' '}
                        <span className="font-medium text-green-600 dark:text-green-500">$2,450 / $5,000 (49%)</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Dismiss
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alert Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Alert Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Daily Loss Limit Alerts</div>
                      <div className="text-sm text-muted-foreground">Notify when approaching daily loss limit</div>
                    </div>
                    <Select defaultValue="80">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Max Drawdown Alerts</div>
                      <div className="text-sm text-muted-foreground">Notify when approaching max drawdown</div>
                    </div>
                    <Select defaultValue="70">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">50%</SelectItem>
                        <SelectItem value="70">70%</SelectItem>
                        <SelectItem value="80">80%</SelectItem>
                        <SelectItem value="90">90%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Over-Trading Warnings</div>
                      <div className="text-sm text-muted-foreground">Alert when exceeding daily trade limit</div>
                    </div>
                    <Select defaultValue="3">
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 trades</SelectItem>
                        <SelectItem value="3">3 trades</SelectItem>
                        <SelectItem value="5">5 trades</SelectItem>
                        <SelectItem value="10">10 trades</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
