type Props = {
  sub: any;
  isActive: boolean;
};

export default function SubscriptionStatus({ sub, isActive }: Props) {
  return (
    <div
      style={{
        background: "#18181b",
        border: "1px solid #27272a",
        borderRadius: 24,
        padding: 24,
      }}
    >
      <p style={{ color: "#71717a", fontSize: 13 }}>SUBSCRIPTION STATUS</p>

      <h3
        style={{
          fontSize: 22,
          fontWeight: 700,
          marginTop: 10,
        }}
      >
        {isActive ? "Active Plan" : "Expired Plan"}
      </h3>

      <div
        style={{
          marginTop: 16,
          padding: 16,
          borderRadius: 16,
          background: "#0f0f12",
        }}
      >
        <p style={{ fontSize: 12, color: "#71717a" }}>STATUS</p>

        <strong
          style={{
            color: isActive ? "#4ade80" : "#f87171",
          }}
        >
          {isActive ? "ACTIVE" : "EXPIRED"}
        </strong>
      </div>

      <div
        style={{
          marginTop: 12,
          padding: 16,
          borderRadius: 16,
          background: "#0f0f12",
        }}
      >
        <p style={{ fontSize: 12, color: "#71717a" }}>EXPIRED DATE</p>

        <strong>
          {sub?.currentPeriodEnd
            ? new Date(sub.currentPeriodEnd).toLocaleDateString()
            : "-"}
        </strong>
      </div>
    </div>
  );
}
