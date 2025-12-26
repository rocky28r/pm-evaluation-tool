import { useState } from "react";
import { Linkedin } from "lucide-react";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

export const LegalFooter = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto border-t bg-muted/30">
        <div className="container py-4 md:py-8">
          <div className="space-y-2 md:space-y-3 text-[11px] md:text-xs text-muted-foreground">
            <div className="flex items-center gap-2 md:gap-3 flex-wrap">
              <p>© 2026 Dean Ranzenberger. All rights reserved.</p>
              <a
                href="https://www.linkedin.com/in/dean-ranzenberger-960682194/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center hover:text-foreground transition-colors"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>

            <p>
              <span className="font-medium text-foreground/80">Imprint:</span>{" "}
              Dean Ranzenberger, Grünberger Str. 28, 10435 Berlin. Contact:{" "}
              <a
                href="mailto:contact@rockytec.net"
                className="underline hover:text-foreground transition-colors"
              >
                contact@rockytec.net
              </a>
              .
            </p>

            <p>
              <span className="font-medium text-foreground/80">Disclaimer:</span>{" "}
              This tool is for self-evaluation purposes only. The results are
              generated locally in your browser. The provider assumes no
              liability for the accuracy or applicability of the results.
            </p>

            <p>
              This tool is based on the{" "}
              <a
                href="https://www.ravi-mehta.com/product-manager-skills/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground transition-colors"
              >
                Product Manager Skills
              </a>{" "}
              framework by Ravi Mehta. This website is an independent project and
              is not affiliated with, endorsed by, or associated with Ravi Mehta.
            </p>

            <p>
              <button
                onClick={() => setPrivacyOpen(true)}
                className="underline hover:text-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                Privacy Policy
              </button>
            </p>
          </div>
        </div>
      </footer>

      <PrivacyPolicyModal open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </>
  );
};
