import { Input } from "@/components/ui/input";
import { skillDescriptions } from "@/lib/pm-skills-data";

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
  const description = skillDescriptions[skillName];

  return (
    <div className="rounded-md border border-transparent bg-muted/35 transition-colors hover:border-border hover:bg-card focus-within:border-primary/50 focus-within:bg-card">
      <div className="grid grid-cols-[minmax(0,1fr)_60px_40px] sm:grid-cols-[minmax(0,1fr)_76px_48px] md:grid-cols-[minmax(0,1fr)_88px_56px] gap-2 items-center py-3 px-3 md:px-4">
        <div className="min-w-0">
          <span className="text-xs sm:text-sm font-medium text-foreground truncate" title={skillName}>
            {skillNumber}. {skillName}
          </span>
        </div>

        <Input
          type="number"
          min={0}
          max={3}
          step={0.5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-label={`Your assessment for ${skillName}`}
          className="text-center h-8 sm:h-9 bg-background font-medium text-sm"
          placeholder="-"
        />

        <div className="text-right font-heading font-semibold text-primary text-xs sm:text-sm" aria-label={`Role benchmark: ${roleValue?.toFixed(1) ?? "not set"}`}>
          {roleValue !== null && roleValue !== undefined
            ? roleValue.toFixed(1)
            : "-"}
        </div>
      </div>

      {description && (
        <div className="px-3 md:px-4 pb-3 pt-2 border-t border-border/50">
          <p className="text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      )}
    </div>
  );
}
