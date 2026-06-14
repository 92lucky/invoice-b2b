import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ProfileForm from "./ProfileForm";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/");
  }

  const profile = await prisma.appProfile.findUnique({
    where: {
      userId: session.user.id,
    },
  });

  return <ProfileForm initialData={profile} />;
}
