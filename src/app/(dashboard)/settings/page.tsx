"use client";

import { useLanguage } from "@/context/language-context";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Globe, Shield, Bell, User as UserIcon, Moon, Sun, Monitor, Eye, EyeOff, Lock as LockIcon } from "lucide-react";
import { Language } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [visibility, setVisibility] = useState<'public' | 'members' | 'private'>('public');

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const langs: { id: Language; label: string; sub: string }[] = [
    { id: 'en', label: 'English', sub: 'Standard business English' },
    { id: 'ha', label: 'Hausa', sub: 'Harshen Hausa (Na Gida)' },
    { id: 'yo', label: 'Yoruba', sub: 'Èdè Yorùbá' },
    { id: 'ig', label: 'Igbo', sub: 'Asụsụ Igbo' }
  ];

  const visibilityOptions = [
    { id: 'public', label: 'Public', sub: 'Everyone can see your activity', icon: Eye },
    { id: 'members', label: 'Members Only', sub: 'Only group members can see', icon: EyeOff },
    { id: 'private', label: 'Only Me', sub: 'Completely private profile', icon: LockIcon }
  ] as const;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t('settings')}</h1>
        <p className="text-muted-foreground mt-2">Manage your account preferences and application settings.</p>
      </div>

      <div className="grid gap-6">
        {/* Appearance & Theme */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-white">
                <Sun className="w-5 h-5 dark:hidden" />
                <Moon className="w-5 h-5 hidden dark:block" />
              </div>
              <div>
                <h2 className="text-xl font-bold italic">Appearance</h2>
                <p className="text-sm text-muted-foreground">Customize how CollaboSave looks for you.</p>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'light', label: 'Light', icon: Sun },
                { id: 'dark', label: 'Dark', icon: Moon },
                { id: 'system', label: 'System', icon: Monitor }
              ].map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setTheme(mode.id)}
                  className={cn(
                    "flex items-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-200 font-bold",
                    mounted && theme === mode.id
                      ? "border-primary bg-primary/5 text-primary ring-4 ring-primary/10"
                      : "border-border hover:border-primary/50 text-muted-foreground"
                  )}
                >
                  <mode.icon className="w-5 h-5" />
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Visibility & Privacy */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-emerald-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                <Eye className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold italic">Profile Visibility</h2>
                <p className="text-sm text-muted-foreground">Control who can see your circles and contribution history.</p>
              </div>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            {visibilityOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setVisibility(opt.id)}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-2xl border-2 text-center transition-all duration-200 gap-3",
                  visibility === opt.id
                    ? "border-emerald-500 bg-emerald-500/5 ring-4 ring-emerald-500/10"
                    : "border-border hover:border-emerald-500/50"
                )}
              >
                <opt.icon className={cn("w-6 h-6", visibility === opt.id ? "text-emerald-500" : "text-muted-foreground")} />
                <div>
                  <p className="font-bold">{opt.label}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{opt.sub}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Language Selection Card */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl border border-border overflow-hidden shadow-sm">
          <div className="p-6 border-b border-border bg-amber-500/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold italic">Language Settings</h2>
                <p className="text-sm text-muted-foreground">Select your preferred language for the interface.</p>
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {langs.map((l) => (
              <button
                key={l.id}
                onClick={() => setLanguage(l.id)}
                className={cn(
                  "flex flex-col items-start p-5 rounded-2xl border-2 text-left transition-all duration-200 group relative",
                  language === l.id
                    ? "border-amber-500 bg-amber-500/5 ring-4 ring-amber-500/10"
                    : "border-border hover:border-amber-500/50 hover:bg-secondary/50"
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-bold text-lg">{l.label}</span>
                  {language === l.id && (
                    <div className="w-6 h-6 bg-amber-500 text-white rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                <span className="text-sm text-muted-foreground mt-1">{l.sub}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Security Summary (Compact) */}
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border flex flex-col md:flex-row items-center justify-between gap-6 opacity-80 border-dashed">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-slate-500" />
            </div>
            <div>
              <h3 className="font-bold">Security Preferences</h3>
              <p className="text-xs text-muted-foreground italic">Password, 2FA, and authorized devices are managed here.</p>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled>Configure</Button>
        </div>
      </div>
    </div>
  );
}
