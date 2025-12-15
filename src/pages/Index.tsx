import { useRef } from "react";
import { skillCategories } from "@/lib/pm-skills-data";
import { useSkillsAssessment } from "@/hooks/useSkillsAssessment";
import { RoleSelector } from "@/components/RoleSelector";
import { SkillInput } from "@/components/SkillInput";
import { SkillsChart } from "@/components/SkillsChart";
import { ShareButton } from "@/components/ShareButton";
import { GapAnalysis } from "@/components/GapAnalysis";
import { ExportButton } from "@/components/ExportButton";

const Index = () => {
  const {
    selectedRole,
    setSelectedRole,
    scores,
    updateScore,
    getOwnScoresForChart,
    getRoleScoresForChart,
    getRoleExpectation,
    skillIndices,
  } = useSkillsAssessment();

  const exportRef = useRef<HTMLDivElement>(null);
  let skillNumber = 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="bg-card border-b sticky top-0 z-40">
        <div className="container py-4 md:py-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
              Product Manager Skills Assessment
            </h1>
            <ExportButton targetRef={exportRef} selectedRole={selectedRole} />
          </div>
          <RoleSelector value={selectedRole} onChange={setSelectedRole} />
        </div>
      </header>

      <main className="container py-6 md:py-8">
        {/* Export Target Container */}
        <div ref={exportRef} className="bg-background">
          {/* Chart Section */}
          <section className="mb-8 md:mb-12">
            <SkillsChart
              ownScores={getOwnScoresForChart()}
              roleScores={getRoleScoresForChart()}
              selectedRole={selectedRole}
            />
          </section>

          {/* Gap Analysis Section */}
          <section className="mb-8 md:mb-12">
            <GapAnalysis
              ownScores={getOwnScoresForChart()}
              roleScores={getRoleScoresForChart()}
              selectedRole={selectedRole}
            />
          </section>
        </div>

        {/* Assessment Inputs */}
        <section className="max-w-3xl mx-auto">
          {/* Header Row */}
          <div className="grid grid-cols-[1fr,80px,80px] md:grid-cols-[1fr,100px,100px] gap-2 md:gap-4 items-center py-3 px-3 md:px-4 mb-2 bg-muted rounded-lg font-medium text-sm text-muted-foreground">
            <div>Category</div>
            <div className="text-center">Your Score</div>
            <div className="text-center">Role Target</div>
          </div>

          {/* Category Groups */}
          <div className="space-y-6">
            {/* Customer Insight */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-pm-yellow uppercase tracking-wide px-1">
                Customer Insight
              </h3>
              <div className="space-y-2">
                {[1, 2, 3].map((index) => {
                  skillNumber++;
                  return (
                    <SkillInput
                      key={index}
                      skillName={skillCategories[index]}
                      skillNumber={skillNumber}
                      index={index}
                      value={scores[index] || ""}
                      roleValue={getRoleExpectation(index)}
                      onChange={(value) => updateScore(index, value)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Product Strategy */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-pm-cyan uppercase tracking-wide px-1">
                Product Strategy
              </h3>
              <div className="space-y-2">
                {[5, 6, 7].map((index) => {
                  skillNumber++;
                  return (
                    <SkillInput
                      key={index}
                      skillName={skillCategories[index]}
                      skillNumber={skillNumber}
                      index={index}
                      value={scores[index] || ""}
                      roleValue={getRoleExpectation(index)}
                      onChange={(value) => updateScore(index, value)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Influencing People */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-pm-blue uppercase tracking-wide px-1">
                Influencing People
              </h3>
              <div className="space-y-2">
                {[9, 10, 11].map((index) => {
                  skillNumber++;
                  return (
                    <SkillInput
                      key={index}
                      skillName={skillCategories[index]}
                      skillNumber={skillNumber}
                      index={index}
                      value={scores[index] || ""}
                      roleValue={getRoleExpectation(index)}
                      onChange={(value) => updateScore(index, value)}
                    />
                  );
                })}
              </div>
            </div>

            {/* Product Execution */}
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-pm-orange uppercase tracking-wide px-1">
                Product Execution
              </h3>
              <div className="space-y-2">
                {[13, 14, 15].map((index) => {
                  skillNumber++;
                  return (
                    <SkillInput
                      key={index}
                      skillName={skillCategories[index]}
                      skillNumber={skillNumber}
                      index={index}
                      value={scores[index] || ""}
                      roleValue={getRoleExpectation(index)}
                      onChange={(value) => updateScore(index, value)}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>

      <ShareButton selectedRole={selectedRole} scores={scores} />
    </div>
  );
};

export default Index;
