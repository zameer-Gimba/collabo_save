
"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ChevronRight,
  Calculator,
  Wallet,
  TrendingUp,
  Users,
  CheckCircle2,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/context/auth-context";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, loading } = useAuth();

  return (
    <div className="flex flex-col min-h-screen bg-background" suppressHydrationWarning>
      {/* Navigation */}
      <header className="px-4 md:px-6 lg:px-12 h-20 flex items-center justify-between border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">C</span>
          </div>
          <span className="text-xl md:text-2xl font-bold text-primary tracking-tight">CollaboSave</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium hover:text-primary transition-colors">How it works</Link>
          <Link href="#" className="text-sm font-medium hover:text-primary transition-colors">About Us</Link>
        </nav>
        <div className="flex items-center gap-2 md:gap-4">
          {!loading && user ? (
            <Button asChild className="bg-primary hover:bg-primary/90 font-bold h-10 px-4 md:h-11 md:px-6">
              <Link href="/dashboard">Dashboard <ChevronRight className="ml-1 w-4 h-4 hidden sm:inline-block" /></Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" asChild className="hidden sm:inline-flex text-primary hover:text-primary/80">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild className="bg-primary hover:bg-primary/90 font-bold h-10 px-4 md:h-11 md:px-6">
                <Link href="/signup">Get Started <ChevronRight className="ml-1 w-4 h-4 hidden sm:inline-block" /></Link>
              </Button>
            </>
          )}
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
          <nav className="relative flex flex-col items-center justify-center h-full gap-8 p-6 animate-in slide-in-from-top-10 duration-300">
            <Link
              href="#features"
              className="text-2xl font-bold hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it works
            </Link>
            <Link
              href="#"
              className="text-2xl font-bold hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <hr className="w-full border-border max-w-[200px]" />
            {!loading && user ? (
              <Link
                href="/dashboard"
                className="text-2xl font-bold text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-2xl font-bold text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
            )}
          </nav>
        </div>
      )}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background">
          {/* Light mode gradient */}
          <div
            className="absolute inset-0 dark:hidden"
            style={{
              background: "radial-gradient(ellipse 80% 60% at 60% 40%, #dbeafe 0%, #eff6ff 40%, #ffffff 100%)",
            }}
          />
          {/* Dark mode gradient */}
          <div
            className="absolute inset-0 hidden dark:block"
            style={{
              background: "radial-gradient(circle at 70% 30%, rgba(29, 78, 216, 0.1) 0%, rgba(2, 6, 23, 1) 100%)",
            }}
          />
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(#1d4ed8 1px, transparent 1px), linear-gradient(90deg, #1d4ed8 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 md:px-6 lg:px-12 py-12 md:py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* ── Left: copy ── */}
            <div className="flex-1 space-y-6 md:space-y-8 animate-in fade-in slide-in-from-left-8 duration-700 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] md:text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> Trusted by 5,000+ Savers
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-[1.2] lg:leading-[1.1] tracking-tight">
                Digitizing{" "}
                <span className="text-primary italic">Adashe</span>{" "}
                for Modern Finance
              </h1>

              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                Join verified savings circles, contribute periodically, and receive
                lump-sum payouts with complete transparency and AI-powered security.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start pt-2">
                <Button
                  size="lg"
                  className="h-12 md:h-14 px-6 md:px-10 text-base md:text-lg font-bold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                  asChild
                >
                  <Link href={!loading && user ? "/dashboard" : "/signup"}>
                    {!loading && user ? "Go to Dashboard" : "Get Started"} <ChevronRight className="ml-1 w-5 h-5 hidden sm:inline-block" />
                  </Link>
                </Button>
                {!user && (
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 md:h-14 px-6 md:px-10 text-base md:text-lg font-bold border-primary/30 text-primary hover:bg-primary/5"
                    asChild
                  >
                    <Link href="/dashboard">View Demo</Link>
                  </Button>
                )}
              </div>

              {/* Trust row */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 justify-center lg:justify-start pt-4">
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                  KYC Verified
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                  AI Risk Scoring
                </div>
                <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-emerald-500" />
                  256-bit Encrypted
                </div>
              </div>
            </div>

            {/* ── Right: hero image ── */}
            <div className="flex-1 relative flex justify-center animate-in fade-in slide-in-from-right-8 duration-700 w-full">
              {/* Main image container */}
              <div className="relative w-full max-w-sm md:max-w-xl">

                {/* Dark mode background glow (below image and badges) */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[120%] w-[120%] -left-[10%] bg-blue-600/5 blur-[120px] rounded-full hidden dark:block pointer-events-none -z-10" />
                
                <Image
                  src="/hero-illustration.png"
                  alt="CollaboSave app interface"
                  width={1024}
                  height={683}
                  className="w-full h-auto object-contain drop-shadow-2xl relative z-10 opacity-100"
                  priority
                />

                {/* Floating badge – top left corner of image */}
                <div className="absolute top-12 -left-4 md:-left-12 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-blue-100 dark:border-primary/20 px-3 py-2 md:px-5 md:py-4 flex items-center gap-2 md:gap-3 transition-all hover:scale-105 animate-in fade-in slide-in-from-left-6 duration-1000 delay-300">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/20 dark:bg-primary/30 rounded-full flex items-center justify-center flex-shrink-0 shadow-xl">
                    <CheckCircle2 className="w-4 md:w-5 h-4 md:h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-[11px] md:text-sm font-bold text-slate-800 dark:text-slate-100">+ ₦5,000</p>
                    <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400">Contribution</p>
                  </div>
                </div>

                {/* Floating badge – bottom right corner of image */}
                <div className="absolute bottom-16 -right-4 md:-right-12 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-xl shadow-2xl border border-blue-100 dark:border-primary/20 px-3 py-2 md:px-5 md:py-4 transition-all hover:scale-105 animate-in fade-in slide-in-from-right-6 duration-1000 delay-500">
                  <p className="text-[10px] md:text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest">Growth</p>
                  <div className="mt-2 h-1.5 w-28 md:w-40 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-primary rounded-full shadow-[0_0_12px_rgba(29,78,216,0.6)]" />
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[11px] md:text-sm font-bold text-primary dark:text-blue-400">75% Complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="px-6 lg:px-12 py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Everything you need for safe group savings</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We've modernized the traditional rotational savings system with technology that ensures trust and transparency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">KYC Verified</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Every member is verified using government-issued IDs. No anonymous savers, total transparency.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Smart Matching</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Our algorithm matches you with savers who have similar goals and contribution patterns.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">AI Trust Scores</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Build your financial reputation. Higher trust scores unlock earlier payout positions and larger circles.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Commitment Deposits</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                A 1x contribution deposit ensures everyone stays committed. Safety first for the entire group.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center">
                <Calculator className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Dynamic Planning</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Set your target, duration, and frequency. We calculate the math so you don't have to.
              </p>
            </div>
            <div className="bg-card p-8 rounded-2xl shadow-sm border border-border space-y-4 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold">Automatic Rotation</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fair, transparent payout scheduling handled by our automated smart rotation system.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 lg:px-12 py-24 text-center">
          <div className="max-w-4xl mx-auto bg-primary text-primary-foreground p-12 lg:p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />

            <div className="relative space-y-8">
              <h2 className="text-4xl lg:text-5xl font-bold">Ready to start saving together?</h2>
              <p className="text-xl text-primary-foreground/80">
                Join thousands of Nigerians digitizing their Adashe with CollaboSave.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold" asChild>
                  <Link href={!loading && user ? "/dashboard" : "/signup"}>
                    {!loading && user ? "Go to Dashboard" : "Create Account"}
                  </Link>
                </Button>
                <Button size="lg" className="bg-white text-primary hover:bg-white/90 h-14 px-10 text-lg font-bold" asChild>
                  <a href="https://wa.me/2348130715161" target="_blank" rel="noopener noreferrer">
                    Get Support
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="px-6 lg:px-12 py-12 border-t border-border bg-white dark:bg-slate-900 transition-colors">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 max-w-7xl mx-auto">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">C</span>
              </div>
              <span className="text-2xl font-bold text-primary tracking-tight">CollaboSave</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              Modernizing traditional rotating savings for a safer, inclusive financial future.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#features" className="hover:text-primary transition-colors">How it works</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Adashe App</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Press</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">KYC Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground max-w-7xl mx-auto">
          <p>© 2026 CollaboSave Financial Services. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">Twitter</Link>
            <Link href="#" className="hover:text-primary">LinkedIn</Link>
            <Link href="#" className="hover:text-primary">Instagram</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
