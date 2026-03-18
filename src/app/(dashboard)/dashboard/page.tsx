"use client";

import {
  Wallet,
  Users,
  Calendar,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  AlertCircle,
  ShieldCheck,
  ShieldAlert,
  Loader2,
  PlusCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { TrustScoreBadge } from "@/components/dashboard/TrustScoreBadge";
import { MOCK_CIRCLES, MOCK_MEMBERSHIPS, MOCK_CONTRIBUTIONS } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useMockUser } from "@/context/mock-user-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function DashboardPage() {
  const { activeUser, isCalculating } = useMockUser();

  const userId = activeUser.id;

  const activeCircles = MOCK_CIRCLES.filter((c) =>
    MOCK_MEMBERSHIPS.some((m) => m.circleId === c.id && m.userId === userId)
  );

  const totalSaved = MOCK_CONTRIBUTIONS
    .filter((c) => c.userId === userId && c.status === "Paid")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const userMemberships = MOCK_MEMBERSHIPS.filter((m) => m.userId === userId);
  const commitmentDeposits = userMemberships
    .filter((m) => m.depositPaid)
    .reduce((acc) => acc + 25000, 0); // flat 25k deposit per paid circle

  const recentContributions = MOCK_CONTRIBUTIONS
    .filter((c) => c.userId === userId)
    .sort((a, b) => (b.paidAt > a.paidAt ? 1 : -1))
    .slice(0, 5);

  const nextPayout = (() => {
    const circle = activeCircles.find((c) => c.nextPayoutDate !== "Pending");
    if (!circle) return { date: "No circles", circleName: "" };
    return { date: circle.nextPayoutDate, circleName: circle.name };
  })();

  const isVerified = activeUser.kycStatus === "verified";
  const isHighRisk = activeUser.trustScore === "High Risk";

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-2 border-b lg:border-none">
        <div className="flex items-center gap-4">
          <Avatar className="w-12 h-12 md:w-14 md:h-14 border-2 border-primary/30 shadow-md">
            <AvatarImage src={activeUser.avatar} />
            <AvatarFallback className="font-bold text-primary bg-primary/10 md:text-lg">
              {getInitials(activeUser.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground truncate max-w-[200px] sm:max-w-none">
              Welcome back, {activeUser.name.split(" ")[0]}!
            </h1>
            <p className="text-muted-foreground mt-0.5 text-xs md:text-sm truncate">{activeUser.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Trust Score badge with AI loading indicator */}
          <div className="flex items-center gap-2">
            {isCalculating && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                AI scoring…
              </span>
            )}
            <TrustScoreBadge score={isCalculating ? "Calculating..." : activeUser.trustScore} />
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="/plans/create">
              <PlusCircle className="w-4 h-4 mr-2" />
              Create Plan
            </Link>
          </Button>
        </div>
      </div>

      {/* High-risk warning banner */}
      {isHighRisk && !isCalculating && (
        <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 animate-in fade-in duration-300">
          <ShieldAlert className="w-5 h-5 flex-shrink-0" />
          <p className="text-sm font-medium leading-snug">
            <span className="font-bold">High Risk profile detected.</span> This account has failed KYC and{" "}
            {activeUser.defaultedPaymentsCount} defaulted payment
            {activeUser.defaultedPaymentsCount !== 1 ? "s" : ""}. Access to premium circles is restricted.
          </p>
        </div>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Saved"
          value={`₦${totalSaved.toLocaleString()}`}
          subValue={`Across ${activeCircles.length} circle${activeCircles.length !== 1 ? "s" : ""}`}
          icon={Wallet}
          color="bg-primary text-primary-foreground"
        />
        <StatCard
          label="Active Circles"
          value={activeCircles.length.toString()}
          icon={Users}
          color="bg-secondary text-secondary-foreground"
        />
        <StatCard
          label="Next Payout"
          value={nextPayout.date}
          subValue={nextPayout.circleName}
          icon={Calendar}
        />
        <StatCard
          label="Commitment Deposits"
          value={`₦${commitmentDeposits.toLocaleString()}`}
          subValue="Refundable on completion"
          icon={CheckCircle2}
        />
      </div>

      {/* AI Trust Score Breakdown card */}
      <Card className={cn(
        "border shadow-sm transition-all duration-300",
        isCalculating && "opacity-80",
        isHighRisk && !isCalculating ? "border-red-200 dark:border-red-800" : "border-border"
      )}>
        <CardContent className="p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-sm text-foreground mb-0.5">AI Risk Assessment</h3>
              <p className="text-[11px] text-muted-foreground">Based on KYC, payment history &amp; group participation</p>
            </div>
            {isCalculating ? (
              <div className="flex items-center gap-2 text-xs text-muted-foreground animate-pulse">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-primary" />
                Analysing profile…
              </div>
            ) : (
              <div className="w-fit">
                <TrustScoreBadge score={activeUser.trustScore} />
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ScoreFactor
              label="KYC Status"
              value={activeUser.kycStatus}
              positive={activeUser.kycStatus === "verified"}
              negative={activeUser.kycStatus === "failed"}
            />
            <ScoreFactor
              label="Successful Payments"
              value={activeUser.successfulPaymentsCount.toString()}
              positive={activeUser.successfulPaymentsCount >= 5}
              negative={activeUser.successfulPaymentsCount < 2}
            />
            <ScoreFactor
              label="Defaulted Payments"
              value={activeUser.defaultedPaymentsCount.toString()}
              positive={activeUser.defaultedPaymentsCount === 0}
              negative={activeUser.defaultedPaymentsCount > 0}
            />
            <ScoreFactor
              label="Groups Completed"
              value={`${activeUser.groupsCompletedCount} / ${activeUser.groupsJoinedCount}`}
              positive={activeUser.groupsCompletedCount >= activeUser.groupsJoinedCount && activeUser.groupsJoinedCount > 0}
              negative={activeUser.groupsCompletedCount < activeUser.groupsJoinedCount}
            />
          </div>
        </CardContent>
      </Card>

      {/* Main grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Circles */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">My Active Circles</h2>
            <Button variant="link" className="text-primary p-0 h-auto" asChild>
              <Link href="/circles">
                View all circles <ArrowUpRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="space-y-4">
            {activeCircles.length === 0 ? (
              <Card className="border border-border bg-card shadow-sm">
                <CardContent className="p-8 text-center space-y-3">
                  <p className="text-muted-foreground text-sm">
                    {isHighRisk
                      ? "High-risk accounts have restricted access to savings circles."
                      : "No active circles yet. Join one to get started!"}
                  </p>
                  {!isHighRisk && (
                    <Button asChild size="sm" className="bg-primary">
                      <Link href="/circles">Explore Circles</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ) : (
              activeCircles.map((circle) => {
                const membership = MOCK_MEMBERSHIPS.find(
                  (m) => m.circleId === circle.id && m.userId === userId
                );
                const contributed = membership?.totalContributed ?? 0;
                const progress = Math.min(
                  Math.round((contributed / circle.targetAmount) * 100),
                  100
                );
                return (
                  <Card
                    key={circle.id}
                    className="border border-border bg-card shadow-sm hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold text-lg">{circle.name}</h3>
                              <p className="text-sm text-muted-foreground capitalize">
                                {circle.frequency} contributions
                              </p>
                            </div>
                            <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20 border-none">
                              {circle.status}
                            </Badge>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-muted-foreground font-medium">
                                Progress to ₦{circle.targetAmount.toLocaleString()}
                              </span>
                              <span className="font-bold">{progress}%</span>
                            </div>
                            <Progress value={progress} className="h-2 bg-muted" />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span>Next: {circle.nextPayoutDate}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {circle.currentMembers}/{circle.totalMembers} members
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="md:w-px bg-border hidden md:block" />

                        <div className="md:w-48 flex flex-col justify-center items-center gap-3">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">
                              Contribution
                            </p>
                            <p className="text-xl font-bold text-primary">
                              ₦{circle.contributionAmount.toLocaleString()}
                            </p>
                          </div>
                          <Button asChild className="w-full" size="sm" variant="outline">
                            <Link href={`/history?circle=${circle.id}`}>
                              Track Details
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </div>

        {/* Right sidebar: activity + KYC nudge */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
          <Card className="border border-border bg-card shadow-sm">
            <CardContent className="p-0">
              {recentContributions.length === 0 ? (
                <div className="p-8 text-center space-y-4">
                  <p className="text-muted-foreground text-sm italic leading-relaxed">
                    No activity recorded yet. Dive in and start saving!
                  </p>
                  <Button asChild size="sm" className="bg-primary">
                    <Link href="/circles">Explore Circles</Link>
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {recentContributions.map((c) => {
                    const circle = MOCK_CIRCLES.find((ci) => ci.id === c.circleId);
                    return (
                      <li key={c.id} className="flex items-center gap-3 px-4 py-3">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full flex-shrink-0",
                            c.status === "Paid" && "bg-emerald-500",
                            c.status === "Late" && "bg-amber-500",
                            c.status === "Pending" && "bg-slate-300"
                          )}
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {circle?.name ?? "Unknown Circle"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Cycle {c.cycleNumber}
                            {c.paidAt ? ` · ${c.paidAt}` : ""}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-sm font-semibold text-foreground">
                            ₦{c.amount.toLocaleString()}
                          </p>
                          <span
                            className={cn(
                              "text-[11px] font-medium",
                              c.status === "Paid" && "text-emerald-600",
                              c.status === "Late" && "text-amber-600",
                              c.status === "Pending" && "text-slate-400"
                            )}
                          >
                            {c.status}
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </CardContent>
          </Card>

          {/* KYC nudge — only if not verified */}
          {activeUser.kycStatus !== "verified" && (
            <Card
              className={cn(
                "border-none shadow-lg",
                activeUser.kycStatus === "failed"
                  ? "bg-red-600 text-white"
                  : "bg-primary text-primary-foreground"
              )}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <AlertCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold">
                    {activeUser.kycStatus === "failed"
                      ? "KYC Verification Failed"
                      : "Verify your identity"}
                  </h3>
                </div>
                <p className="text-sm opacity-80 leading-relaxed">
                  {activeUser.kycStatus === "failed"
                    ? "This account's KYC has been rejected. Please resubmit your documents to restore full access to savings circles."
                    : "Join higher limit savings circles and build your trust score by completing KYC verification."}
                </p>
                <Button className="w-full bg-white text-primary hover:bg-white/90" asChild>
                  <Link href="/kyc">
                    {activeUser.kycStatus === "failed" ? "Resubmit KYC" : "Complete KYC Now"}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Verified badge */}
          {activeUser.kycStatus === "verified" && (
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 text-sm font-semibold px-1">
              <ShieldCheck className="w-4 h-4" />
              Identity Verified — Full Access Unlocked
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Small helper component for AI trust score factor chips
function ScoreFactor({
  label,
  value,
  positive,
  negative,
}: {
  label: string;
  value: string;
  positive: boolean;
  negative: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border px-3 py-2 text-xs",
        positive && "bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800",
        negative && "bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800",
        !positive && !negative && "bg-muted/40 border-border"
      )}
    >
      <p className="font-medium text-muted-foreground mb-0.5">{label}</p>
      <p
        className={cn(
          "font-bold capitalize",
          positive && "text-emerald-700 dark:text-emerald-400",
          negative && "text-red-700 dark:text-red-400",
          !positive && !negative && "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}