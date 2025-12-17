import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { skillDescriptions, getCategoryGroup } from "@/lib/pm-skills-data";
import { cn } from "@/lib/utils";

interface SkillInputProps {
  skillName: string;
  skillNumber: number;
  index: number;
  value: string;
  roleValue: number | null;
  onChange: (value: string) => void;
}

const categoryGroupStyles = {
  customer: "border-l-pm-yellow",
  strategy: "border-l-pm-cyan",
  people: "border-l-pm-blue",
  execution: "border-l-pm-orange",
};

export function SkillInput({
  skillName,
  skillNumber,
  index,
  value,
  roleValue,
  onChange,
}: SkillInputProps) {
  const [expanded, setExpanded] = useState(false);
  const description = skillDescriptions[skillName];
  const group = getCategoryGroup(index);
  const borderClass = group ? categoryGroupStyles[group] : "";

  // Parse the description to extract category and details
  const descriptionParts = description?.split('\n') || [];
  const categoryLabel = descriptionParts[0] || '';
  const detailText = descriptionParts[1] || '';

  return (
    <div
      className={cn(
        "border-l-4 bg-card rounded-r-lg transition-all hover:shadow-sm animate-fade-in",
        borderClass
      )}
      style={{ animationDelay: `${skillNumber * 50}ms` }}
    >
      <div className="grid grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,100px,100px] gap-2 md:gap-4 items-center py-3 px-3 md:px-4">
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-sm md:text-base font-medium text-foreground truncate">
            {skillNumber}. {skillName}
          </span>
          {description && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
            >
              {expanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
            </button>
          )}
        </div>

        <Input
          type="number"
          min={0}
          max={3}
          step={0.5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-center h-9 font-medium"
          placeholder="0-3"
        />

        <div className="text-center font-semibold text-muted-foreground">
          {roleValue !== null && roleValue !== undefined
            ? roleValue.toFixed(1)
            : "-"}
        </div>
      </div>

      {expanded && description && (
        <div className="px-3 md:px-4 pb-3 pt-1 border-t border-border/50">
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-1">
            {categoryLabel}
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {detailText}
          </p>
        </div>
      )}
    </div>
  );
}
