import { useState, useEffect, useCallback } from "react";
import {
  skillCategories,
  getRoleExpectations,
  LOCAL_STORAGE_KEY,
  getSkillIndices,
} from "@/lib/pm-skills-data";

// Encode state to base64
function encodeStateToBase64(role: string, scores: Record<number, string>): string {
  const data: Record<string, string> = { role };
  skillCategories.forEach((skillName, index) => {
    if (skillName !== "" && scores[index] && scores[index] !== "") {
      data[`s${index}`] = scores[index];
    }
  });
  return btoa(JSON.stringify(data));
}

// Decode base64 to state
function decodeBase64ToState(encoded: string): { role: string; scores: Record<number, string> } | null {
  try {
    const json = atob(encoded.trim());
    const data = JSON.parse(json);
    const role = data.role || "Product Manager";
    const scores: Record<number, string> = {};
    Object.keys(data).forEach((k) => {
      if (k.startsWith("s")) {
        const index = parseInt(k.substring(1), 10);
        if (!isNaN(index)) {
          scores[index] = data[k];
        }
      }
    });
    return { role, scores };
  } catch {
    return null;
  }
}

export function useSkillsAssessment() {
  const roleExpectations = getRoleExpectations();
  const [selectedRole, setSelectedRole] = useState("Product Manager");
  const [scores, setScores] = useState<Record<number, string>>({});

  // Load from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get("state");
    let loadedFromUrl = false;

    if (stateParam) {
      const decoded = decodeBase64ToState(stateParam);
      if (decoded) {
        if (decoded.role && roleExpectations[decoded.role]) {
          setSelectedRole(decoded.role);
        }
        if (Object.keys(decoded.scores).length > 0) {
          setScores(decoded.scores);
        }
        loadedFromUrl = true;
      }
    }

    if (!loadedFromUrl) {
      // Try loading from localStorage
      try {
        const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (savedData) {
          const loadedScores = JSON.parse(savedData);
          setScores(loadedScores);
        }
      } catch (e) {
        console.error("Error loading scores from localStorage:", e);
      }
    }
  }, []);

  // Sync state to URL whenever role or scores change
  useEffect(() => {
    const encoded = encodeStateToBase64(selectedRole, scores);
    const newUrl = `${window.location.pathname}?state=${encoded}`;
    window.history.replaceState(null, "", newUrl);
  }, [selectedRole, scores]);

  // Save to localStorage when scores change
  useEffect(() => {
    if (Object.keys(scores).length > 0) {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(scores));
      } catch (e) {
        console.error("Error saving scores:", e);
      }
    }
  }, [scores]);

  const updateScore = useCallback((index: number, value: string) => {
    setScores((prev) => ({
      ...prev,
      [index]: value,
    }));
  }, []);

  const loadState = useCallback((role: string, newScores: Record<number, string>) => {
    setSelectedRole(role);
    setScores(newScores);
  }, []);

  const getOwnScoresForChart = useCallback((): (number | null)[] => {
    return skillCategories.map((skillName, index) => {
      if (skillName === "") return null;
      const rawValue = scores[index];
      if (!rawValue || rawValue === "") return null;
      const value = parseFloat(rawValue);
      if (isNaN(value)) return null;
      return Math.max(0, Math.min(3, value));
    });
  }, [scores]);

  const getRoleScoresForChart = useCallback((): (number | null)[] => {
    return roleExpectations[selectedRole] || Array(16).fill(null);
  }, [selectedRole, roleExpectations]);

  const getRoleExpectation = useCallback(
    (index: number): number | null => {
      const expectations = roleExpectations[selectedRole];
      if (!expectations) return null;
      return expectations[index];
    },
    [selectedRole, roleExpectations]
  );

  return {
    selectedRole,
    setSelectedRole,
    scores,
    updateScore,
    loadState,
    getOwnScoresForChart,
    getRoleScoresForChart,
    getRoleExpectation,
    skillIndices: getSkillIndices(),
  };
}
