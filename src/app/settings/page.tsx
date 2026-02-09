'use client';

import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  Bell,
  Shield,
  Palette,
  Database,
  Globe
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and application preferences
          </p>
        </div>

        <Tabs defaultValue="general" className="space-y-4">
          <TabsList>
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="privacy">Privacy & Security</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>
                  Update your account information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" placeholder="Your name" defaultValue="Trader Name" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" placeholder="your@email.com" defaultValue="trader@example.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select defaultValue="UTC">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="EST">Eastern Time (EST)</SelectItem>
                      <SelectItem value="PST">Pacific Time (PST)</SelectItem>
                      <SelectItem value="GMT">GMT</SelectItem>
                      <SelectItem value="CET">Central European (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button>Save Changes</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Theme</div>
                    <div className="text-sm text-muted-foreground">Select your preferred color scheme</div>
                  </div>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Compact Mode</div>
                    <div className="text-sm text-muted-foreground">Reduce spacing and font sizes</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Show Currency Symbols</div>
                    <div className="text-sm text-muted-foreground">Display $, €, £ symbols in prices</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Regional Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select defaultValue="USD">
                    <SelectTrigger id="currency">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                      <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                      <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select defaultValue="MM/DD/YYYY">
                    <SelectTrigger id="dateFormat">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>
                  Configure how and when you receive alerts
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Risk Limit Alerts</div>
                    <div className="text-sm text-muted-foreground">Notify when approaching drawdown or daily loss limits</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Rule Violation Alerts</div>
                    <div className="text-sm text-muted-foreground">Alert when you break your trading rules</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Daily Summary Email</div>
                    <div className="text-sm text-muted-foreground">Receive daily performance summary</div>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Weekly Review Reminder</div>
                    <div className="text-sm text-muted-foreground">Remind to complete weekly reviews</div>
                  </div>
                  <Switch defaultChecked />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Alert Thresholds</Label>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="drawdownThreshold">Max Drawdown Alert (%)</Label>
                      <Input id="drawdownThreshold" type="number" defaultValue="70" />
                    </div>
                    <div>
                      <Label htmlFor="dailyLossThreshold">Daily Loss Alert (%)</Label>
                      <Input id="dailyLossThreshold" type="number" defaultValue="80" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>

                <Button>Update Password</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>
                  Add an extra layer of security to your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">2FA Status</div>
                    <div className="text-sm text-muted-foreground">Two-factor authentication is not enabled</div>
                  </div>
                  <Button>Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription>
                  Import, export, and manage your trading data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium mb-2">Import Data</div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Import MT4/MT5 CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Import cTrader CSV
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Import Prop Firm CSV
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium mb-2">Export Data</div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Export All Trades (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Export Strategies (CSV)
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Export Reviews (CSV)
                    </Button>
                  </div>
                </div>

                <Separator />

                <div>
                  <div className="font-medium mb-2">Backup & Restore</div>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Download Full Backup
                    </Button>
                    <Button variant="outline" className="w-full justify-start gap-2">
                      Restore from Backup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/50">
              <CardHeader>
                <CardTitle className="text-red-600 dark:text-red-500">Danger Zone</CardTitle>
                <CardDescription>
                  Irreversible actions for your data
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delete All Trades</div>
                    <div className="text-sm text-muted-foreground">Permanently remove all trading data</div>
                  </div>
                  <Button variant="destructive">Delete Trades</Button>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Delete Account</div>
                    <div className="text-sm text-muted-foreground">Permanently delete your account and all data</div>
                  </div>
                  <Button variant="destructive">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
