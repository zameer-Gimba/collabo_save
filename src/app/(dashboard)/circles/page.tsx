
"use client";

import { useState } from "react";
import { MOCK_CIRCLES, MOCK_USER } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Calendar, Wallet, ArrowRight, ShieldCheck, Filter } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function CirclesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("");
  const { toast } = useToast();

  const filteredCircles = MOCK_CIRCLES.filter(c => 
    c.name.toLowerCase().includes(activeFilter.toLowerCase())
  );

  const handleJoin = (circleName: string) => {
    toast({
      title: "Join Request Sent!",
      description: `Pending deposit payment for ${circleName}.`,
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Find a Circle</h1>
          <p className="text-muted-foreground mt-1">Join an existing Adashe group with matching financial goals.</p>
        </div>
        <Button variant="outline" className="flex items-center gap-2" onClick={() => setActiveFilter(searchTerm)}>
          <Filter className="w-4 h-4" />
          Filter Results
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input 
          className="pl-10 h-12 bg-white border-none shadow-sm focus-visible:ring-primary" 
          placeholder="Search for group names, amounts, or cities..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setActiveFilter(searchTerm)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCircles.map((circle) => (
          <Card key={circle.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
            <div className="h-2 bg-primary/20 w-full group-hover:bg-primary transition-colors" />
            <CardHeader className="space-y-1">
              <div className="flex justify-between items-start">
                <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20 capitalize font-bold text-[10px]">
                  {circle.frequency}
                </Badge>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-bold uppercase tracking-wider">
                  <Users className="w-3 h-3" />
                  {circle.currentMembers}/{circle.totalMembers} Joined
                </div>
              </div>
              <CardTitle className="text-xl group-hover:text-primary transition-colors">{circle.name}</CardTitle>
              <CardDescription>Managed by verified community leader</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Wallet className="w-3 h-3" /> Contribution
                  </p>
                  <p className="font-bold text-lg">₦{circle.contributionAmount.toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> Payout Target
                  </p>
                  <p className="font-bold text-lg">₦{circle.targetAmount.toLocaleString()}</p>
                </div>
              </div>

              <div className="p-4 bg-secondary/30 rounded-xl space-y-2">
                <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                  <span>Available Slots</span>
                  <span>{circle.totalMembers - circle.currentMembers} Left</span>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${(circle.currentMembers / circle.totalMembers) * 100}%` }} 
                  />
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full py-6 group" variant={circle.currentMembers >= circle.totalMembers ? "secondary" : "default"}>
                    {circle.currentMembers >= circle.totalMembers ? "Full" : "Join Circle"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Join {circle.name}</DialogTitle>
                    <DialogDescription>
                      Review the commitment deposit and circle details before joining.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-6 py-4">
                    <div className="p-4 bg-primary/5 rounded-xl space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Cycle Contribution</span>
                        <span className="font-bold">₦{circle.contributionAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-primary">
                        <span className="text-sm font-bold flex items-center gap-1">
                          <ShieldCheck className="w-4 h-4" /> Commitment Deposit
                        </span>
                        <span className="font-bold">₦{circle.contributionAmount.toLocaleString()}</span>
                      </div>
                      <div className="h-px bg-primary/10" />
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">Total Entry Payment</span>
                        <span className="text-xl font-bold">₦{(circle.contributionAmount * 2).toLocaleString()}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-sm font-bold">Payout Rotation</h4>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        Positions are assigned on a first-come-first-served basis for this circle. You will likely be assigned position <strong>#{circle.currentMembers + 1}</strong>.
                      </p>
                    </div>

                    {MOCK_USER.kycStatus !== 'verified' && (
                      <div className="p-3 bg-amber-50 text-amber-800 rounded-lg flex gap-3">
                        <Calendar className="w-5 h-5 shrink-0" />
                        <p className="text-xs font-medium">
                          You need to complete KYC verification before joining any circle. 
                          <button className="underline ml-1 font-bold">Go to KYC</button>
                        </p>
                      </div>
                    )}
                  </div>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button 
                      disabled={MOCK_USER.kycStatus !== 'verified'} 
                      onClick={() => handleJoin(circle.name)}
                    >
                      Pay & Join Circle
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
