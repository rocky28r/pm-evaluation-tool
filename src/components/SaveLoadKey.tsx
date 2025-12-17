import { useState } from "react";
import { Key, Copy, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { skillCategories } from "@/lib/pm-skills-data";

interface SaveLoadKeyProps {
  selectedRole: string;
  scores: Record<number, string>;
  onLoadKey: (role: string, scores: Record<number, string>) => void;
}

// Encode state to base64 key
function encodeState(role: string, scores: Record<number, string>): string {
  const data: Record<string, string> = { role };
  
  skillCategories.forEach((skillName, index) => {
    if (skillName !== "" && scores[index] && scores[index] !== "") {
      data[`s${index}`] = scores[index];
    }
  });
  
  const json = JSON.stringify(data);
  return btoa(json);
}

// Decode base64 key to state
function decodeState(key: string): { role: string; scores: Record<number, string> } | null {
  try {
    const json = atob(key.trim());
    const data = JSON.parse(json);
    
    const role = data.role || "PM";
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

export function SaveLoadKey({ selectedRole, scores, onLoadKey }: SaveLoadKeyProps) {
  const [copied, setCopied] = useState(false);
  const [loadKeyInput, setLoadKeyInput] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const currentKey = encodeState(selectedRole, scores);

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(currentKey);
      setCopied(true);
      toast.success("Save key copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy key. Please try again.");
    }
  };

  const handleLoadKey = () => {
    const result = decodeState(loadKeyInput);
    if (result) {
      onLoadKey(result.role, result.scores);
      setLoadKeyInput("");
      setDialogOpen(false);
      toast.success("Assessment loaded successfully!");
    } else {
      toast.error("Invalid save key. Please check and try again.");
    }
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Key className="w-4 h-4" />
          Save/Load/Share State
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save & Load Assessment</DialogTitle>
          <DialogDescription>
            Copy your save key to store locally, or paste a key to restore a previous assessment.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          {/* Save Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Save Key</label>
            <div className="flex gap-2">
              <Input
                readOnly
                value={currentKey}
                className="font-mono text-xs"
              />
              <Button onClick={handleCopyKey} size="icon" variant="secondary">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Load Section */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Load from Key</label>
            <div className="flex gap-2">
              <Input
                placeholder="Paste your save key here..."
                value={loadKeyInput}
                onChange={(e) => setLoadKeyInput(e.target.value)}
                className="font-mono text-xs"
              />
              <Button 
                onClick={handleLoadKey} 
                size="icon"
                disabled={!loadKeyInput.trim()}
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
