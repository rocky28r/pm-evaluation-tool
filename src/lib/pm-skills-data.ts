export const skillCategories = [
  "", // 0 - Spacer 1
  "Fluency with Data", "Voice of the Customer", "User Experience Design", // 1, 2, 3
  "", // 4 - Spacer 2
  "Business Outcome Ownership", "Product Vision & Roadmapping", "Strategic Impact", // 5, 6, 7
  "", // 8 - Spacer 3
  "Stakeholder Management", "Team Leadership", "Managing Up", // 9, 10, 11
  "", // 12 - Spacer 4
  "Feature Specification", "Product Delivery", "Quality Assurance" // 13, 14, 15
];

export const skillDescriptions: Record<string, string> = {
  "Feature Specification": "PRODUCT EXECUTION: Feature Specification\nThe ability for a PM to gather requirements, define functionality, and set goals in a clear, actionable format that can be used to communicate with the team and drive product delivery.",
  "Product Delivery": "PRODUCT EXECUTION: Product Delivery\nThe ability to work closely with one's immediate team (engineering, design, etc.) to iteratively and quickly deliver product functionality that accomplishes pre-defined goals.",
  "Quality Assurance": "PRODUCT EXECUTION: Product Quality Assurance\nThe ability to identify, prioritize, and resolve technical, functional, and business quality issues across all devices, points of sale, and use cases that are applicable to the product.",
  "Fluency with Data": "CUSTOMER INSIGHT: Fluency with Data\nThe ability to use data to generate actionable insights, to leverage those insights to achieve goals set for the product, and to connect those quantified goals to meaningful outcomes for the business.",
  "Voice of the Customer": "CUSTOMER INSIGHT: Voice of the Customer\nThe ability to leverage user feedback in all its forms (from casual conversations to formal studies) to understand how users engage with the product, make better decisions, and drive meaningful outcomes for the business.",
  "User Experience Design": "CUSTOMER INSIGHT: User Experience Design\nThe ability, both as an individual and working with the design team, to define requirements and deliver UX designs that are easy to use, leverage UX best practices, and dovetail with the predominant UX patterns present in the product.",
  "Business Outcome Ownership": "PRODUCT STRATEGY: Business Outcome Ownership\nThe ability to drive meaningful outcomes for the business by connecting product functionality and goals to the strategic objectives of the PM's team and the company overall.",
  "Product Vision & Roadmapping": "PRODUCT STRATEGY: Product Vision & Roadmapping\nThe ability to define an overall vision for the PM's area of the product that connects to the strategy for the team and the company. The ability to define a clear roadmap of highly prioritized features and initiatives that deliver against that vision.",
  "Strategic Impact": "PRODUCT STRATEGY: Strategic Impact\nThe ability to understand and contribute to the business strategy for a PM's team and the company overall. The ability to bring strategy to fruition through the consistent delivery of business outcomes.",
  "Stakeholder Management": "INFLUENCING PEOPLE: Stakeholder Management\nThe ability to proactively identify stakeholders impacted by the PM's area of ownership and to work with those stakeholders to factor their requirements into product decisions.",
  "Team Leadership": "INFLUENCING PEOPLE: Team Leadership\nThe ability to manage and mentor direct reports with the goal of enabling them to successfully deliver on their product areas, continuously improve against these competencies, deliver meaningful business outcomes, and achieve their career objectives.",
  "Managing Up": "INFLUENCING PEOPLE: Managing Up\nThe ability to leverage senior managers and executives in the organization to help achieve goals, deliver meaningful business outcomes and positively influence the strategic direction of the PM's team and the company overall."
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
  "Jr Product Manager":           [1.5, 2.0, 1.5, 3.0, 0.5, 0.5, 1.0, 0.0, 0.5, 3.0, 1.0, 3.0],
  "Product Manager":              [2.5, 3.0, 2.0, 3.0, 1.0, 1.0, 1.5, 0.0, 1.0, 3.0, 3.0, 3.0],
  "Senior Product Manager":       [3.0, 3.0, 3.0, 3.0, 2.0, 1.0, 3.0, 0.5, 1.5, 3.0, 3.0, 3.0],
  "Principal Product Manager":    [3.0, 3.0, 3.0, 3.0, 2.5, 1.5, 2.0, 0.5, 1.0, 2.5, 2.5, 2.0],
  "Senior Principal Product Manager": [3.0, 3.0, 3.0, 3.0, 2.5, 2.5, 2.0, 0.5, 1.0, 1.5, 2.0, 0.5],
  "Associate Group Product Manager": [3.0, 3.0, 3.0, 3.0, 2.0, 1.0, 3.0, 1.0, 1.5, 3.0, 3.0, 3.0],
  "Group Product Manager":        [3.0, 3.0, 3.0, 3.0, 2.0, 1.5, 3.0, 2.0, 2.0, 2.5, 2.5, 2.0],
  "Product Director":             [3.0, 2.5, 2.0, 3.0, 2.5, 2.5, 3.0, 2.5, 2.5, 1.5, 2.0, 0.5],
  "VP Product":                   [3.0, 2.0, 1.0, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 0.5, 1.0, 0.5],
  "SVP Product":                  [3.0, 2.0, 0.5, 3.0, 3.0, 3.0, 3.0, 3.0, 3.0, 0.5, 0.5, 0.5]
};

export const LOCAL_STORAGE_KEY = 'pmSkillsAssessmentScores';

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
