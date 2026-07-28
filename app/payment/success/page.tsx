import { Suspense } from "react";
import PaymentSuccessPage from "./PaymentSuccesClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentSuccessPage />
    </Suspense>
  );
}
