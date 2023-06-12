import { ResourceTypeURL } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { ChevronLeft } from "lucide-react";
import { IFrame } from "@/components/ui/IFrame";

export default async function SpecificSolutionPage({
  params: { resourceId, categoryURL, solutionId },
}: {
  params: {
    resourceId: string;
    categoryURL: ResourceTypeURL;
    solutionId: string;
  };
}) {
  if (categoryURL !== "past_papers") {
    redirect("/404");
  }

  const solution = await prisma.solution.findFirst({
    where: {
      id: solutionId,
      questionPaperId: resourceId,
    },
  });

  if (!solution) {
    redirect("/404");
  }

  const PDFURL = `https://${process.env.NEXT_PUBLIC_AWS_CLOUDFRONT_DOMAIN}/${resourceId}`;

  return (
    <>
      <Link
        href={`/resource/${resourceId}/past_papers/solutions`}
        className="absolute top-10 w-max"
      >
        <Button variant="default">
          <span>
            <ChevronLeft className="-ml-1" size={20} />
          </span>
          <span>View all solutions</span>
        </Button>
      </Link>
      <IFrame
        title="PDF Resource"
        className="mt-6"
        src={PDFURL}
        width="100%"
        height="80%"
      ></IFrame>
    </>
  );
}
