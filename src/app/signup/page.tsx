"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ChevronRight, ShieldCheck, Mail, Lock, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { useFirestore } from "@/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

export default function SignupPage() {
  const router = useRouter();
  const db = useFirestore();
  const { signup, user, loading: isUserLoading } = useAuth();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user && !isUserLoading) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signup(email, password, fullName);

      // We still use Firestore for user meta, but we mock the ID for now or 
      // handle it differently. For this transition, we'll focus on the auth replacement.
      // In a full implementation, signup would return the user ID.
      /*
      await setDoc(doc(db, "users", newUser.uid), {
        ...
      });
      */
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Signup Failed",
        description: error.message || "Could not create account.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (isUserLoading) return null;

  return (
    <div className="min-h-screen bg-muted/30 dark:bg-slate-950 flex items-center justify-center p-6 transition-colors">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">C</span>
            </div>
            <span className="text-3xl font-bold text-primary tracking-tight">CollaboSave</span>
          </Link>
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-muted-foreground mt-2">Join thousands of savers building their future together.</p>
        </div>

        <Card className="border border-border shadow-xl bg-card">
          <CardHeader>
            <CardTitle className="text-lg">Register</CardTitle>
            <CardDescription>Enter your details to get started.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="fullname" 
                    placeholder="Musa Ibrahim" 
                    className="pl-10 focus-visible:ring-primary" 
                    required 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    className="pl-10 focus-visible:ring-primary" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 focus-visible:ring-primary" 
                    required 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="pt-2">
                <Button type="submit" className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90" disabled={loading}>
                  {loading ? "Creating Account..." : (
                    <>
                      Get Started <ChevronRight className="ml-1 w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 border-t border-border pt-6 bg-muted/10">
            <p className="text-sm text-center text-muted-foreground">
              By signing up, you agree to our <button className="text-primary font-bold hover:underline">Terms of Service</button> and <button className="text-primary font-bold hover:underline">Privacy Policy</button>.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="w-4 h-4" /> 256-bit Bank Grade Security
            </div>
          </CardFooter>
        </Card>

        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-primary font-bold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}