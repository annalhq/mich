"use client";

import { forwardRef } from "react";

import { cva } from "class-variance-authority";
import { AlertCircle, AlertTriangle, CheckCircle, Info } from "lucide-react";

import { cn } from "@/lib/utils";

type CalloutType = "info" | "warn" | "error" | "success";

interface CalloutProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  type?: CalloutType;
  title?: React.ReactNode;
  icon?: React.ReactNode;
}

const icons = {
  info: <Info />,
  warn: <AlertTriangle />,
  error: <AlertCircle />,
  success: <CheckCircle />,
};

export const Callout = forwardRef<HTMLDivElement, CalloutProps>(
  ({ type = "info", children, title, icon, className, ...props }, ref) => {
    // Move calloutVariants inside the component function
    const calloutVariants = cva(
      "my-6 flex flex-row gap-2 rounded-lg border border-s-2 bg-fd-card p-3 text-sm text-fd-card-foreground shadow-md",
      {
        variants: {
          type: {
            info: "border-s-blue-500/50",
            warn: "border-s-orange-500/50",
            error: "border-s-red-500/50",
            success: "border-s-green-500/50",
          },
        },
      }
    );

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ type }), className)}
        {...props}
      >
        {icon ?? icons[type]}
        <div className="min-w-0 flex-1">
          {title && <p className="not-prose mb-2 font-medium">{title}</p>}
          <div className="text-fd-muted-foreground prose-no-margin">
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
