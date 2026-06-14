import crypto from "crypto";

export function verifySignature(body: any) {
  const signatureKey = body.signature_key;

  const hash = crypto
    .createHash("sha512")
    .update(
      body.order_id +
        body.status_code +
        String(body.gross_amount) +
        process.env.MIDTRANS_SERVER_KEY
    )
    .digest("hex");

  return hash === signatureKey;
}
