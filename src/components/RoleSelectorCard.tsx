import { Target } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getRoleExpectations } from "@/lib/pm-skills-data";

interface RoleSelectorCardProps {
  value: string;
  onChange: (value: string) => void;
}

const roleDescriptions: Record<string, string> = {
  "Junior Product Manager": "Defined feature work with guidance and developing product craft",
  "Product Manager": "Independent discovery-to-launch ownership within a team domain",
  "Senior Product Manager": "Cross-domain product leadership, coaching, and technical co-leadership",
  "Principal Product Manager": "Strategic individual contributor shaping product practice across teams",
  "Group Product Manager": "People, strategy, and operating-model leader for multiple product teams",
  "Director Product": "Portfolio and cross-group leader focused on coherence and leadership quality",
};

export function RoleSelectorCard({ value, onChange }: RoleSelectorCardProps) {
  const roles = Object.keys(getRoleExpectations());

  return (
    <section className="rounded-md border border-border bg-card p-4 md:p-5 shadow-[0_10px_28px_hsl(216_35%_20%/0.045)]">
      <div className="flex items-start gap-3 mb-3 md:mb-4">
        <div className="p-1.5 md:p-2 rounded-md bg-primary/10 flex-shrink-0">
          <Target className="w-4 h-4 md:w-5 md:h-5 text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-heading font-semibold text-foreground text-sm md:text-base">
            Role Benchmark
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground">
            Compare your skills against role expectations
          </p>
        </div>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label="Choose role benchmark" className="w-full bg-background h-10 md:h-11 text-sm font-medium">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role} className="text-sm">
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value && roleDescriptions[value] && (
        <p className="mt-2 md:mt-3 text-xs md:text-sm text-muted-foreground">
          {roleDescriptions[value]}
        </p>
      )}
    </section>
  );
}
