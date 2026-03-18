"use client";

import { MOCK_CONTRIBUTIONS, MOCK_CIRCLES } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

export default function HistoryPage() {
  const sortedHistory = [...MOCK_CONTRIBUTIONS].sort((a, b) => 
    new Date(b.paidAt).getTime() - new Date(a.paidAt).getTime()
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Transaction History</h1>
        <p className="text-muted-foreground mt-1">Review all your past contributions and circle activities.</p>
      </div>

      <Card className="border-none shadow-sm overflow-hidden bg-white">
        <CardHeader>
          <CardTitle className="text-lg">All Activities</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {sortedHistory.length > 0 ? (
            <Table>
              <TableHeader className="bg-secondary/50">
                <TableRow>
                  <TableHead className="pl-6">Status</TableHead>
                  <TableHead>Circle</TableHead>
                  <TableHead>Cycle</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right pr-6">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedHistory.map((item) => {
                  const circle = MOCK_CIRCLES.find(c => c.id === item.circleId);
                  return (
                    <TableRow key={item.id} className="hover:bg-secondary/20 transition-colors">
                      <TableCell className="pl-6">
                        <div className="flex items-center gap-2">
                          {item.status === 'Paid' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          ) : item.status === 'Pending' ? (
                            <Clock className="w-4 h-4 text-amber-600" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-rose-600" />
                          )}
                          <span className={cn(
                            "text-xs font-bold uppercase",
                            item.status === 'Paid' ? "text-emerald-600" : 
                            item.status === 'Pending' ? "text-amber-600" : "text-rose-600"
                          )}>
                            {item.status}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{circle?.name}</TableCell>
                      <TableCell className="text-muted-foreground">Cycle #{item.cycleNumber}</TableCell>
                      <TableCell className="text-muted-foreground">{item.paidAt}</TableCell>
                      <TableCell className="text-right pr-6 font-bold">₦{item.amount.toLocaleString()}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground italic max-w-sm mx-auto">
                Your CollaboSave journey begins now! No activity has been recorded. Dive in and discover how you can collaborate and save.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}