"use client";

export default function PlanGuard({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) {
  if (!active) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        Feature locked. Please upgrade plan.
      </div>
    );
  }

  return <>{children}</>;
}
