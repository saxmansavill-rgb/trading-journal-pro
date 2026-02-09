'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  LayoutDashboard,
  TrendingUp,
  Calendar,
  Target,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  BarChart3,
  ShieldCheck,
  Database,
  PieChart
} from 'lucide-react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Trades', href: '/trades', icon: TrendingUp },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'Calendar', href: '/calendar', icon: Calendar },
  { name: 'Strategies', href: '/strategies', icon: Target },
  { name: 'Risk Management', href: '/risk', icon: ShieldCheck },
  { name: 'Reviews', href: '/reviews', icon: FileText },
  { name: 'Accounts', href: '/accounts', icon: Database },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-sidebar text-sidebar-foreground shadow-lg"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:translate-x-0",
          collapsed ? "lg:w-20" : "lg:w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <ScrollArea className="h-full py-4">
          <div className="flex flex-col gap-2 px-3">
            {/* Logo/Brand */}
            <div className="flex items-center justify-between mb-6 px-2">
              <div className={cn(
                "flex items-center gap-2 overflow-hidden",
                collapsed && "justify-center"
              )}>
                <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-primary-foreground" />
                </div>
                {!collapsed && (
                  <div className="flex flex-col">
                    <span className="font-bold text-lg text-sidebar-foreground">Trading</span>
                    <span className="text-xs text-muted-foreground">Journal Pro</span>
                  </div>
                )}
              </div>
            </div>

            <Separator className="mb-4 bg-sidebar-border" />

            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:bg-sidebar-accent group relative",
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground",
                      collapsed && "justify-center px-2"
                    )}
                  >
                    <item.icon
                      className={cn(
                        "h-5 w-5 flex-shrink-0",
                        isActive && "text-primary"
                      )}
                    />
                    {!collapsed && (
                      <span className="font-medium">{item.name}</span>
                    )}
                    {isActive && !collapsed && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Collapse button (desktop only) */}
            <div className="hidden lg:flex mt-auto pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="w-full justify-start text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent"
              >
                {collapsed ? (
                  <ChevronRight className="h-5 w-5 mx-auto" />
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5" />
                    <span className="ml-2">Collapse</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  );
}
