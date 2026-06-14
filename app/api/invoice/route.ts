import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

import { NextRequest } from "next/server";
import { generateInvoicePdf } from "@/lib/invoice/pdf.js";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user) {
      return new Response("Unauthorized", { status: 401 });
    }

    const profile = await prisma.appProfile.findFirst({
      where: {
        userId: session.user.id,
      },
    });

    const subscription = await prisma.subscription.findUnique({
      where: { userId: session.user.id },
    });

    const now = new Date();

    const isExpired =
      !subscription ||
      subscription.status !== "active" ||
      (subscription.currentPeriodEnd &&
        new Date(subscription.currentPeriodEnd) < now);

    if (isExpired) {
      return new Response("Subscription expired", { status: 403 });
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
        "Content-Disposition": "attachment; filename=invoice.pdf",
      },
    });
  } catch (err) {
    console.error(err);

    return new Response("ERROR", { status: 500 });
  }
}
