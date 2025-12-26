import { skillCategories, getCategoryGroup } from "@/lib/pm-skills-data";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface GapAnalysisProps {
  ownScores: (number | null)[];
  roleScores: (number | null)[];
  selectedRole: string;
}

interface GapItem {
  skill: string;
  index: number;
  own: number;
  target: number;
  gap: number;
  category: 'customer' | 'strategy' | 'people' | 'execution';
}

const categoryLabels = {
  customer: 'Customer Insight',
  strategy: 'Product Strategy',
  people: 'Influencing People',
  execution: 'Product Execution'
};

const categoryStyles = {
  customer: 'text-pm-yellow border-pm-yellow/30 bg-pm-yellow/5',
  strategy: 'text-pm-cyan border-pm-cyan/30 bg-pm-cyan/5',
  people: 'text-pm-blue border-pm-blue/30 bg-pm-blue/5',
  execution: 'text-pm-orange border-pm-orange/30 bg-pm-orange/5'
};

export function GapAnalysis({ ownScores, roleScores, selectedRole }: GapAnalysisProps) {
  // Calculate gaps for all skills
  const gaps: GapItem[] = skillCategories
    .map((skill, index) => {
      if (skill === "") return null;
      const own = ownScores[index];
      const target = roleScores[index];
      const category = getCategoryGroup(index);
      
      if (own === null || target === null || category === null) return null;
      
      return {
        skill,
        index,
        own,
        target,
        gap: own - target,
        category
      };
    })
    .filter((item): item is GapItem => item !== null);

  const strengths = gaps.filter(g => g.gap >= 0.5).sort((a, b) => b.gap - a.gap);
  const developmentAreas = gaps.filter(g => g.gap < -0.5).sort((a, b) => a.gap - b.gap);
  const onTrack = gaps.filter(g => g.gap >= -0.5 && g.gap < 0.5);

  const hasScores = gaps.some(g => g.own > 0);

  if (!hasScores) {
    return (
      <div className="w-full max-w-3xl mx-auto p-6 bg-card rounded-xl border shadow-sm">
        <h2 className="text-lg font-semibold text-foreground mb-4">Gap Analysis</h2>
        <p className="text-muted-foreground text-center py-8">
          Enter your skill scores above to see your gap analysis compared to {selectedRole}.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-3 md:p-6 bg-card rounded-xl border shadow-sm">
      <h2 className="text-base md:text-lg font-semibold text-foreground mb-4 md:mb-6">
        Gap Analysis vs {selectedRole}
      </h2>

      <div className="grid gap-4 md:gap-6 md:grid-cols-2">
        {/* Strengths */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-green-600">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-medium">Strengths</h3>
            <span className="text-xs text-muted-foreground">({strengths.length})</span>
          </div>
          {strengths.length > 0 ? (
            <div className="space-y-2">
              {strengths.map((item) => (
                <GapCard key={item.index} item={item} type="strength" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-2">
              No skills exceed the target yet.
            </p>
          )}
        </div>

        {/* Development Areas */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-amber-600">
            <TrendingDown className="w-5 h-5" />
            <h3 className="font-medium">Focus Areas</h3>
            <span className="text-xs text-muted-foreground">({developmentAreas.length})</span>
          </div>
          {developmentAreas.length > 0 ? (
            <div className="space-y-2">
              {developmentAreas.map((item) => (
                <GapCard key={item.index} item={item} type="development" />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground py-2">
              Great! No significant gaps identified.
            </p>
          )}
        </div>
      </div>

      {/* On Track */}
      {onTrack.length > 0 && (
        <div className="mt-6 pt-4 border-t">
          <div className="flex items-center gap-2 text-muted-foreground mb-3">
            <Minus className="w-4 h-4" />
            <h3 className="text-sm font-medium">On Track</h3>
            <span className="text-xs">({onTrack.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {onTrack.map((item) => (
              <span 
                key={item.index} 
                className={`text-xs px-2 py-1 rounded border ${categoryStyles[item.category]}`}
              >
                {item.skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GapCard({ item, type }: { item: GapItem; type: 'strength' | 'development' }) {
  // For strengths: show how much you exceed the target (gap-based)
  // For development: show progress toward the target (own/target percentage)
  const barWidth = type === 'strength' 
    ? Math.min(Math.abs(item.gap) / 3 * 100, 100)
    : Math.min((item.own / item.target) * 100, 100);
  
  return (
    <div className={`p-2.5 md:p-3 rounded-lg border ${categoryStyles[item.category]}`}>
      <div className="flex justify-between items-start mb-1.5 md:mb-2 gap-2">
        <span className="text-xs md:text-sm font-medium text-foreground leading-tight">{item.skill}</span>
        <span className={`text-xs font-semibold flex-shrink-0 ${type === 'strength' ? 'text-green-600' : 'text-amber-600'}`}>
          {type === 'strength' ? '+' : ''}{item.gap.toFixed(1)}
        </span>
      </div>
      <div className="flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground">
        <span>You: {item.own.toFixed(1)}</span>
        <span>•</span>
        <span>Target: {item.target.toFixed(1)}</span>
      </div>
      <div className="mt-1.5 md:mt-2 h-1 md:h-1.5 bg-muted rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all ${type === 'strength' ? 'bg-green-500' : 'bg-amber-500'}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  );
}
