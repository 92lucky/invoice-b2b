import { processPayment } from "./process-payment";

export async function processWebhook(body: any) {
  const transactionStatus = body.transaction_status;
  const orderId = body.order_id;

  switch (transactionStatus) {
    case "settlement":
    case "capture":
      await processPayment(orderId, "paid");
      break;

    case "expire":
      await processPayment(orderId, "expired");
      break;

    case "cancel":
      await processPayment(orderId, "cancelled");
      break;
  }
}
