import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  InfoIcon,
} from "lucide-react";

type CalloutType = "info" | "warning" | "success" | "error";

interface CalloutProps {
  type?: CalloutType;
  children: React.ReactNode;
}

const icons = {
  info: InfoIcon,
  warning: AlertTriangle,
  success: CheckCircle,
  error: AlertCircle,
};

const styles = {
  info: "bg-blue-50 border-blue-200 text-blue-800",
  warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
  success: "bg-green-50 border-green-200 text-green-800",
  error: "bg-red-50 border-red-200 text-red-800",
};

export function Callout({ type = "info", children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div
      className={`my-6 flex gap-3 rounded-md border-l-4 p-4 ${styles[type]}`}
    >
      <Icon className="mt-1 h-5 w-5 flex-shrink-0" />
      <div>{children}</div>
    </div>
  );
}
