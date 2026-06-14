export const runtime = "nodejs";

import { parseLaporanLOExcel } from "@/lib/rekap/parser";
import { enrichLaporanLOData } from "@/lib/rekap/transform";
import { calculateLaporanLOTotals } from "@/lib/rekap/calculate";
import { generateLaporanLOPDF } from "@/lib/rekap/pdf";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 🔥 GATE SUBSCRIPTION (ADD THIS)
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
      return Response.json(
        { error: "Upgrade plan untuk akses fitur ini" },
        { status: 403 }
      );
    }

    const profile = await prisma.appProfile.findUnique({
      where: {
        userId: session.user.id,
      },
    });

    if (!profile) {
      return Response.json(
        {
          error: "Profile perusahaan belum disetting",
        },
        {
          status: 400,
        }
      );
    }

    const formData = await req.formData();

    const file = formData.get("file");
    const namaPT = profile.namaPT;
    const bulan = formData.get("bulan");

    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode") || "preview";

    if (!file) {
      return Response.json({ error: "File wajib diupload" }, { status: 400 });
    }

    const parsedData = await parseLaporanLOExcel(file);
    const reportData = enrichLaporanLOData(parsedData);
    const totals = calculateLaporanLOTotals(reportData);

    const pdfBuffer = generateLaporanLOPDF({
      data: reportData,
      totals,
      namaPT,
      bulan,
    });

    const fileName = `laporan-lo-${namaPT || "pt"}-${bulan || "report"}.pdf`;

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition":
          mode === "download"
            ? `attachment; filename="${fileName}"`
            : `inline; filename="${fileName}"`,
      },
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
