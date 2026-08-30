import { useRef } from "react";
import { Github } from "lucide-react";
import { skillCategories } from "@/lib/pm-skills-data";
import { useSkillsAssessment } from "@/hooks/useSkillsAssessment";
import { RoleSelectorCard } from "@/components/RoleSelectorCard";
import { SkillCategoryAccordion } from "@/components/SkillCategoryAccordion";
import { SkillsChart } from "@/components/SkillsChart";
import { GapAnalysis } from "@/components/GapAnalysis";
import { ExportButton } from "@/components/ExportButton";
import { SaveLoadKey } from "@/components/SaveLoadKey";
import { AssessmentProgress } from "@/components/AssessmentProgress";
import { LegalFooter } from "@/components/LegalFooter";

const Index = () => {
  const {
    selectedRole,
    setSelectedRole,
    scores,
    updateScore,
    loadState,
    getOwnScoresForChart,
    getRoleScoresForChart,
    getRoleExpectation,
    skillIndices,
  } = useSkillsAssessment();

  const exportRef = useRef<HTMLDivElement>(null);

  const categoryGroups = [
    {
      title: "Customer Insight",
      colorClass: "bg-pm-yellow",
      indices: [1, 2, 3],
      startNumber: 1,
    },
    {
      title: "Product Strategy",
      colorClass: "bg-pm-cyan",
      indices: [5, 6, 7],
      startNumber: 4,
    },
    {
      title: "Influencing People",
      colorClass: "bg-pm-blue",
      indices: [9, 10, 11],
      startNumber: 7,
    },
    {
      title: "Product Execution",
      colorClass: "bg-pm-orange",
      indices: [13, 14, 15],
      startNumber: 10,
    },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="container py-3 md:py-4">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h1 className="text-lg md:text-2xl font-heading font-bold text-foreground tracking-normal truncate">
                PM Skills Assessment
              </h1>
              <p className="text-xs md:text-sm text-muted-foreground mt-0.5 hidden sm:block">
                Rate your skills and compare against role benchmarks
              </p>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <a
                href="https://github.com/rocky28r/pm-evaluation-tool"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                aria-label="View on GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <SaveLoadKey
                selectedRole={selectedRole}
                scores={scores}
                onLoadKey={loadState}
              />
              <ExportButton 
                targetRef={exportRef} 
                selectedRole={selectedRole}
                ownScores={getOwnScoresForChart()}
                roleScores={getRoleScoresForChart()}
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container py-5 md:py-8">
        <div className="mb-5 md:mb-7 flex flex-col gap-2 border-l-2 border-primary pl-3 md:pl-4">
          <p className="text-xs font-heading font-semibold uppercase tracking-[0.12em] text-primary">Career framework calibration</p>
          <p className="max-w-2xl text-sm text-muted-foreground">Score the skills that define effective product leadership in your current scope.</p>
        </div>
        <div className="grid lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.3fr)] gap-5 lg:gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-4 md:space-y-5 order-1">
            {/* Role Selector Card */}
            <RoleSelectorCard value={selectedRole} onChange={setSelectedRole} />

            {/* Progress */}
            <div className="px-1 pt-1">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-heading font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Assessment Progress
                </span>
              </div>
              <AssessmentProgress scores={scores} skillIndices={skillIndices} />
            </div>

            {/* Skill Categories */}
            <div className="space-y-2 md:space-y-3">
              {categoryGroups.map((group) => (
                <SkillCategoryAccordion
                  key={group.title}
                  title={group.title}
                  colorClass={group.colorClass}
                  skillIndices={group.indices}
                  skillCategories={skillCategories}
                  scores={scores}
                  getRoleExpectation={getRoleExpectation}
                  updateScore={updateScore}
                  startNumber={group.startNumber}
                />
              ))}
            </div>
          </div>

          {/* Right Column - Visualizations */}
          <div className="order-2 lg:sticky lg:top-24 lg:self-start space-y-4 md:space-y-6">
            <div ref={exportRef} className="space-y-4 md:space-y-6">
              {/* Chart Section */}
              <div className="rounded-md border border-border bg-card p-3 md:p-6 shadow-[0_10px_28px_hsl(216_35%_20%/0.045)]">
                <SkillsChart
                  ownScores={getOwnScoresForChart()}
                  roleScores={getRoleScoresForChart()}
                  selectedRole={selectedRole}
                />
              </div>

              {/* Gap Analysis Section */}
              <GapAnalysis
                ownScores={getOwnScoresForChart()}
                roleScores={getRoleScoresForChart()}
                selectedRole={selectedRole}
              />
            </div>
          </div>
        </div>
      </main>

      <LegalFooter />
    </div>
  );
};

export default Index;
