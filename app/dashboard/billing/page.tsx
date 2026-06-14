import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import PricingCards from "@/components/billing/PricingCards";

export default async function BillingPage() {
  const session = await auth();

  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscription: true,
      payments: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  const sub = user?.subscription;
  const now = new Date();

  const isTrialActive = sub?.trialEnd && now < new Date(sub.trialEnd);

  const isPaidActive =
    sub?.currentPeriodEnd && now < new Date(sub.currentPeriodEnd);

  const isActive = !!sub && (isTrialActive || isPaidActive);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        padding: "32px",
        color: "white",
      }}
    >
      {/* HEADER */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginBottom: 8,
            letterSpacing: "-1px",
          }}
        >
          Billing & Subscription
        </h1>

        <p style={{ color: "#a1a1aa", fontSize: 15 }}>transaksi pembayaran.</p>
      </div>

      {/* HERO */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 30,
          padding: 40,
          marginBottom: 28,
          background:
            "linear-gradient(135deg, #18181b 0%, #27272a 45%, #111827 100%)",
          border: "1px solid #27272a",
        }}
      >
        {/* BG */}
        <img
          src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1600&auto=format&fit=crop"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.08,
          }}
        />

        {/* GLOW */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 320,
            height: 320,
            borderRadius: "50%",
            background: "#10b981",
            filter: "blur(120px)",
            opacity: 0.15,
          }}
        />

        <div style={{ position: "relative", zIndex: 2 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            {/* LEFT */}
            <div style={{ maxWidth: 620 }}>
              <div
                style={{
                  display: "inline-flex",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,0.08)",
                  fontSize: 13,
                  color: "#d4d4d8",
                  marginBottom: 18,
                }}
              >
                ✨ Premium Access
              </div>

              <h2
                style={{
                  fontSize: 42,
                  fontWeight: 800,
                  marginBottom: 14,
                  lineHeight: 1.1,
                }}
              >
                Upgrade your workflow experience
              </h2>

              <p style={{ color: "#d4d4d8", fontSize: 16, lineHeight: 1.7 }}>
                Unlock invoice export, Rekap LO processing, premium tools,
                future AI workflow, and better business management.
              </p>
            </div>

            {/* RIGHT (FIXED COMPONENT) */}
            <PricingCards />
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "320px 1fr",
          gap: 22,
        }}
      >
        {/* STATUS */}
        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 24,
            padding: 24,
          }}
        >
          <p style={{ color: "#71717a", fontSize: 13 }}>SUBSCRIPTION STATUS</p>

          <h3 style={{ fontSize: 22, fontWeight: 700, marginTop: 10 }}>
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

        {/* PAYMENT HISTORY */}
        <div
          style={{
            background: "#18181b",
            border: "1px solid #27272a",
            borderRadius: 24,
            padding: 24,
          }}
        >
          <h3 style={{ fontSize: 22, fontWeight: 700 }}>Payment History</h3>

          <p style={{ color: "#71717a", fontSize: 14 }}>
            Recent payment activity and transaction records.
          </p>

          <div style={{ overflowX: "auto", marginTop: 20 }}>
            <table style={{ width: "100%" }}>
              <thead>
                <tr style={{ background: "#0f0f12" }}>
                  <th style={thStyle}>Order ID</th>
                  <th style={thStyle}>Jumlah</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Date</th>
                </tr>
              </thead>

              <tbody>
                {user?.payments?.map((p) => (
                  <tr key={p.id}>
                    <td style={tdStyle}>{p.orderId}</td>
                    <td style={tdStyle}>Rp {p.amount.toLocaleString()}</td>
                    <td style={tdStyle}>{p.status}</td>
                    <td style={tdStyle}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

const thStyle = {
  textAlign: "left" as const,
  padding: "16px",
  fontSize: 12,
  color: "#71717a",
};

const tdStyle = {
  padding: "14px 16px",
  fontSize: 14,
  color: "#f4f4f5",
};
