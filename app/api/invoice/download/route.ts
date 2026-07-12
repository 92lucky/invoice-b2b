import { NextRequest } from "next/server";

import { generateInvoiceResponse } from "../_shared";

export async function POST(req: NextRequest) {
  return generateInvoiceResponse(req, "attachment");
}
