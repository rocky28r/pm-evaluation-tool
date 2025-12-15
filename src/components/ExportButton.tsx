import { useState, useRef } from "react";
import { Download, FileImage, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import { toast } from "@/hooks/use-toast";

interface ExportButtonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  selectedRole: string;
}

export function ExportButton({ targetRef, selectedRole }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPNG = async () => {
    if (!targetRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `pm-skills-assessment-${selectedRole.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Export successful",
        description: "Your assessment has been saved as an image.",
      });
    } catch (error) {
      console.error('Export failed:', error);
      toast({
        title: "Export failed",
        description: "Unable to generate the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    if (!targetRef.current) return;
    
    setIsExporting(true);
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      // Create a simple PDF using the canvas
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Create a new window with the image for printing as PDF
      const printWindow = window.open('', '_blank');
      if (printWindow) {
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>PM Skills Assessment - ${selectedRole}</title>
              <style>
                @page { size: A4 landscape; margin: 10mm; }
                body { margin: 0; display: flex; justify-content: center; align-items: flex-start; padding: 20px; }
                img { max-width: 100%; height: auto; }
              </style>
            </head>
            <body>
              <img src="${imgData}" />
            </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.onload = () => {
          printWindow.print();
        };
      }
      
      toast({
        title: "PDF ready",
        description: "Use your browser's print dialog to save as PDF.",
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          disabled={isExporting}
          className="gap-2"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleExportPNG} className="gap-2 cursor-pointer">
          <FileImage className="w-4 h-4" />
          Save as PNG
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportPDF} className="gap-2 cursor-pointer">
          <Download className="w-4 h-4" />
          Save as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
