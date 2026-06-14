import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return new Response("Unauthorized", { status: 401 });
    }

    const body = await req.json();

    const profile = await prisma.appProfile.upsert({
      where: { userId: session.user.id },
      update: {
        namaPT: body.namaPT,
        namaBank: body.namaBank,
        noRekening: body.noRekening,
        penanggungJawab: body.penanggungJawab,
        alamat: body.alamat,
        kabupaten: body.kabupaten,
      },
      create: {
        userId: session.user.id,
        namaPT: body.namaPT,
        namaBank: body.namaBank,
        noRekening: body.noRekening,
        penanggungJawab: body.penanggungJawab,
        alamat: body.alamat,
        kabupaten: body.kabupaten,
      },
    });

    return Response.json(profile);
  } catch (error) {
    console.error(error);
    return new Response("Error saving profile", { status: 500 });
  }
}
