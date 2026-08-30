export const skillCategories = [
  "", // 0 - Spacer 1
  "Evidence-Led Discovery", "Customer Partnership & GTM", "Solution & Experience Design", // 1, 2, 3
  "", // 4 - Spacer 2
  "Outcome & Strategy Ownership", "Vision, Roadmap & Portfolio", "Technical & AI Direction", // 5, 6, 7
  "", // 8 - Spacer 3
  "Stakeholder Influence", "Coaching & People Leadership", "Product Operating Model", // 9, 10, 11
  "", // 12 - Spacer 4
  "Problem Framing & Requirements", "Delivery & Quality", "Measurement & Iteration" // 13, 14, 15
];

export const skillDescriptions: Record<string, string> = {
  "Evidence-Led Discovery": "Frame product problems through qualitative and quantitative evidence, conduct research, synthesize learning, and validate conclusions, including when using AI-supported tools.",
  "Customer Partnership & GTM": "Build customer access and feedback loops, bring customer insight into decisions, and partner with Sales, Customer Success, Marketing, and GTM teams from discovery through launch.",
  "Solution & Experience Design": "Lead concept development with Design and Engineering, test solution options, and ensure the resulting experience solves the customer problem clearly and effectively.",
  "Outcome & Strategy Ownership": "Connect product work to organizational objectives, set meaningful success measures, make trade-offs, and own the outcomes created within the relevant scope.",
  "Vision, Roadmap & Portfolio": "Shape product direction, prioritize and coordinate roadmaps, and, at leadership levels, make coherent portfolio choices across teams and product lines.",
  "Technical & AI Direction": "Co-shape technical decisions with Engineering and apply AI with sound judgment to improve product discovery, decision quality, delivery, and ways of working.",
  "Stakeholder Influence": "Align internal and external stakeholders, communicate product decisions with clarity, and influence across team, group, and organizational boundaries.",
  "Coaching & People Leadership": "Develop product talent through mentoring and coaching and, where accountable, hiring, performance support, and leadership-bench development.",
  "Product Operating Model": "Improve product craft, working rhythms, standards, and operating models so teams can make better decisions and execute consistently at scale.",
  "Problem Framing & Requirements": "Turn validated problems into clear goals, requirements, success criteria, and prioritized backlog decisions that enable effective product work.",
  "Delivery & Quality": "Lead delivery with Design and Engineering, manage dependencies and risks, maintain product and process quality, and bring valuable work to market reliably.",
  "Measurement & Iteration": "Define and track KPIs, evaluate results, learn from releases and feedback, and adapt product decisions to improve outcomes."
};

export const categoryColors: Record<number, string> = {
  1: '#EAAA00', 2: '#EAAA00', 3: '#EAAA00', // Customer Insight - Yellow
  5: '#20BDBE', 6: '#20BDBE', 7: '#20BDBE', // Product Strategy - Cyan
  9: '#0077C8', 10: '#0077C8', 11: '#0077C8', // Influencing People - Blue
  13: '#F5821F', 14: '#F5821F', 15: '#F5821F', // Product Execution - Orange
};

export const pointLabelColors = [
  null, '#EAAA00', '#EAAA00', '#EAAA00', 
  null, '#20BDBE', '#20BDBE', '#20BDBE', 
  null, '#0077C8', '#0077C8', '#0077C8', 
  null, '#F5821F', '#F5821F', '#F5821F'
];

export const coreRoleExpectations: Record<string, number[]> = {
  "Junior Product Manager":       [1.0, 1.0, 1.0, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 1.0, 1.0, 1.0],
  "Product Manager":              [2.0, 2.0, 2.0, 1.5, 1.5, 1.5, 1.5, 1.0, 1.0, 2.0, 2.0, 2.0],
  "Senior Product Manager":       [3.0, 3.0, 2.5, 2.5, 2.5, 2.5, 2.5, 2.0, 2.0, 3.0, 3.0, 3.0],
  "Principal Product Manager":    [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.5, 3.0, 3.0, 3.0, 3.0],
  "Group Product Manager":        [3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 2.5, 3.0, 3.0],
  "Director Product":             [2.5, 2.5, 2.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 1.5, 2.5, 3.0]
};

export const LOCAL_STORAGE_KEY = 'pmSkillsAssessmentScoresV2';

export function transformScores(scores12: number[]): (number | null)[] {
  if (!scores12 || scores12.length !== 12) {
    return Array(16).fill(null);
  }
  return [
    null, scores12[0], scores12[1], scores12[2],
    null, scores12[3], scores12[4], scores12[5],
    null, scores12[6], scores12[7], scores12[8],
    null, scores12[9], scores12[10], scores12[11]
  ];
}

export function getRoleExpectations(): Record<string, (number | null)[]> {
  const roleExpectations: Record<string, (number | null)[]> = {};
  for (const roleName in coreRoleExpectations) {
    roleExpectations[roleName] = transformScores(coreRoleExpectations[roleName]);
  }
  return roleExpectations;
}

export function getSkillIndices(): number[] {
  return skillCategories.reduce<number[]>((indices, skill, index) => {
    if (skill !== "") {
      indices.push(index);
    }
    return indices;
  }, []);
}

export function getCategoryGroup(index: number): 'customer' | 'strategy' | 'people' | 'execution' | null {
  if ([1, 2, 3].includes(index)) return 'customer';
  if ([5, 6, 7].includes(index)) return 'strategy';
  if ([9, 10, 11].includes(index)) return 'people';
  if ([13, 14, 15].includes(index)) return 'execution';
  return null;
}
