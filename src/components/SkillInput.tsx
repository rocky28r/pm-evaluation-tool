import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { skillDescriptions } from "@/lib/pm-skills-data";
import { cn } from "@/lib/utils";

interface SkillInputProps {
  skillName: string;
  skillNumber: number;
  index?: number;
  value: string;
  roleValue: number | null;
  onChange: (value: string) => void;
}

export function SkillInput({
  skillName,
  skillNumber,
  value,
  roleValue,
  onChange,
}: SkillInputProps) {
  const [expanded, setExpanded] = useState(false);
  const description = skillDescriptions[skillName];

  // Parse the description to extract category and details
  const descriptionParts = description?.split('\n') || [];
  const categoryLabel = descriptionParts[0] || '';
  const detailText = descriptionParts[1] || '';

  return (
    <div className="bg-muted/30 rounded-lg transition-all hover:bg-muted/50">
      <div className="grid grid-cols-[1fr,60px,50px] sm:grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,100px,100px] gap-1.5 sm:gap-2 md:gap-4 items-center py-2.5 sm:py-3 px-2.5 sm:px-3 md:px-4">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          <span className="text-xs sm:text-sm md:text-base font-medium text-foreground truncate">
            {skillNumber}. {skillName}
          </span>
          {description && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors touch-manipulation"
            >
              <ChevronDown className={cn("w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform", expanded && "rotate-180")} />
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
          className="text-center h-8 sm:h-9 font-medium text-sm"
          placeholder="0-3"
        />

        <div className="text-center font-semibold text-muted-foreground text-xs sm:text-sm md:text-base">
          {roleValue !== null && roleValue !== undefined
            ? roleValue.toFixed(1)
            : "-"}
        </div>
      </div>

      {expanded && description && (
        <div className="px-2.5 sm:px-3 md:px-4 pb-2.5 sm:pb-3 pt-1 border-t border-border/50">
          <p className="text-[10px] sm:text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5 sm:mb-1">
            {categoryLabel}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            {detailText}
          </p>
        </div>
      )}
    </div>
  );
}
