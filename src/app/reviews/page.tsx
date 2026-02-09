'use client';

import { useState } from 'react';
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  XCircle,
  Star,
  Download,
  Save
} from 'lucide-react';

export default function ReviewsPage() {
  const [reviewType, setReviewType] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reviews</h1>
            <p className="text-muted-foreground mt-1">
              Structured review workflows for continuous improvement
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export PDF
            </Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Review
            </Button>
          </div>
        </div>

        {/* Review Type Selector */}
        <div className="flex gap-2">
          <Button
            variant={reviewType === 'daily' ? 'default' : 'outline'}
            onClick={() => setReviewType('daily')}
          >
            Daily Review
          </Button>
          <Button
            variant={reviewType === 'weekly' ? 'default' : 'outline'}
            onClick={() => setReviewType('weekly')}
          >
            Weekly Review
          </Button>
          <Button
            variant={reviewType === 'monthly' ? 'default' : 'outline'}
            onClick={() => setReviewType('monthly')}
          >
            Monthly Review
          </Button>
        </div>

        {/* Review Content */}
        {reviewType === 'daily' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Daily Review Template</CardTitle>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-1 rounded-md border border-input bg-background"
                  />
                </div>
              </div>
              <CardDescription>
                Quick daily check-in on performance and rule adherence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Today's Performance Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Today's Performance</h3>
                <div className="grid gap-4 md:grid-cols-4">
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="text-sm text-muted-foreground">Net PnL</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-500">+$670</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="text-sm text-muted-foreground">Trades</div>
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                    <div className="text-2xl font-bold">66.7%</div>
                  </div>
                  <div className="p-4 rounded-lg border border-border bg-card">
                    <div className="text-sm text-muted-foreground">Rule Score</div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-500">95%</div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* 3-Point Summary */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">3-Point Summary</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">1. What went well today?</label>
                    <Textarea
                      placeholder="Focus on positive aspects and strengths..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">2. What needs improvement?</label>
                    <Textarea
                      placeholder="Identify areas for growth and mistakes to avoid..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">3. Tomorrow's focus</label>
                    <Textarea
                      placeholder="Key action items for the next trading session..."
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Today's Trades */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Today's Trades</h3>
                <div className="space-y-2">
                  {[
                    { instrument: 'EUR/USD', pnl: 670, result: 'win', notes: 'Good execution, followed plan' },
                    { instrument: 'GBP/USD', pnl: 240, result: 'win', notes: 'Exited early, could have held' },
                    { instrument: 'XAU/USD', pnl: -210, result: 'loss', notes: 'FOMO entry, broke rule' },
                  ].map((trade, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border bg-card">
                      <div className="flex items-center gap-3">
                        {trade.result === 'win' ? (
                          <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                        )}
                        <div>
                          <div className="font-medium">{trade.instrument}</div>
                          <div className="text-sm text-muted-foreground">{trade.notes}</div>
                        </div>
                      </div>
                      <div className={`font-bold ${trade.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                        {trade.pnl >= 0 ? '+' : ''}${trade.pnl}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Rule Compliance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Rule Compliance</h3>
                <div className="grid gap-3">
                  {[
                    { rule: 'Waited for setup confirmation', followed: true },
                    { rule: 'Respected stop loss', followed: true },
                    { rule: 'Followed position sizing', followed: true },
                    { rule: 'Avoided over-trading', followed: true },
                    { rule: 'No revenge trading', followed: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <span className="text-sm">{item.rule}</span>
                      {item.followed ? (
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 dark:text-red-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Mental State */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Mental State</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Overall Mood (1-5)</label>
                    <Select defaultValue="4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n} - {n === 1 ? 'Poor' : n === 5 ? 'Excellent' : ''}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Sleep Quality (1-5)</label>
                    <Select defaultValue="4">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Focus Level (1-5)</label>
                    <Select defaultValue="3">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[1, 2, 3, 4, 5].map(n => (
                          <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {reviewType === 'weekly' && (
          <Card>
            <CardHeader>
              <CardTitle>Weekly Review Template</CardTitle>
              <CardDescription>
                Deep dive into weekly performance and patterns
              </CardDescription>
            </CardHeader>
            <ScrollArea className="max-h-[70vh]">
              <CardContent className="space-y-6 p-6">
                {/* Weekly Performance */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Weekly Performance</h3>
                  <div className="grid gap-4 md:grid-cols-4">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Net PnL</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">+$4,450</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Total Trades</div>
                      <div className="text-2xl font-bold">37</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="text-2xl font-bold">67.6%</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Avg PnL/Day</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">+$890</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Best & Worst Trades */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Best & Worst Trades</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-green-600 dark:text-green-500">Best Trade</span>
                        <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-500" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">+$1,240</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        EUR/USD • NY Open FVG + SMT • Tuesday
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-medium">Key Learning:</span> Patient entry, rode the winner
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-red-600 dark:text-red-500">Worst Trade</span>
                        <TrendingDown className="h-5 w-5 text-red-600 dark:text-red-500" />
                      </div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-500">-$450</div>
                      <div className="text-sm text-muted-foreground mt-1">
                        XAU/USD • ICT 2022 Model • Wednesday
                      </div>
                      <div className="text-sm mt-2">
                        <span className="font-medium">Key Learning:</span> Premature entry, no displacement
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Strategy Breakdown */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Strategy Performance</h3>
                  <div className="space-y-3">
                    {[
                      { strategy: 'NY Open FVG + SMT', trades: 14, winRate: 71.4, pnl: 2890, avgR: 2.4 },
                      { strategy: 'London Breakout', trades: 12, winRate: 66.7, pnl: 1890, avgR: 1.9 },
                      { strategy: 'ICT 2022 Model', trades: 11, winRate: 63.6, pnl: -330, avgR: 0.8 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
                        <div>
                          <div className="font-medium">{item.strategy}</div>
                          <div className="text-sm text-muted-foreground">
                            {item.trades} trades • {item.winRate}% WR
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`text-xl font-bold ${item.pnl >= 0 ? 'text-green-600 dark:text-green-500' : 'text-red-600 dark:text-red-500'}`}>
                            {item.pnl >= 0 ? '+' : ''}${item.pnl.toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Avg: {item.avgR}R
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Performance Suggestions */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Performance Suggestions</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                      <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Consider reducing ICT 2022 Model trades</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          This strategy is underperforming. Focus on NY Open and London Breakout setups.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                      <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Excellent Tuesday performance</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Tuesday showed +$2,340. Analyze what went right and replicate.
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card">
                      <Star className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Watch over-trading on Monday</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Monday had 6 trades with 33% win rate. Consider stricter filters.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Weekly Reflection */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Weekly Reflection</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">What did I learn this week?</label>
                    <Textarea
                      placeholder="Key insights and lessons learned..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">What will I improve next week?</label>
                    <Textarea
                      placeholder="Specific action items for improvement..."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        )}

        {reviewType === 'monthly' && (
          <Card>
            <CardHeader>
              <CardTitle>Monthly Review Template</CardTitle>
              <CardDescription>
                Comprehensive monthly analysis with deep insights
              </CardDescription>
            </CardHeader>
            <ScrollArea className="max-h-[70vh]">
              <CardContent className="space-y-6 p-6">
                {/* Monthly Overview */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Monthly Overview</h3>
                  <div className="grid gap-4 md:grid-cols-6">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Net PnL</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">
                        +$12,450
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Total Trades</div>
                      <div className="text-2xl font-bold">67</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Win Rate</div>
                      <div className="text-2xl font-bold">67.5%</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Profit Factor</div>
                      <div className="text-2xl font-bold">2.4</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Max DD</div>
                      <div className="text-2xl font-bold text-red-600 dark:text-red-500">-4.2%</div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground">Expectancy</div>
                      <div className="text-2xl font-bold text-green-600 dark:text-green-500">+$185</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Psychology Patterns */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Psychology Patterns</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-2">Most Common Entry Emotion</div>
                      <div className="font-bold">Confidence (58%)</div>
                      <div className="text-sm text-muted-foreground">
                        Higher win rate when confident (72%)
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="text-sm text-muted-foreground mb-2">Lowest Performance Emotion</div>
                      <div className="font-bold text-red-600 dark:text-red-500">Revenge (35% WR)</div>
                      <div className="text-sm text-muted-foreground">
                        -670 avg PnL when trading emotionally
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Growth Areas */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Growth Areas</h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Rule Compliance</span>
                        <Badge variant="default">Excellent</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">92% overall compliance</div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Plan Adherence</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">78% of trades followed plan</div>
                    </div>

                    <div className="p-4 rounded-lg border border-border bg-card">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">Emotional Control</span>
                        <Badge variant="secondary">Good</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '73%' }}></div>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">73% trades with controlled emotions</div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Monthly Goals */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Monthly Goals Review</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 rounded-lg border border-green-500/50 bg-green-500/10">
                      <div>
                        <div className="font-medium">Reach $10,000 profit</div>
                        <div className="text-sm text-muted-foreground">Target: $10,000 / Achieved: $12,450</div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-yellow-500/50 bg-yellow-500/10">
                      <div>
                        <div className="font-medium">Maintain 65%+ win rate</div>
                        <div className="text-sm text-muted-foreground">Target: 65% / Achieved: 67.5%</div>
                      </div>
                      <CheckCircle2 className="h-6 w-6 text-yellow-600 dark:text-yellow-500" />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border border-red-500/50 bg-red-500/10">
                      <div>
                        <div className="font-medium">Reduce rule violations to &lt;5%</div>
                        <div className="text-sm text-muted-foreground">Target: &lt;5% / Achieved: 8%</div>
                      </div>
                      <XCircle className="h-6 w-6 text-red-600 dark:text-red-500" />
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Next Month Plan */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Next Month Plan</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Goals for next month</label>
                    <Textarea
                      placeholder="Set your goals for the upcoming month..."
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Strategies to focus on</label>
                    <Textarea
                      placeholder="Which strategies will you prioritize?..."
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Risk management adjustments</label>
                    <Textarea
                      placeholder="Any changes to your risk approach?..."
                      rows={2}
                    />
                  </div>
                </div>
              </CardContent>
            </ScrollArea>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
