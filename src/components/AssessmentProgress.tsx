import { cn } from "@/lib/utils";

interface AssessmentProgressProps {
  scores: Record<number, string>;
  skillIndices: number[];
}

export function AssessmentProgress({
  scores,
  skillIndices,
}: AssessmentProgressProps) {
  const filledCount = skillIndices.filter(
    (index) => scores[index] && scores[index] !== ""
  ).length;
  const totalCount = skillIndices.length;
  const percentage = Math.round((filledCount / totalCount) * 100);

  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-500",
            percentage === 100 ? "bg-accent" : "bg-primary"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-sm font-medium text-muted-foreground whitespace-nowrap">
        {filledCount}/{totalCount}
      </span>
    </div>
  );
}
