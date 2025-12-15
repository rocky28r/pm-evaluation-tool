import { HelpCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
  const description = skillDescriptions[skillName];
  const group = getCategoryGroup(index);
  const borderClass = group ? categoryGroupStyles[group] : "";

  return (
    <div
      className={cn(
        "grid grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,100px,100px] gap-2 md:gap-4 items-center py-3 px-3 md:px-4 border-l-4 bg-card rounded-r-lg transition-all hover:shadow-sm animate-fade-in",
        borderClass
      )}
      style={{ animationDelay: `${skillNumber * 50}ms` }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm md:text-base font-medium text-foreground truncate">
          {skillNumber}. {skillName}
        </span>
        {description && (
          <Tooltip>
            <TooltipTrigger asChild>
              <button className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary/20 transition-colors">
                <HelpCircle className="w-3 h-3" />
              </button>
            </TooltipTrigger>
            <TooltipContent className="max-w-xs whitespace-pre-wrap text-sm">
              {description}
            </TooltipContent>
          </Tooltip>
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
  );
}
