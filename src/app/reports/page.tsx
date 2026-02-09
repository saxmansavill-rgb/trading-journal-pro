'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  BarChart3,
  Target,
  ShieldAlert,
  Brain
} from 'lucide-react';

export default function ReportsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground mt-1">
              Generate and export comprehensive trading reports
            </p>
          </div>
        </div>

        {/* Report Options */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="text-sm font-medium">Account</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                <SelectItem value="1">Prop Firm Demo</SelectItem>
                <SelectItem value="2">Personal Live</SelectItem>
                <SelectItem value="3">Challenge Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Date Range</label>
            <Select defaultValue="month">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Strategy Filter</label>
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Strategies</SelectItem>
                <SelectItem value="1">NY Open FVG + SMT</SelectItem>
                <SelectItem value="2">London Breakout</SelectItem>
                <SelectItem value="3">ICT 2022 Model</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Available Reports */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Performance Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Performance Report
              </CardTitle>
              <CardDescription>
                Comprehensive performance analysis with all key metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Net PnL</div>
                  <div className="text-lg font-bold text-green-600 dark:text-green-500">
                    +$12,450
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Total Trades</div>
                  <div className="text-lg font-bold">67</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Win Rate</div>
                  <div className="text-lg font-bold">67.5%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Profit Factor</div>
                  <div className="text-lg font-bold">2.4</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Trade History Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Trade History
              </CardTitle>
              <CardDescription>
                Complete log of all trades with full details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Number of trades</span>
                  <Badge>67</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Date range</span>
                  <Badge variant="outline">Jan 1 - Jan 31</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Unique instruments</span>
                  <Badge variant="outline">4</Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Strategies used</span>
                  <Badge variant="outline">3</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  CSV
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Strategy Analysis Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategy Analysis
              </CardTitle>
              <CardDescription>
                Detailed breakdown by strategy with performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span>NY Open FVG + SMT</span>
                  <span className="text-green-600 dark:text-green-500 font-bold">+$5,890</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span>London Breakout</span>
                  <span className="text-green-600 dark:text-green-500 font-bold">+$3,240</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-muted/50">
                  <span>ICT 2022 Model</span>
                  <span className="text-green-600 dark:text-green-500 font-bold">+$3,320</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Time Analysis Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Time Analysis
              </CardTitle>
              <CardDescription>
                Performance breakdown by day, session, and time of day
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best day</span>
                  <span className="font-bold">Tuesday (+$2,340)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Best session</span>
                  <span className="font-bold">NY (+$6,780)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Avg trades/day</span>
                  <span className="font-bold">2.4</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Risk Management Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShieldAlert className="h-5 w-5" />
                Risk Management
              </CardTitle>
              <CardDescription>
                Analysis of risk metrics, drawdowns, and limit adherence
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Max Drawdown</div>
                  <div className="text-lg font-bold text-red-600 dark:text-red-500">-4.2%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg Risk/Trade</div>
                  <div className="text-lg font-bold">1.0%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Rule Violations</div>
                  <div className="text-lg font-bold text-red-600 dark:text-red-500">6 (8%)</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Sharpe Ratio</div>
                  <div className="text-lg font-bold">2.8</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Psychology Report */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Psychology Analysis
              </CardTitle>
              <CardDescription>
                Emotional patterns, mental state correlations, and growth areas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-muted-foreground">Avg Confidence</div>
                  <div className="text-lg font-bold">4.2/5</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Avg Stress</div>
                  <div className="text-lg font-bold">2.1/5</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Plan Adherence</div>
                  <div className="text-lg font-bold">78%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Emotional Trades</div>
                  <div className="text-lg font-bold text-red-600 dark:text-red-500">12%</div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  PDF
                </Button>
                <Button variant="outline" className="flex-1 gap-2">
                  <Download className="h-4 w-4" />
                  Excel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Export */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Export</CardTitle>
            <CardDescription>
              Export raw data for custom analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                All Trades (CSV)
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Strategies (CSV)
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Accounts (CSV)
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Reviews (CSV)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
