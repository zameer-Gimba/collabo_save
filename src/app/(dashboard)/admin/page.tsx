
"use client";

import { useUser, useFirestore, useDoc, useCollection, useMemoFirebase } from "@/firebase";
import { doc, collection, query, where } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Users, AlertCircle, CheckCircle2, XCircle } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { redirect } from "next/navigation";

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();

  const userRef = useMemoFirebase(() => {
    if (!db || !user?.uid) return null;
    return doc(db, "users", user.uid);
  }, [db, user?.uid]);

  const { data: profile, isLoading: isProfileLoading } = useDoc(userRef);

  // Verification requests query
  const verificationsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "verifications"), where("status", "==", "PENDING"));
  }, [db]);

  const { data: verifications, isLoading: isVerificationsLoading } = useCollection(verificationsQuery);

  if (isUserLoading || isProfileLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-primary font-bold">Checking Permissions...</div>
      </div>
    );
  }

  // Admin access check
  if (profile?.role !== 'admin') {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-2">
            <ShieldCheck className="w-8 h-8 text-rose-600" />
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">Platform management and user verifications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Pending Verifications</CardTitle>
            <div className="text-3xl font-bold">{verifications?.length || 0}</div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Require immediate attention</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Circles</CardTitle>
            <div className="text-3xl font-bold">124</div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">Across all regions</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Platform Health</CardTitle>
            <div className="text-3xl font-bold text-emerald-600">Stable</div>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">All systems operational</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader>
          <CardTitle className="text-lg">Verification Queue</CardTitle>
          <CardDescription>Manage user KYC and trust score validation requests.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {!verifications || verifications.length === 0 ? (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="text-muted-foreground italic max-w-sm mx-auto">
                No pending verification requests at this time. Great job!
              </p>
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="pl-6">Type</TableHead>
                  <TableHead>User ID</TableHead>
                  <TableHead>Requested Date</TableHead>
                  <TableHead className="text-right pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {verifications.map((v) => (
                  <TableRow key={v.id} className="hover:bg-secondary/20 transition-colors">
                    <TableCell className="pl-6">
                      <Badge variant="outline" className="capitalize">{v.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{v.userId}</TableCell>
                    <TableCell className="text-muted-foreground">{v.requestedAt}</TableCell>
                    <TableCell className="text-right pr-6 space-x-2">
                      <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                        <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
                      </Button>
                      <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                        <XCircle className="w-4 h-4 mr-1" /> Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
