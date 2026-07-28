import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { getSubscriptionState } from "@/lib/payment/subscription/status";

export async function generateInvoiceResponse(
  req: NextRequest,
  disposition: "inline" | "attachment"
) {
  const session = await auth();

  if (!session?.user) {
    return new Response("Unauthorized", {
      status: 401,
    });
  }

  const profile = await prisma.appProfile.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  const subscription = await prisma.subscription.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  const { active } = getSubscriptionState(subscription);

  if (!active) {
    return new Response("Subscription expired", {
      status: 403,
    });
  }

  if (!profile) {
    return new Response("Profile belum di setup", {
      status: 400,
    });
  }

  const body = await req.json();

  const pdfBytes = await generateInvoicePdf({
    profile,
    ...body,
  });

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        disposition === "inline"
          ? "inline"
          : 'attachment; filename="invoice.pdf"',
    },
  });
}
