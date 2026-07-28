import { NextRequest } from "next/server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { generateInvoicePdf } from "@/lib/invoice/pdf";
import { getSubscriptionState } from "@/lib/payment/subscription/status";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return new Response("Unauthorized", {
        status: 401,
      });
    }

    const profile = await prisma.appProfile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return new Response("Profile belum di setup", {
        status: 400,
      });
    }

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

    const body = await req.json();

    const mode = body.mode === "download" ? "download" : "preview";

    const pdfBytes = await generateInvoicePdf({
      profile,
      quantity: body.quantity,
      date: body.date,
      invoiceNo: body.invoiceNo,
      periode: body.periode,
    });

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          mode === "download" ? 'attachment; filename="invoice.pdf"' : "inline",
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("Internal Server Error", {
      status: 500,
    });
  }
}
