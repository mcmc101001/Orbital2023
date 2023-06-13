import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { getRecentResources } from "@/lib/localStorage";
import VisitedResources from "@/components/VisitedResources";

export default async function PDFPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "api/auth/signin/google");
  }

  return (
    <>
      <div className="flex h-5/6 flex-col items-center dark:text-white">
        <div className="text-slate-800 dark:text-slate-200">
          Under development
        </div>

        {/* @ts-expect-error Server component */}
        <VisitedResources userId={user.id} />
      </div>
    </>
  );
}
