"use client";

import { ShieldCheck, ShieldAlert, Shield, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { TrustScore } from "@/lib/mock-data";

interface TrustScoreBadgeProps {
  score: TrustScore;
}

export function TrustScoreBadge({ score }: TrustScoreBadgeProps) {
  const isCalculating = score === "Calculating...";

  const config = {
    "Low Risk": {
      bg: "bg-emerald-100 dark:bg-emerald-900",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-200 dark:border-emerald-800",
      icon: ShieldCheck,
    },
    "Medium Risk": {
      bg: "bg-amber-100 dark:bg-amber-900",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-200 dark:border-amber-800",
      icon: Shield,
    },
    "High Risk": {
      bg: "bg-red-100 dark:bg-red-900",
      text: "text-red-700 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      icon: ShieldAlert,
    },
    "Calculating...": {
      bg: "bg-slate-100 dark:bg-slate-800",
      text: "text-slate-500 dark:text-slate-400",
      border: "border-slate-200 dark:border-slate-700",
      icon: Shield,
    },
  }[score] || {
    bg: "bg-slate-100 dark:bg-slate-800",
    text: "text-slate-700 dark:text-slate-300",
    border: "border-slate-200 dark:border-slate-700",
    icon: Shield,
  };

  const Icon = config.icon;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300",
        config.bg,
        config.text,
        config.border,
        isCalculating && "animate-pulse"
      )}
    >
      {isCalculating ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Icon className="w-4 h-4" />
      )}
      {score}
    </div>
  );
}