
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ShieldCheck, Upload, CheckCircle2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function KYCPage() {
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast({
      title: "KYC Documents Submitted",
      description: "Our team will review your identity within 24 hours.",
    });
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in zoom-in-95 duration-500">
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
          <ShieldCheck className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-bold">Verification Pending</h1>
        <p className="text-muted-foreground text-lg max-w-md">
          Thank you for submitting your documents. You can now browse circles, but you'll be able to join as soon as your account is verified.
        </p>
        <Button onClick={() => window.location.href = '/dashboard'}>Return to Dashboard</Button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Identity Verification</h1>
        <p className="text-muted-foreground mt-1">Complete your profile to unlock full platform features.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Legal details as they appear on your ID.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpload} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fname">First Name</Label>
                    <Input id="fname" placeholder="Musa" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lname">Last Name</Label>
                    <Input id="lname" placeholder="Ibrahim" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Residential Address</Label>
                  <Input id="address" placeholder="123 Kaduna Road, Nigeria" required />
                </div>

                <div className="space-y-4">
                  <Label>Identity Document</Label>
                  <div className="border-2 border-dashed border-muted-foreground/20 rounded-xl p-8 text-center space-y-4 bg-secondary/10 hover:bg-secondary/20 transition-colors cursor-pointer group">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto shadow-sm group-hover:scale-110 transition-transform">
                      <Upload className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm">Upload Government ID</p>
                      <p className="text-xs text-muted-foreground">Passport, Driver's License or National ID (PNG, JPG up to 5MB)</p>
                    </div>
                    <input type="file" className="hidden" id="file-upload" />
                    <Button type="button" variant="outline" size="sm" onClick={() => document.getElementById('file-upload')?.click()}>
                      Choose File
                    </Button>
                  </div>
                </div>

                <div className="pt-4">
                  <Button type="submit" className="w-full py-6 text-lg font-bold">
                    Submit for Verification
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-none bg-emerald-50 shadow-none">
            <CardContent className="p-6 space-y-4">
              <h3 className="font-bold text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Why verify?
              </h3>
              <ul className="space-y-3">
                {[
                  "Access higher savings limits",
                  "Early payout priority",
                  "Verified trust score badge",
                  "Enhanced account security"
                ].map((item, i) => (
                  <li key={i} className="text-xs text-emerald-800 flex items-center gap-2">
                    <div className="w-1 h-1 bg-emerald-600 rounded-full" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none bg-amber-50 shadow-none">
            <CardContent className="p-6 flex gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-900">Security Note</p>
                <p className="text-[10px] text-amber-800 leading-relaxed">
                  Your documents are encrypted and only used for identity verification. We never share your data with third parties.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
