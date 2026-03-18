
"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Info, Calculator, CheckCircle, ArrowRight, ShieldCheck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function CreatePlanPage() {
  const [target, setTarget] = useState(100000);
  const [duration, setDuration] = useState(10);
  const [frequency, setFrequency] = useState("monthly");
  const { toast } = useToast();
  const router = useRouter();

  const contribution = useMemo(() => {
    return Math.ceil(target / duration);
  }, [target, duration]);

  const deposit = contribution; // Commitment deposit is 1x contribution

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Plan Created Successfully!",
      description: "We're matching you with other savers now.",
    });
    router.push("/dashboard");
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Create a Savings Plan</h1>
        <p className="text-muted-foreground mt-1">Define your goals and we'll handle the group matching.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Plan Configuration</CardTitle>
              <CardDescription>Tell us how much you want to save and your preferred timeline.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="target">Target Savings Amount (₦)</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-muted-foreground">₦</span>
                    <Input 
                      id="target" 
                      type="number" 
                      value={target} 
                      onChange={(e) => setTarget(Number(e.target.value))}
                      className="pl-8 text-lg font-bold"
                      placeholder="e.g. 100,000"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Label>Duration ({duration} {frequency === 'monthly' ? 'months' : frequency === 'weekly' ? 'weeks' : 'cycles'})</Label>
                    <span className="text-sm font-bold text-primary">{duration} Cycles</span>
                  </div>
                  <Slider 
                    value={[duration]} 
                    onValueChange={(val) => setDuration(val[0])} 
                    min={2} 
                    max={24} 
                    step={1} 
                  />
                  <div className="flex justify-between text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                    <span>Quick Saver (2)</span>
                    <span>Patient Saver (24)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Contribution Frequency</Label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full py-6 text-lg font-bold">
                    Create & Find Matching Circle <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card className="bg-accent/5 border-dashed border-accent/20">
            <CardContent className="p-6 flex gap-4">
              <div className="p-2 bg-accent/10 rounded-full h-fit">
                <Info className="w-5 h-5 text-accent" />
              </div>
              <div className="space-y-1">
                <h4 className="font-bold text-accent">How matching works</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We'll look for an existing savings circle that matches your target amount, frequency, and duration. If one isn't found, you'll become the first member of a new circle.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="border-none shadow-lg bg-primary text-white overflow-hidden">
            <div className="p-6 bg-white/10 flex items-center gap-3">
              <Calculator className="w-6 h-6" />
              <h3 className="font-bold text-xl">Plan Summary</h3>
            </div>
            <CardContent className="p-6 space-y-8">
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/10 pb-4">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-primary-foreground/60 uppercase">Contribution</p>
                    <p className="text-3xl font-bold">₦{contribution.toLocaleString()}</p>
                  </div>
                  <p className="text-sm font-medium opacity-80 mb-1">per {frequency.replace('ly', '')}</p>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">Target Amount</span>
                    <span className="font-bold">₦{target.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">Circle Members</span>
                    <span className="font-bold">{duration} Savers</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="opacity-80">Cycle Duration</span>
                    <span className="font-bold capitalize">{duration} {frequency.replace('ly', '')}s</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white rounded-xl text-foreground space-y-3 shadow-inner">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-accent" />
                  <span className="font-bold">Required Deposit</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-muted-foreground max-w-[120px]">Initial commitment deposit (1x contribution)</p>
                  <p className="text-xl font-extrabold text-primary">₦{deposit.toLocaleString()}</p>
                </div>
                <p className="text-[10px] text-muted-foreground italic">
                  * Refunded fully upon successful completion of the cycle.
                </p>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium">Safe & Secure via Adashe Protocol</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
