"use client";

import { Bell, Search, ChevronDown, Loader2, ShieldCheck, ShieldAlert, Shield, LogOut, Users, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useMockUser } from "@/context/mock-user-context";
import { TrustScoreBadge } from "@/components/dashboard/TrustScoreBadge";
import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import { User, TrustScore } from "@/lib/mock-data";

interface HeaderProps {
  onMenuClick?: () => void;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function TrustIcon({ score }: { score: TrustScore }) {
  if (score === "Low Risk") return <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />;
  if (score === "High Risk") return <ShieldAlert className="w-3.5 h-3.5 text-red-500" />;
  if (score === "Medium Risk") return <Shield className="w-3.5 h-3.5 text-amber-500" />;
  return <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-400" />;
}

function ScorePill({ score }: { score: TrustScore }) {
  const colors: Record<TrustScore, string> = {
    "Low Risk": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Medium Risk": "bg-amber-50 text-amber-700 border-amber-200",
    "High Risk": "bg-red-50 text-red-700 border-red-200",
    "Calculating...": "bg-slate-50 text-slate-500 border-slate-200",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border",
        colors[score]
      )}
    >
      <TrustIcon score={score} />
      {score}
    </span>
  );
}

export function Header({ onMenuClick }: HeaderProps) {
  const { activeUser, allUsers, isCalculating, switchUser } = useMockUser();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const otherUsers = allUsers.filter((u) => u.id !== activeUser.id);

  return (
    <header className="h-16 border-b bg-white dark:bg-slate-900 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 transition-colors">
      <div className="flex items-center gap-4 flex-1">
        {/* Mobile Menu Toggle */}
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Search - Hidden on tiny screens, icon only on small */}
        <div className="max-w-md w-full relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10 bg-secondary/50 border-none focus-visible:ring-primary h-9 text-sm"
            placeholder="Search circles..."
          />
        </div>
        
        {/* Simple search icon for mobile */}
        <button className="sm:hidden p-2 hover:bg-secondary rounded-full">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:gap-4 ml-4">
        {/* Notification bell */}
        <button className="p-2 hover:bg-secondary rounded-full relative transition-colors">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full border-2 border-white dark:border-slate-900" />
        </button>

        {/* Account switcher */}
        <div className="relative" ref={dropdownRef}>
          <button
            id="account-switcher-btn"
            onClick={() => setOpen((o) => !o)}
            className="flex items-center gap-2 md:gap-3 md:pl-4 md:border-l hover:bg-secondary/60 rounded-lg md:px-3 py-1.5 transition-colors"
          >
            <div className="text-right hidden xl:block">
              <p className="text-sm font-semibold text-foreground leading-tight">{activeUser.name}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-wider leading-tight">
                {activeUser.kycStatus} Account
              </p>
            </div>

            <div className="relative">
              <Avatar className="w-8 h-8 md:w-9 md:h-9 border-2 border-primary/20">
                <AvatarImage src={activeUser.avatar} />
                <AvatarFallback className="text-xs font-bold bg-primary/10 text-primary">
                  {getInitials(activeUser.name)}
                </AvatarFallback>
              </Avatar>
              {isCalculating && (
                <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center shadow-sm">
                  <Loader2 className="w-2.5 h-2.5 animate-spin text-primary" />
                </span>
              )}
            </div>

            <ChevronDown
              className={cn(
                "w-3 h-3 md:w-4 md:h-4 text-muted-foreground transition-transform duration-200",
                open && "rotate-180 text-primary"
              )}
            />
          </button>

          {/* Dropdown */}
          {open && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-border rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              {/* Current user card */}
              <div className="p-4 bg-primary/5 border-b border-border">
                <p className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground mb-3 flex items-center gap-1.5">
                  <Users className="w-3 h-3" /> Active Account
                </p>
                <div className="flex items-center gap-3">
                  <Avatar className="w-11 h-11 border-2 border-primary/30">
                    <AvatarImage src={activeUser.avatar} />
                    <AvatarFallback className="font-bold text-primary bg-primary/10">
                      {getInitials(activeUser.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-foreground truncate">{activeUser.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{activeUser.email}</p>
                    <div className="mt-1.5">
                      {isCalculating ? (
                        <ScorePill score="Calculating..." />
                      ) : (
                        <ScorePill score={activeUser.trustScore} />
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Other accounts */}
              <div className="p-2">
                <p className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground px-2 py-2">
                  Switch Account
                </p>
                {otherUsers.map((u) => (
                  <button
                    key={u.id}
                    id={`switch-user-${u.id}`}
                    onClick={() => {
                      switchUser(u.id);
                      setOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-2.5 rounded-lg hover:bg-primary/5 transition-colors group text-left"
                  >
                    <Avatar className="w-9 h-9 border border-border group-hover:border-primary/30 transition-colors">
                      <AvatarImage src={u.avatar} />
                      <AvatarFallback className="text-xs font-bold">{getInitials(u.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{u.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={cn(
                            "text-[11px] font-medium capitalize",
                            u.kycStatus === "verified" && "text-emerald-600",
                            u.kycStatus === "failed" && "text-red-500",
                            u.kycStatus === "pending" && "text-amber-500"
                          )}
                        >
                          {u.kycStatus === "verified" ? "✓ Verified" : u.kycStatus === "failed" ? "✗ KYC Failed" : "⏳ Pending"}
                        </span>
                        <span className="text-muted-foreground text-[11px]">·</span>
                        <span className="text-[11px] text-muted-foreground">
                          {u.successfulPaymentsCount} paid · {u.defaultedPaymentsCount} defaulted
                        </span>
                      </div>
                    </div>
                    <TrustIcon score={u.trustScore} />
                  </button>
                ))}
              </div>

              {/* Footer hint */}
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
                  🤖 Trust score is calculated live by AI based on KYC status, payment history &amp; group participation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
