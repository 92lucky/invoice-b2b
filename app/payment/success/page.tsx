import { Suspense } from "react";
import PaymentSuccessPage from "./payment-succes-client";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
