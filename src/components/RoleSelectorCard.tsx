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
  "Jr Product Manager": "Entry-level PM focused on execution and learning",
  "Product Manager": "Core PM handling features and stakeholder coordination",
  "Senior Product Manager": "Experienced PM driving strategy and mentoring",
  "Principal Product Manager": "Expert IC with deep technical or domain expertise",
  "Senior Principal Product Manager": "Staff-level IC influencing org-wide strategy",
  "Associate Group Product Manager": "Transitioning to people management",
  "Group Product Manager": "Managing PMs and product lines",
  "Product Director": "Leading product strategy across teams",
  "VP Product": "Executive overseeing product organization",
  "SVP Product": "C-suite product leadership",
};

export function RoleSelectorCard({ value, onChange }: RoleSelectorCardProps) {
  const roles = Object.keys(getRoleExpectations());

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 rounded-lg bg-primary/10">
          <Target className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">
            Role Benchmark
          </h3>
          <p className="text-sm text-muted-foreground">
            Compare your skills against role expectations
          </p>
        </div>
      </div>

      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-background">
          <SelectValue placeholder="Select a role" />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role} value={role}>
              {role}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {value && roleDescriptions[value] && (
        <p className="mt-3 text-sm text-muted-foreground">
          {roleDescriptions[value]}
        </p>
      )}
    </div>
  );
}
