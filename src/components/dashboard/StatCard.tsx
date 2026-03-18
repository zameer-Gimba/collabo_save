import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  subValue?: string;
  icon: LucideIcon;
  color?: string;
  className?: string;
}

export function StatCard({ label, value, subValue, icon: Icon, color, className }: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden border border-border shadow-sm bg-card hover:shadow-md transition-all", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            {subValue && (
              <p className="text-xs text-muted-foreground mt-1">{subValue}</p>
            )}
          </div>
          <div className={cn("p-3 rounded-xl transition-colors", color || "bg-primary/10")}>
            <Icon className={cn("w-6 h-6", color ? "text-current" : "text-primary")} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}