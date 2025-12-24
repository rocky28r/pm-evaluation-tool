import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PrivacyPolicyModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PrivacyPolicyModal = ({
  open,
  onOpenChange,
}: PrivacyPolicyModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Privacy Policy & Data Protection
          </DialogTitle>
          <DialogDescription className="sr-only">
            Legal information about data protection and privacy
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6 text-sm text-muted-foreground">
            <section>
              <h3 className="font-semibold text-foreground mb-2">
                1. General Information
              </h3>
              <p>
                We take the protection of your personal data very seriously. We
                treat your personal data confidentially and in accordance with
                the statutory data protection regulations (GDPR) and this
                privacy policy.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">
                2. Responsible Party
              </h3>
              <p>
                Dean Ranzenberger
                <br />
                Grünberger Str. 28, 10435 Berlin
                <br />
                Germany
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">
                3. Hosting & Server Log Files
              </h3>
              <p>
                This website is hosted by an external service provider. Personal
                data collected on this website (e.g., IP addresses in server log
                files) are stored on the hoster's servers. This is necessary for
                the technical operation and security of the website (Art. 6 (1)
                (f) GDPR). We do not analyze this data for marketing purposes.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">
                4. Client-Side Application (No Database)
              </h3>
              <p className="mb-2">
                This application ("PM Evaluation") operates as a static,
                client-side application.
              </p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>
                  <strong>No Database:</strong> We do not store your assessment
                  answers, role selection, or evaluation results in any central
                  database or server.
                </li>
                <li>
                  <strong>Local Processing:</strong> All calculations are
                  performed directly in your browser.
                </li>
                <li>
                  <strong>URL Parameters & Local Storage:</strong> To preserve
                  your state (e.g., if you refresh the page), the application
                  encodes your inputs into the URL (the <code>?state=</code>{" "}
                  parameter) or uses your browser's Local Storage. This data
                  remains on your device and is not transmitted to us for
                  analysis.
                </li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">
                5. No Tracking
              </h3>
              <p>
                We do not use tracking cookies, analytics tools (like Google
                Analytics), or social media pixels.
              </p>
            </section>

            <section>
              <h3 className="font-semibold text-foreground mb-2">
                6. Your Rights
              </h3>
              <p>
                Since we do not store your personal data, we generally cannot
                "delete" it as we do not possess it. However, you have the right
                to complain to the competent supervisory authority if you
                believe there has been a breach of data protection law.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
