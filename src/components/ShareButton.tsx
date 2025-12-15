import { useState } from "react";
import { Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { skillCategories } from "@/lib/pm-skills-data";

interface ShareButtonProps {
  selectedRole: string;
  scores: Record<number, string>;
}

export function ShareButton({ selectedRole, scores }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const baseUrl = window.location.origin + window.location.pathname;
    const params = new URLSearchParams();

    params.set("role", selectedRole);

    skillCategories.forEach((skillName, index) => {
      if (skillName !== "" && scores[index] && scores[index] !== "") {
        params.set(`s${index}`, scores[index]);
      }
    });

    const shareUrl = `${baseUrl}?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy link. Please try again.");
    }
  };

  return (
    <Button
      onClick={handleCopyLink}
      className="fixed bottom-6 right-6 shadow-lg z-50 gap-2"
      size="lg"
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          Copied!
        </>
      ) : (
        <>
          <Link className="w-4 h-4" />
          Copy Shareable Link
        </>
      )}
    </Button>
  );
}
