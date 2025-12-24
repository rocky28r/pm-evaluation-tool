import { useState } from "react";
import { PrivacyPolicyModal } from "./PrivacyPolicyModal";

export const LegalFooter = () => {
  const [privacyOpen, setPrivacyOpen] = useState(false);

  return (
    <>
      <footer className="mt-auto border-t bg-muted/30">
        <div className="container py-6 md:py-8">
          <div className="space-y-3 text-xs text-muted-foreground">
            <p>© 2026 Dean Ranzenberger. All rights reserved.</p>

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
