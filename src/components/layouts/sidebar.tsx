'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquareText, FileText, Sparkles, LayoutDashboard, Settings,
  Package, Layers, User, CreditCard, DollarSign, Repeat,
  Shield, Users, Tag, BarChart3, Globe, LifeBuoy,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/lib/axios';

const userNav = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Chat', href: '/chat', icon: MessageSquareText },
  { name: 'Documents', href: '/documents', icon: FileText },
  { name: 'Workspace', href: '/workspace', icon: Layers },
  { name: 'Recommendations', href: '/recommendations', icon: Sparkles },
  { name: 'Plans', href: '/plans', icon: DollarSign },
  { name: 'Subscription', href: '/subscription', icon: Repeat },
  { name: 'Payments', href: '/payment', icon: CreditCard },
  { name: 'Settings', href: '/settings', icon: Settings },
];

const adminNav = [
  { name: 'Admin', href: '/admin', icon: Shield },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Coupons', href: '/admin/coupons', icon: Tag },
  { name: 'Payments', href: '/admin/payments', icon: CreditCard },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Website', href: '/admin/website', icon: Globe },
  { name: 'Support', href: '/admin/support', icon: LifeBuoy },
];

export function Sidebar() {
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    api.get('/users/me').then(res => setRole(res.data.data.role)).catch(() => {});
  }, []);

  const isAdmin = role === 'admin';

  const renderLink = (item: { name: string; href: string; icon: React.ComponentType<{ className?: string }> }) => {
    const Icon = item.icon;
    const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-primary text-primary-foreground'
            : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
        )}
      >
        <Icon className="h-5 w-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <aside className="w-64 border-r bg-card flex flex-col" aria-label="Sidebar">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-xl font-bold">
          Babnunur
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto space-y-1 p-4" aria-label="Main navigation">
        {userNav.map(renderLink)}
        {isAdmin && (
          <>
            <hr className="my-2" />
            {adminNav.map(renderLink)}
          </>
        )}
      </nav>
    </aside>
  );
}
