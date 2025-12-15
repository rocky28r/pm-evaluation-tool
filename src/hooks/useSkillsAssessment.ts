import { useState, useEffect, useCallback } from "react";
import {
  skillCategories,
  getRoleExpectations,
  LOCAL_STORAGE_KEY,
  getSkillIndices,
} from "@/lib/pm-skills-data";

export function useSkillsAssessment() {
  const roleExpectations = getRoleExpectations();
  const [selectedRole, setSelectedRole] = useState("Product Manager");
  const [scores, setScores] = useState<Record<number, string>>({});

  // Load from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roleFromUrl = params.get("role");
    let loadedFromUrl = false;

    if (roleFromUrl && roleExpectations[roleFromUrl]) {
      setSelectedRole(roleFromUrl);
      loadedFromUrl = true;
    }

    const newScores: Record<number, string> = {};
    skillCategories.forEach((skillName, index) => {
      if (skillName !== "") {
        const scoreKey = `s${index}`;
        if (params.has(scoreKey)) {
          newScores[index] = params.get(scoreKey) || "";
          loadedFromUrl = true;
        }
      }
    });

    if (loadedFromUrl) {
      if (Object.keys(newScores).length > 0) {
        setScores(newScores);
      }
      // Clear URL params after loading
      window.history.replaceState(null, "", window.location.pathname);
    } else {
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
    getOwnScoresForChart,
    getRoleScoresForChart,
    getRoleExpectation,
    skillIndices: getSkillIndices(),
  };
}
