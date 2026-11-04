import { useEffect, useState } from "react";
import { Facebook, Mail, MapPin, Phone } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

// The real business contact, as Christopher gave it. Everything else on this prototype (footer, contact
// page) still wears Lovable's sample details until version 03 replaces them; this modal is the one place
// a visitor can trust in the meantime.
const BUSINESS = {
  owner: "Jeffrey Wilson",
  name: "Wilson's Lawn Maintenance",
  phoneDisplay: "(717) 825-8432",
  phoneHref: "tel:+17178258432",
  email: "Wilsonj84321@gmail.com",
  address: "444 Pond Drive, Glen Rock PA 17327",
  facebook: "https://www.facebook.com/WilsonslawnmaintenancePA/",
};

// Remembered for the browser session only: the modal returns on the next visit, by design, until the site is live.
const STORAGE_KEY = "wilson-lawn:welcome-dismissed";

const readDismissed = () => {
  try {
    return window.sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
};

const writeDismissed = () => {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    // a private window or blocked storage: the modal simply shows again next time
  }
};

const WelcomeModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readDismissed()) setOpen(true);
  }, []);

  const dismiss = () => {
    writeDismissed();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : dismiss())}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>A work in progress</DialogTitle>
          <DialogDescription>
            This website is not live yet. It is a prototype being built for {BUSINESS.name}; the details on its
            pages are placeholders until the real site replaces them. To reach the business today, use the
            contact below.
          </DialogDescription>
        </DialogHeader>

        <address className="not-italic space-y-3 text-sm">
          <p className="font-semibold text-foreground">
            {BUSINESS.owner} · {BUSINESS.name}
          </p>
          <p className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <a href={BUSINESS.phoneHref} className="underline-offset-4 hover:underline">
              {BUSINESS.phoneDisplay}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <a href={`mailto:${BUSINESS.email}`} className="underline-offset-4 hover:underline">
              {BUSINESS.email}
            </a>
          </p>
          <p className="flex items-center gap-2">
            <MapPin className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <span>{BUSINESS.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <Facebook className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <a
              href={BUSINESS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="underline-offset-4 hover:underline"
            >
              Wilson's Lawn Maintenance on Facebook
            </a>
          </p>
        </address>

        <DialogFooter>
          <Button onClick={dismiss} className="w-full sm:w-auto">
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal;
