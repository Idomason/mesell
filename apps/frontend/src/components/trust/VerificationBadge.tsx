import { Shield, CheckCircle, Camera } from "lucide-react";

interface VerificationBadgeProps {
  type: "bvn" | "quality" | "id";
  size?: "sm" | "md" | "lg";
}

const config = {
  bvn: {
    icon: Shield,
    text: "BVN Verified",
    color: "bg-green-100 text-green-800",
  },
  quality: {
    icon: CheckCircle,
    text: "Quality Certified",
    color: "bg-blue-100 text-blue-800",
  },
  id: {
    icon: Camera,
    text: "ID Verified",
    color: "bg-purple-100 text-purple-800",
  },
};

export default function VerificationBadge({
  type,
  size = "md",
}: VerificationBadgeProps) {
  const icon =
    type === "bvn" ? (
      <Shield className="h-4 w-4" />
    ) : type === "quality" ? (
      <CheckCircle className="h-4 w-4" />
    ) : (
      <Camera className="h-4 w-4" />
    );

  const { icon: Icon, text, color } = config[type];
  const sizeClasses = {
    sm: "text-xs px-2 py-1",
    md: "text-sm px-3 py-1.5",
    lg: "text-base px-4 py-2",
  };
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full ${sizeClasses[size]} ${color}`}
    >
      <Icon className={size === "sm" ? "w-3 h-3" : "w-4 h-4"} />
      <span className="text-xs font-medium">{text}</span>
    </div>
  );
}
