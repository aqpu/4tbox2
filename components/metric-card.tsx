type MetricCardProps = {
  label: string;
  value: string | number;
  tone?: "default" | "blue" | "green" | "purple";
  small?: boolean;
};

export function MetricCard({
  label,
  value,
  tone = "default",
  small,
}: MetricCardProps) {
  const base = "px-3 py-2 rounded-md";
  const tones: Record<string, string> = {
    default: "bg-gray-100",
    blue: "bg-blue-50 border border-blue-100 text-blue-900",
    green: "bg-green-50 border border-green-100 text-green-900",
    purple: "bg-purple-50 border border-purple-100 text-purple-900",
  };

  const textTone: Record<string, string> = {
    default: "text-gray-500",
    blue: "text-blue-700",
    green: "text-green-700",
    purple: "text-purple-700",
  };

  return (
    <div className={`${base} ${tones[tone]}`}>
      <div className={`text-xs ${textTone[tone]}`}>{label}</div>
      <div className={`${small ? "text-base" : "text-lg"} font-semibold`}>
        {typeof value === "number" ? value : value}
      </div>
    </div>
  );
}
