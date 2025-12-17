import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { SkillInput } from "./SkillInput";
import { cn } from "@/lib/utils";

interface SkillCategoryAccordionProps {
  title: string;
  colorClass: string;
  skillIndices: number[];
  skillCategories: string[];
  scores: Record<number, string>;
  getRoleExpectation: (index: number) => number | null;
  updateScore: (index: number, value: string) => void;
  startNumber: number;
}

export function SkillCategoryAccordion({
  title,
  colorClass,
  skillIndices,
  skillCategories,
  scores,
  getRoleExpectation,
  updateScore,
  startNumber,
}: SkillCategoryAccordionProps) {
  const [isOpen, setIsOpen] = useState(true);

  const filledCount = skillIndices.filter(
    (index) => scores[index] && scores[index] !== ""
  ).length;
  const totalCount = skillIndices.length;

  return (
    <div className="rounded-lg border border-border overflow-hidden bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className={cn("w-1 h-8 rounded-full", colorClass)} />
          <span className="font-heading font-semibold text-foreground">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            {filledCount}/{totalCount} rated
          </span>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-200",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="p-4 pt-0 space-y-2">
            {skillIndices.map((index, i) => (
              <SkillInput
                key={index}
                skillName={skillCategories[index]}
                skillNumber={startNumber + i}
                index={index}
                value={scores[index] || ""}
                roleValue={getRoleExpectation(index)}
                onChange={(value) => updateScore(index, value)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
