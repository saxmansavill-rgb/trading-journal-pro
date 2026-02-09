'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Edit2,
  Trash2,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  CheckCircle2,
  XCircle
} from 'lucide-react';

const mockStrategies = [
  {
    id: '1',
    name: 'NY Open FVG + SMT',
    description: 'Fair value gaps on NY open combined with SMT divergence on lower timeframes',
    coreRules: ['Wait for London session close', 'Mark FVG on 1H chart', 'Check for SMT divergence on 15m'],
    confluences: [
      { id: '1', name: 'FVG Present', category: 'price_action' },
      { id: '2', name: 'SMT Divergence', category: 'indicator' },
      { id: '3', name: 'HTF Bullish Bias', category: 'trend' },
      { id: '4', name: 'Session Timing (NY Open)', category: 'session' }
    ],
    trades: 24,
    winRate: 70.8,
    profitFactor: 2.6,
    avgRR: 2.3
  },
  {
    id: '2',
    name: 'London Breakout',
    description: 'Breakout of the London session range with proper retest',
    coreRules: ['Mark London session range (2-6 AM)', 'Wait for clean breakout', 'Enter on retest if price action supports'],
    confluences: [
      { id: '1', name: 'Range Breakout', category: 'price_action' },
      { id: '2', name: 'Order Flow', category: 'price_action' },
      { id: '3', name: 'ADR Within Normal', category: 'indicator' }
    ],
    trades: 18,
    winRate: 66.7,
    profitFactor: 1.8,
    avgRR: 2.0
  },
  {
    id: '3',
    name: 'ICT 2022 Model',
    description: 'Kill zones with order block and mitigation',
    coreRules: ['Asian range high/low', 'Kill zone timing (NY/London)', 'Order block entry', 'Displacement required'],
    confluences: [
      { id: '1', name: 'ASIB/ASIB', category: 'price_action' },
      { id: '2', name: 'Kill Zone Timing', category: 'session' },
      { id: '3', name: 'Order Block', category: 'price_action' },
      { id: '4', name: 'Displacement', category: 'price_action' },
      { id: '5', name: 'MSS', category: 'price_action' }
    ],
    trades: 32,
    winRate: 62.5,
    profitFactor: 2.1,
    avgRR: 2.8
  }
];

const availableConfluenceCategories = [
  { category: 'price_action', name: 'Price Action', options: ['FVG', 'Order Block', 'Liquidity Sweep', 'MSS', 'Displacement', 'Break of Structure', 'CHoCH', 'Trendline Touch', 'Support/Resistance', 'Range Breakout'] },
  { category: 'indicator', name: 'Indicators', options: ['SMT Divergence', 'RSI Divergence', 'MACD Cross', 'Moving Average', 'ADR Within Normal', 'ATR Filter', 'Volume Spike'] },
  { category: 'session', name: 'Session Timing', options: ['NY Open', 'London Open', 'Asia Session', 'Kill Zone', 'Overnight Session'] },
  { category: 'trend', name: 'Trend Alignment', options: ['HTF Bullish Bias', 'HTF Bearish Bias', 'With Trend', 'Counter-Trend', 'Trend Continuation'] },
  { category: 'market_structure', name: 'Market Structure', options: ['Structure Shift', 'Market Structure Break', 'Higher Highs', 'Lower Lows', 'Consolidation Break'] }
];

export default function StrategiesPage() {
  const [strategies, setStrategies] = useState(mockStrategies);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Strategies</h1>
            <p className="text-muted-foreground mt-1">
              Create and manage your trading strategies with confluence tracking
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Strategy
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh]">
              <DialogHeader>
                <DialogTitle>Create New Strategy</DialogTitle>
                <DialogDescription>
                  Define your trading setup with rules and confluences
                </DialogDescription>
              </DialogHeader>
              <StrategyForm onClose={() => setIsAddDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Strategy Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Strategies</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{strategies.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Win Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {(strategies.reduce((sum, s) => sum + s.winRate, 0) / strategies.length).toFixed(1)}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Best Strategy</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold truncate">{strategies[0].name}</div>
              <div className="text-sm text-green-600 dark:text-green-500">
                {strategies[0].winRate}% WR
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Trades</CardTitle>
              <Layers className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {strategies.reduce((sum, s) => sum + s.trades, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Strategies Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {strategies.map((strategy) => (
            <Card key={strategy.id} className="relative hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1 flex-1">
                    <CardTitle className="text-lg">{strategy.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {strategy.description}
                    </CardDescription>
                  </div>
                  <div className="flex gap-1 ml-2">
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
                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold text-green-600 dark:text-green-500">
                      {strategy.winRate}%
                    </div>
                    <div className="text-xs text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold">{strategy.profitFactor}</div>
                    <div className="text-xs text-muted-foreground">PF</div>
                  </div>
                  <div className="text-center p-2 rounded-lg bg-muted/50">
                    <div className="text-lg font-bold">{strategy.avgRR}:1</div>
                    <div className="text-xs text-muted-foreground">Avg RR</div>
                  </div>
                </div>

                <Separator />

                {/* Confluences */}
                <div>
                  <div className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Layers className="h-4 w-4" />
                    Confluences ({strategy.confluences.length})
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {strategy.confluences.slice(0, 5).map((confluence) => (
                      <Badge key={confluence.id} variant="secondary" className="text-xs">
                        {confluence.name}
                      </Badge>
                    ))}
                    {strategy.confluences.length > 5 && (
                      <Badge variant="outline" className="text-xs">
                        +{strategy.confluences.length - 5} more
                      </Badge>
                    )}
                  </div>
                </div>

                <Separator />

                {/* Stats */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total Trades</span>
                  <span className="font-medium">{strategy.trades}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function StrategyForm({ onClose }: { onClose: () => void }) {
  const [selectedConfluences, setSelectedConfluences] = useState<string[]>([]);
  const [coreRules, setCoreRules] = useState<string[]>(['']);

  const toggleConfluence = (confluence: string) => {
    setSelectedConfluences(prev =>
      prev.includes(confluence)
        ? prev.filter(c => c !== confluence)
        : [...prev, confluence]
    );
  };

  const addRule = () => {
    setCoreRules([...coreRules, '']);
  };

  const updateRule = (index: number, value: string) => {
    const newRules = [...coreRules];
    newRules[index] = value;
    setCoreRules(newRules);
  };

  const removeRule = (index: number) => {
    setCoreRules(coreRules.filter((_, i) => i !== index));
  };

  return (
    <ScrollArea className="max-h-[60vh] pr-4">
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Details & Rules</TabsTrigger>
          <TabsTrigger value="confluences">Confluences</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="strategyName">Strategy Name *</Label>
            <Input id="strategyName" placeholder="e.g., NY Open FVG Strategy" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your trading setup..."
              rows={3}
            />
          </div>

          <Separator className="my-4" />
          <div className="text-sm font-medium">Core Setup Rules</div>

          {coreRules.map((rule, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={rule}
                onChange={(e) => updateRule(index, e.target.value)}
                placeholder={`Rule ${index + 1}`}
                className={coreRules.length === 1 ? 'hidden' : ''}
              />
              {coreRules.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeRule(index)}
                  className="text-destructive"
                >
                  <XCircle className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}

          <Button type="button" variant="outline" onClick={addRule} className="w-full gap-2">
            <Plus className="h-4 w-4" />
            Add Rule
          </Button>
        </TabsContent>

        <TabsContent value="confluences" className="space-y-6 mt-4">
          {availableConfluenceCategories.map((category) => (
            <div key={category.category}>
              <div className="text-sm font-medium mb-3 flex items-center gap-2">
                <Layers className="h-4 w-4" />
                {category.name}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.options.map((option) => (
                  <div key={option} className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                    <Checkbox
                      id={option}
                      checked={selectedConfluences.includes(option)}
                      onCheckedChange={() => toggleConfluence(option)}
                    />
                    <Label
                      htmlFor={option}
                      className="flex-1 cursor-pointer text-sm font-normal"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="p-4 rounded-lg border border-dashed border-border">
            <Label htmlFor="customConfluence" className="text-sm font-medium">
              Add Custom Confluence
            </Label>
            <div className="flex gap-2 mt-2">
              <Input id="customConfluence" placeholder="e.g., Special Pattern" />
              <Button type="button" variant="outline">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-muted/50">
            <div className="text-sm font-medium mb-2">
              Selected Confluences ({selectedConfluences.length})
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedConfluences.map((confluence) => (
                <Badge key={confluence} variant="default" className="gap-1">
                  {confluence}
                  <button
                    type="button"
                    onClick={() => toggleConfluence(confluence)}
                    className="hover:text-destructive"
                  >
                    <XCircle className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
              {selectedConfluences.length === 0 && (
                <span className="text-sm text-muted-foreground">No confluences selected</span>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2 pt-4 mt-4 border-t">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" onClick={onClose}>
          Create Strategy
        </Button>
      </div>
    </ScrollArea>
  );
}
