export default function PlanBadge({ label }: { label: string }) {
  const color =
    label === "PREMIUM"
      ? "green"
      : label === "TRIAL"
      ? "blue"
      : label === "EXPIRED"
      ? "red"
      : "gray";

  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: "999px",
        background: color,
        color: "white",
        fontSize: "12px",
      }}
    >
      {label}
    </span>
  );
}
