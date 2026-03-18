"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  PlusCircle,
  Users,
  ShieldCheck,
  History,
  Settings,
  LogOut,
  Home,
  LayoutGrid,
  ShieldAlert,
  X,
} from "lucide-react";
import { useMockUser } from "@/context/mock-user-context";
import { useLanguage } from "@/context/language-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrustScoreBadge } from "@/components/dashboard/TrustScoreBadge";
import { useAuth } from "@/context/auth-context";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

const navItems = [
  { key: "home", href: "/", icon: Home },
  { key: "dashboard", href: "/dashboard", icon: LayoutDashboard },
  { key: "findCircle", href: "/circles", icon: Users },
  { key: "createPlan", href: "/plans/create", icon: PlusCircle },
  { key: "kyc", href: "/kyc", icon: ShieldCheck },
  { key: "history", href: "/history", icon: History },
];

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { activeUser, isCalculating } = useMockUser();
  const { t } = useLanguage();
  const { logout } = useAuth();

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-300" 
          onClick={onClose}
        />
      )}

      <div className={cn(
        "flex flex-col h-full bg-white dark:bg-slate-900 border-r border-border w-64 fixed left-0 top-0 z-50 transition-all duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Logo & Close */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-xl font-bold text-primary tracking-tight">CollaboSave</span>
          </Link>
          <button 
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg text-muted-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Active user mini-card */}
        <div className="mx-3 mt-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <div className="flex items-center gap-2.5">
            <Avatar className="w-9 h-9 border border-primary/20">
              <AvatarImage src={activeUser.avatar} />
              <AvatarFallback className="text-xs font-bold text-primary bg-primary/10">
                {getInitials(activeUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">{activeUser.name}</p>
              <div className="mt-0.5">
                <TrustScoreBadge score={isCalculating ? "Calculating..." : activeUser.trustScore} />
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.key}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-primary"
                )}
                onClick={onClose}
              >
                <item.icon className="w-5 h-5" />
                {t(item.key as any)}
              </Link>
            );
          })}

          {activeUser.id === "u1" /* only show admin for the main demo user */ && (
            <Link
              href="/admin"
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 mt-2",
                pathname === "/admin"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-primary"
              )}
              onClick={onClose}
            >
              <LayoutGrid className="w-5 h-5" />
              <span>Admin Panel</span>
            </Link>
          )}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-border space-y-0.5">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
              pathname === "/settings"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:bg-accent hover:text-primary"
            )}
            onClick={onClose}
          >
            <Settings className="w-5 h-5" />
            Settings
          </Link>
          <button
            onClick={async () => {
              if (window.confirm("Are you sure you want to log out?")) {
                await logout();
              }
            }}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium text-destructive rounded-lg hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  );
}