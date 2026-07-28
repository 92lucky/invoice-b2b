export default function PaymentHistory({ payments }: { payments: any[] }) {
  const getStatusClass = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-500/15 text-green-400";

      case "pending":
        return "bg-yellow-500/15 text-yellow-400";

      default:
        return "bg-red-500/15 text-red-400";
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6">
      <h3 className="text-xl font-bold">Payment History</h3>

      <p className="mt-1 text-sm text-zinc-400">
        Riwayat transaksi & pembayaran.
      </p>

      {/* Mobile */}
      <div className="mt-6 space-y-4 md:hidden">
        {payments.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center text-zinc-500">
            No payment history.
          </div>
        ) : (
          payments.map((p) => (
            <div
              key={p.id}
              className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-zinc-500">Order ID</p>

                  <p className="mt-1 break-all font-mono text-xs">
                    {p.orderId}
                  </p>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Amount</span>

                  <span className="font-medium">
                    Rp {p.amount.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Status</span>

                  <span
                    className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-zinc-500">Date</span>

                  <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop */}
      <div className="mt-6 hidden overflow-x-auto md:block">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-zinc-800 text-left text-xs uppercase tracking-wide text-zinc-500">
              <th className="py-3">Order ID</th>

              <th className="py-3">Amount</th>

              <th className="py-3">Status</th>

              <th className="py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {payments.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-zinc-500">
                  No payment history.
                </td>
              </tr>
            ) : (
              payments.map((p) => (
                <tr key={p.id} className="border-b border-zinc-800/50">
                  <td className="py-4 pr-4 break-all font-mono text-sm">
                    {p.orderId}
                  </td>

                  <td className="py-4">Rp {p.amount.toLocaleString()}</td>

                  <td className="py-4">
                    <span
                      className={`rounded-full px-2 py-1 text-xs font-semibold ${getStatusClass(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>
                  </td>

                  <td className="py-4">
                    {new Date(p.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
