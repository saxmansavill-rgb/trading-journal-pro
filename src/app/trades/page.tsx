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
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Edit2,
  Trash2,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Upload,
  X
} from 'lucide-react';

const mockTrades = [
  {
    id: '1',
    instrument: 'EUR/USD',
    direction: 'long',
    positionSize: 1.0,
    entryPrice: 1.0845,
    exitPrice: 1.0912,
    stopLoss: 1.0810,
    takeProfit: 1.0930,
    riskAmount: 350,
    riskPercent: 0.34,
    riskR: 1.0,
    plannedRR: 2.1,
    actualRR: 2.2,
    pnl: 670,
    pnlPercent: 0.65,
    pnlR: 2.2,
    entryDate: '2024-01-15',
    entryTime: '09:30',
    exitDate: '2024-01-15',
    exitTime: '11:45',
    session: 'NY',
    tradeType: 'day_trade',
    strategy: 'NY Open FVG + SMT',
    tags: ['news day', 'breakout'],
    emotionEntry: 'confidence',
    emotionExit: 'satisfaction',
    isRuleViolation: false
  },
  {
    id: '2',
    instrument: 'GBP/USD',
    direction: 'short',
    positionSize: 0.8,
    entryPrice: 1.2680,
    exitPrice: 1.2650,
    stopLoss: 1.2720,
    takeProfit: 1.2600,
    riskAmount: 320,
    riskPercent: 0.31,
    riskR: 1.0,
    plannedRR: 2.0,
    actualRR: 0.75,
    pnl: 240,
    pnlPercent: 0.24,
    pnlR: 0.75,
    entryDate: '2024-01-15',
    entryTime: '14:00',
    exitDate: '2024-01-15',
    exitTime: '14:30',
    session: 'NY',
    tradeType: 'scalp',
    strategy: 'London Breakout',
    tags: ['counter-trend'],
    emotionEntry: 'neutral',
    emotionExit: 'neutral',
    isRuleViolation: false
  },
  {
    id: '3',
    instrument: 'XAU/USD',
    direction: 'long',
    positionSize: 0.2,
    entryPrice: 2025.50,
    exitPrice: 2015.00,
    stopLoss: 2018.00,
    takeProfit: 2040.00,
    riskAmount: 150,
    riskPercent: 0.15,
    riskR: 1.0,
    plannedRR: 2.1,
    actualRR: -0.5,
    pnl: -210,
    pnlPercent: -0.21,
    pnlR: -1.4,
    entryDate: '2024-01-14',
    entryTime: '08:00',
    exitDate: '2024-01-14',
    exitTime: '09:15',
    session: 'London',
    tradeType: 'swing',
    strategy: 'ICT 2022 Model',
    tags: ['stopped out'],
    emotionEntry: 'fear',
    emotionExit: 'frustration',
    isRuleViolation: true
  }
];

export default function TradesPage() {
  const [trades, setTrades] = useState(mockTrades);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredTrades = trades.filter(trade => {
    if (selectedFilter === 'wins') return trade.pnl > 0;
    if (selectedFilter === 'losses') return trade.pnl < 0;
    if (selectedFilter === 'violations') return trade.isRuleViolation;
    return true;
  }).filter(trade =>
    trade.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.strategy?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trade.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPnL = trades.reduce((sum, t) => sum + t.pnl, 0);
  const winRate = ((trades.filter(t => t.pnl > 0).length / trades.length) * 100).toFixed(1);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Trades</h1>
            <p className="text-muted-foreground mt-1">
              Log and manage your trading activity
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Log Trade
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Log New Trade</DialogTitle>
                <DialogDescription>
                  Record all details of your trade for comprehensive tracking
                </DialogDescription>
              </DialogHeader>
              <TradeEntryForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total PnL</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${totalPnL >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                {totalPnL >= 0 ? '+' : ''}${totalPnL.toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{winRate}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{trades.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg R/Trade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(trades.reduce((sum, t) => sum + (t.pnlR || 0), 0) / trades.length).toFixed(2)}R
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by instrument, strategy, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('all')}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === 'wins' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('wins')}
            >
              Wins
            </Button>
            <Button
              variant={selectedFilter === 'losses' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('losses')}
            >
              Losses
            </Button>
            <Button
              variant={selectedFilter === 'violations' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedFilter('violations')}
            >
              Violations
            </Button>
          </div>
        </div>

        {/* Trade List */}
        <div className="space-y-4">
          {filteredTrades.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No trades found matching your criteria.</p>
              </CardContent>
            </Card>
          ) : (
            filteredTrades.map((trade) => {
              const isWin = trade.pnl > 0;
              return (
                <Card key={trade.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      {/* Left: Instrument & Direction */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                          isWin ? 'bg-green-500/10' : 'bg-red-500/10'
                        }`}>
                          {trade.direction === 'long' ? (
                            <TrendingUp className={`h-6 w-6 ${isWin ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`} />
                          ) : (
                            <TrendingDown className={`h-6 w-6 ${isWin ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`} />
                          )}
                        </div>
                        <div>
                          <div className="text-xl font-bold">{trade.instrument}</div>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant={trade.direction === 'long' ? 'default' : 'secondary'}>
                              {trade.direction.toUpperCase()}
                            </Badge>
                            <Badge variant="outline">{trade.tradeType.replace('_', ' ')}</Badge>
                            <Badge variant="outline">{trade.session}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Middle: Prices */}
                      <div className="flex gap-8 lg:gap-12">
                        <div>
                          <div className="text-sm text-muted-foreground">Entry</div>
                          <div className="font-mono font-medium">{trade.entryPrice}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Exit</div>
                          <div className="font-mono font-medium">{trade.exitPrice}</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Size</div>
                          <div className="font-medium">{trade.positionSize}</div>
                        </div>
                      </div>

                      {/* Right: PnL & Actions */}
                      <div className="flex items-center justify-between lg:justify-end gap-6 flex-1 lg:flex-none">
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${isWin ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {isWin ? '+' : ''}${trade.pnl.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {isWin ? '+' : ''}{trade.pnlPercent}% • {isWin ? '+' : ''}{trade.pnlR}R
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="mt-4 pt-4 border-t flex flex-wrap gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Strategy:</span>{' '}
                        <span className="font-medium">{trade.strategy}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Entry:</span>{' '}
                        <span>{trade.entryDate} {trade.entryTime}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Exit:</span>{' '}
                        <span>{trade.exitDate} {trade.exitTime}</span>
                      </div>
                      <div className="flex gap-1 ml-auto">
                        {trade.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {trade.isRuleViolation && (
                      <div className="mt-3 p-2 rounded bg-orange-500/10 border border-orange-500/20 text-sm text-orange-600 dark:text-orange-500">
                        ⚠️ Rule Violation detected
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </AppLayout>
  );
}

function TradeEntryForm({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <ScrollArea className="max-h-[70vh] pr-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic</TabsTrigger>
          <TabsTrigger value="risk">Risk</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
          <TabsTrigger value="psychology">Psychology</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="account">Account *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Prop Firm Demo</SelectItem>
                  <SelectItem value="2">Personal Live</SelectItem>
                  <SelectItem value="3">Challenge Account</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="instrument">Instrument *</Label>
              <Input id="instrument" placeholder="e.g., EUR/USD" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="direction">Direction *</Label>
              <Select required>
                <SelectTrigger>
                  <SelectValue placeholder="Select direction" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="long">Long (Buy)</SelectItem>
                  <SelectItem value="short">Short (Sell)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="positionSize">Position Size *</Label>
              <Input id="positionSize" type="number" step="0.01" placeholder="1.0" required />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="entryPrice">Entry Price *</Label>
              <Input id="entryPrice" type="number" step="0.0001" placeholder="1.0845" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stopLoss">Stop Loss</Label>
              <Input id="stopLoss" type="number" step="0.0001" placeholder="1.0810" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="takeProfit">Take Profit</Label>
              <Input id="takeProfit" type="number" step="0.0001" placeholder="1.0930" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="exitPrice">Exit Price</Label>
              <Input id="exitPrice" type="number" step="0.0001" placeholder="1.0912" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pnl">PnL ($)</Label>
              <Input id="pnl" type="number" step="0.01" placeholder="670" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="entryDate">Entry Date *</Label>
              <Input id="entryDate" type="date" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="entryTime">Entry Time</Label>
              <Input id="entryTime" type="time" placeholder="09:30" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="session">Trading Session</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select session" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="Asia">Asia</SelectItem>
                  <SelectItem value="pre_market">Pre-Market</SelectItem>
                  <SelectItem value="after_hours">After Hours</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tradeType">Trade Type</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="scalp">Scalp</SelectItem>
                  <SelectItem value="day_trade">Day Trade</SelectItem>
                  <SelectItem value="swing">Swing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="riskAmount">Risk Amount ($)</Label>
              <Input id="riskAmount" type="number" step="0.01" placeholder="350" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskPercent">Risk Percent (%)</Label>
              <Input id="riskPercent" type="number" step="0.01" placeholder="0.34" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="riskR">Risk (R)</Label>
              <Input id="riskR" type="number" step="0.1" placeholder="1.0" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="plannedRR">Planned R:R</Label>
              <Input id="plannedRR" type="number" step="0.1" placeholder="2.1" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="actualRR">Actual R:R</Label>
              <Input id="actualRR" type="number" step="0.1" placeholder="2.2" />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="pnlPercent">PnL (%)</Label>
              <Input id="pnlPercent" type="number" step="0.01" placeholder="0.65" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pnlR">PnL (R)</Label>
              <Input id="pnlR" type="number" step="0.1" placeholder="2.2" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="strategy" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="strategy">Strategy Used</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">NY Open FVG + SMT</SelectItem>
                <SelectItem value="2">London Breakout</SelectItem>
                <SelectItem value="3">ICT 2022 Model</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          <div>
            <Label className="text-sm font-medium mb-3 block">Confluences Present</Label>
            <div className="grid grid-cols-2 gap-2">
              {['FVG', 'SMT Divergence', 'HTF Bias', 'Session Timing', 'Order Block', 'Displacement', 'Liquidity Sweep', 'MSS'].map(confluence => (
                <div key={confluence} className="flex items-center space-x-2 p-3 rounded-lg border border-border">
                  <Checkbox id={confluence} />
                  <Label htmlFor={confluence} className="text-sm font-normal cursor-pointer">
                    {confluence}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="psychology" className="space-y-4 mt-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="emotionEntry">Emotion at Entry</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select emotion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="confidence">Confidence</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="fear">Fear</SelectItem>
                  <SelectItem value="euphoria">Euphoria</SelectItem>
                  <SelectItem value="revenge">Revenge</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="emotionExit">Emotion at Exit</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select emotion" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="satisfaction">Satisfaction</SelectItem>
                  <SelectItem value="neutral">Neutral</SelectItem>
                  <SelectItem value="frustration">Frustration</SelectItem>
                  <SelectItem value="disappointment">Disappointment</SelectItem>
                  <SelectItem value="relief">Relief</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="planAdherence">Plan Adherence (1-5)</Label>
              <Input id="planAdherence" type="number" min="1" max="5" placeholder="5" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sleepQuality">Sleep Quality (1-5)</Label>
              <Input id="sleepQuality" type="number" min="1" max="5" placeholder="4" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stressLevel">Stress Level (1-5)</Label>
              <Input id="stressLevel" type="number" min="1" max="5" placeholder="2" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="extras" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Add any additional notes about this trade..."
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              placeholder="e.g., news day, breakout, FOMC"
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Screenshot Before Entry</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Screenshot After Exit</Label>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox id="ruleViolation" />
              <Label htmlFor="ruleViolation">Mark as Rule Violation</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="overTrading" />
              <Label htmlFor="overTrading">Over-Trading</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="newsDay" />
              <Label htmlFor="newsDay">News Day</Label>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-between gap-2 pt-4 mt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <div className="flex gap-2">
          <Button type="button" variant="secondary">
            Save Draft
          </Button>
          <Button type="submit" onClick={onClose}>
            Save Trade
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
}
