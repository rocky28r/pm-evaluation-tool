import { useState } from "react";
import { Loader2, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import { toast } from "@/hooks/use-toast";
import { skillCategories } from "@/lib/pm-skills-data";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  selectedRole: string;
  ownScores: (number | null)[];
  roleScores: (number | null)[];
}

interface GapData {
  skill: string;
  ownScore: number;
  expectedScore: number;
  gap: number;
  category: string;
}

export function ExportButton({ targetRef, selectedRole, ownScores, roleScores }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const getCategoryName = (index: number): string => {
    if ([1, 2, 3].includes(index)) return "Customer Insight";
    if ([5, 6, 7].includes(index)) return "Product Strategy";
    if ([9, 10, 11].includes(index)) return "Influencing People";
    if ([13, 14, 15].includes(index)) return "Product Execution";
    return "";
  };

  const getCategoryColor = (category: string): { r: number; g: number; b: number } => {
    switch (category) {
      case "Customer Insight": return { r: 234, g: 170, b: 0 };
      case "Product Strategy": return { r: 32, g: 189, b: 190 };
      case "Influencing People": return { r: 0, g: 119, b: 200 };
      case "Product Execution": return { r: 245, g: 130, b: 31 };
      default: return { r: 100, g: 100, b: 100 };
    }
  };

  const handleExportPDF = async () => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;
      
      // Header
      pdf.setFillColor(30, 41, 59);
      pdf.rect(0, 0, pageWidth, 28, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("PM Skills Assessment", margin, 16);
      
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(selectedRole, margin, 23);
      
      const date = new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
      pdf.setFontSize(10);
      pdf.text(date, pageWidth - margin - pdf.getTextWidth(date), 16);
      
      // Calculate gaps
      const gaps: GapData[] = [];
      const skillIndices = [1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15];
      
      skillIndices.forEach((idx) => {
        const own = ownScores[idx];
        const expected = roleScores[idx];
        if (own !== null && expected !== null) {
          gaps.push({
            skill: skillCategories[idx],
            ownScore: own,
            expectedScore: expected,
            gap: own - expected,
            category: getCategoryName(idx)
          });
        }
      });
      
      // Skills Table
      let yPos = 38;
      
      pdf.setTextColor(30, 41, 59);
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text("Skills Overview", margin, yPos);
      yPos += 7;
      
      // Table header
      const colWidths = [65, 45, 40, 40, 35];
      const tableX = margin;
      
      pdf.setFillColor(241, 245, 249);
      pdf.rect(tableX, yPos, contentWidth, 7, 'F');
      
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(71, 85, 105);
      
      let xPos = tableX + 3;
      pdf.text("Skill", xPos, yPos + 5);
      xPos += colWidths[0];
      pdf.text("Category", xPos, yPos + 5);
      xPos += colWidths[1];
      pdf.text("Your Score", xPos, yPos + 5);
      xPos += colWidths[2];
      pdf.text("Expected", xPos, yPos + 5);
      xPos += colWidths[3];
      pdf.text("Gap", xPos, yPos + 5);
      
      yPos += 7;
      
      // Table rows
      const categories = ["Customer Insight", "Product Strategy", "Influencing People", "Product Execution"];
      let rowIndex = 0;
      
      categories.forEach((category) => {
        const categoryGaps = gaps.filter(g => g.category === category);
        const color = getCategoryColor(category);
        
        categoryGaps.forEach((item) => {
          if (rowIndex % 2 === 0) {
            pdf.setFillColor(249, 250, 251);
            pdf.rect(tableX, yPos, contentWidth, 6, 'F');
          }
          
          // Category color bar
          pdf.setFillColor(color.r, color.g, color.b);
          pdf.rect(tableX, yPos, 2, 6, 'F');
          
          pdf.setFontSize(8);
          pdf.setTextColor(30, 41, 59);
          
          xPos = tableX + 5;
          pdf.text(item.skill, xPos, yPos + 4);
          xPos += colWidths[0] - 2;
          
          pdf.setTextColor(color.r, color.g, color.b);
          pdf.setFont("helvetica", "bold");
          pdf.text(category, xPos, yPos + 4);
          xPos += colWidths[1];
          
          pdf.setFont("helvetica", "normal");
          pdf.setTextColor(30, 41, 59);
          pdf.text(item.ownScore.toFixed(1), xPos, yPos + 4);
          xPos += colWidths[2];
          pdf.text(item.expectedScore.toFixed(1), xPos, yPos + 4);
          xPos += colWidths[3];
          
          // Gap with color
          if (item.gap >= 0) {
            pdf.setTextColor(34, 197, 94);
            pdf.text(`+${item.gap.toFixed(1)}`, xPos, yPos + 4);
          } else {
            pdf.setTextColor(239, 68, 68);
            pdf.text(item.gap.toFixed(1), xPos, yPos + 4);
          }
          
          yPos += 6;
          rowIndex++;
        });
      });
      
      // Gap Analysis Summary
      yPos += 10;
      pdf.setTextColor(30, 41, 59);
      pdf.setFontSize(13);
      pdf.setFont("helvetica", "bold");
      pdf.text("Gap Analysis", margin, yPos);
      yPos += 8;
      
      const strengths = gaps.filter(g => g.gap >= 0.5).sort((a, b) => b.gap - a.gap);
      const improvements = gaps.filter(g => g.gap < -0.5).sort((a, b) => a.gap - b.gap);
      
      const boxWidth = (contentWidth - 10) / 2;
      const boxHeight = 45;
      
      // Strengths box
      pdf.setFillColor(240, 253, 244);
      pdf.roundedRect(margin, yPos, boxWidth, boxHeight, 2, 2, 'F');
      pdf.setDrawColor(34, 197, 94);
      pdf.roundedRect(margin, yPos, boxWidth, boxHeight, 2, 2, 'S');
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(22, 163, 74);
      pdf.text("Strengths", margin + 4, yPos + 7);
      
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(30, 41, 59);
      
      let listY = yPos + 14;
      if (strengths.length === 0) {
        pdf.text("Complete your assessment to see strengths.", margin + 4, listY);
      } else {
        strengths.slice(0, 5).forEach((s) => {
          const color = getCategoryColor(s.category);
          pdf.setFillColor(color.r, color.g, color.b);
          pdf.circle(margin + 6, listY - 1, 1.5, 'F');
          pdf.text(`${s.skill} (+${s.gap.toFixed(1)})`, margin + 10, listY);
          listY += 6;
        });
      }
      
      // Improvements box
      const improvX = margin + boxWidth + 10;
      pdf.setFillColor(254, 242, 242);
      pdf.roundedRect(improvX, yPos, boxWidth, boxHeight, 2, 2, 'F');
      pdf.setDrawColor(239, 68, 68);
      pdf.roundedRect(improvX, yPos, boxWidth, boxHeight, 2, 2, 'S');
      
      pdf.setFontSize(10);
      pdf.setFont("helvetica", "bold");
      pdf.setTextColor(220, 38, 38);
      pdf.text("Areas for Improvement", improvX + 4, yPos + 7);
      
      pdf.setFontSize(8);
      pdf.setFont("helvetica", "normal");
      pdf.setTextColor(30, 41, 59);
      
      listY = yPos + 14;
      if (improvements.length === 0) {
        pdf.text("No significant gaps identified.", improvX + 4, listY);
      } else {
        improvements.slice(0, 5).forEach((s) => {
          const color = getCategoryColor(s.category);
          pdf.setFillColor(color.r, color.g, color.b);
          pdf.circle(improvX + 6, listY - 1, 1.5, 'F');
          pdf.text(`${s.skill} (${s.gap.toFixed(1)})`, improvX + 10, listY);
          listY += 6;
        });
      }
      
      // Footer on page 1
      pdf.setFontSize(7);
      pdf.setTextColor(148, 163, 184);
      pdf.text(
        "Generated by PM Skills Assessment Tool • For self-evaluation purposes only",
        pageWidth / 2,
        pageHeight - 6,
        { align: "center" }
      );
      
      // Page 2 - Radar Chart
      pdf.addPage();
      
      // Header for page 2
      pdf.setFillColor(30, 41, 59);
      pdf.rect(0, 0, pageWidth, 28, 'F');
      
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(20);
      pdf.setFont("helvetica", "bold");
      pdf.text("Skills Radar Chart", margin, 16);
      
      pdf.setFontSize(12);
      pdf.setFont("helvetica", "normal");
      pdf.text(selectedRole, margin, 23);
      
      pdf.setFontSize(10);
      pdf.text(date, pageWidth - margin - pdf.getTextWidth(date), 16);
      
      // Capture and add chart
      const chartCanvas = targetRef.current?.querySelector('canvas');
      if (chartCanvas) {
        // Create a temporary canvas with white background for JPEG conversion
        const originalCanvas = chartCanvas as HTMLCanvasElement;
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = originalCanvas.width;
        tempCanvas.height = originalCanvas.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (tempCtx) {
          // Fill with white background
          tempCtx.fillStyle = '#ffffff';
          tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

          // Draw the original chart on top
          tempCtx.drawImage(originalCanvas, 0, 0);
        }

        const chartImage = tempCanvas.toDataURL('image/jpeg', 0.8);

        // Center the chart on the page
        const chartSize = Math.min(pageHeight - 60, pageWidth - 40);
        const chartX = (pageWidth - chartSize) / 2;
        const chartY = 38;

        pdf.addImage(chartImage, 'JPEG', chartX, chartY, chartSize, chartSize);
      }
      
      // Legend
      const legendY = pageHeight - 25;
      pdf.setFontSize(9);
      pdf.setFont("helvetica", "bold");
      
      // Own Assessment legend
      pdf.setFillColor(54, 162, 235);
      pdf.circle(margin + 5, legendY, 3, 'F');
      pdf.setTextColor(30, 41, 59);
      pdf.text("Your Assessment", margin + 12, legendY + 1);
      
      // Role Expectation legend
      pdf.setFillColor(255, 99, 132);
      pdf.circle(margin + 80, legendY, 3, 'F');
      pdf.text(`${selectedRole} Expectation`, margin + 87, legendY + 1);
      
      // Footer on page 2
      pdf.setFontSize(7);
      pdf.setTextColor(148, 163, 184);
      pdf.setFont("helvetica", "normal");
      pdf.text(
        "Generated by PM Skills Assessment Tool • For self-evaluation purposes only",
        pageWidth / 2,
        pageHeight - 6,
        { align: "center" }
      );

      const fileName = `PM_Skills_Assessment_${selectedRole.replace(/\s+/g, '_')}.pdf`;
      pdf.save(fileName);
      
      toast({
        title: "PDF exported",
        description: "Your assessment has been saved.",
      });
    } catch (error) {
      console.error('PDF export failed:', error);
      toast({
        title: "Export failed",
        description: "Unable to generate the PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button 
      variant="outline"
      size="sm"
      disabled={isExporting}
      className="gap-2 px-2 sm:px-3"
      onClick={handleExportPDF}
    >
      {isExporting ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <FileDown className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">Export PDF</span>
    </Button>
  );
}