"use client";

import { UserButton } from "@daveyplate/better-auth-ui";
import { useEffect, useState } from "react";
import { User, Settings } from "lucide-react";

interface UserButtonClientProps {
  variant?: "outline" | "default" | "ghost" | "link" | "secondary" | "destructive" | null;
  className?: string;
  disableDefaultLinks?: boolean;
}

export default function UserButtonClient({
  variant = "outline",
  className,
  disableDefaultLinks = true,
}: UserButtonClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR to avoid hydration mismatch on IDs
    return (
      <div className={className}>
        <div className="h-10 w-full animate-pulse rounded-md bg-muted/50" />
      </div>
    );
  }

  return (
    <UserButton
      variant={variant}
      className={className}
      disableDefaultLinks={disableDefaultLinks}
      additionalLinks={[
        {
          label: "Customer Portal",
          href: "/dashboard/customer-portal",
          icon: <User className="h-4 w-4" />,
        },
        {
          label: "Settings",
          href: "/dashboard/settings",
          icon: <Settings className="h-4 w-4" />,
        },
      ]}
    />
  );
}
