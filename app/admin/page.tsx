import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import {
  columns,
  ReportHeaderType,
} from "@/components/admin/ReportTableColumns";
import { getModuleCodeOptions } from "@/lib/nusmods";

// Function to convert Date type to string
const dateString = (datetime: Date) => {
  return datetime.toLocaleString("en-SG", {
    minute: "2-digit",
    hour: "numeric",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) {
    redirect(authOptions?.pages?.signIn || "api/auth/signin/google");
  }
  const verified = await prisma.user
    .findUnique({
      where: {
        id: user.id,
      },
    })
    .then((user) => user?.verified);
  if (!verified) {
    redirect("/401");
  }

  let resourceData: ReportHeaderType[] = [];
  let solutionData: ReportHeaderType[] = [];
  let commentData: ReportHeaderType[] = [];

  const cheatsheetsPromise = prisma.cheatsheetReport.findMany({
    include: {
      user: true,
      resource: {
        include: {
          userSubmitted: true,
        },
      },
    },
  });
  const qnpapersPromise = prisma.questionPaperReport.findMany({
    include: {
      user: true,
      resource: {
        include: {
          userSubmitted: true,
        },
      },
    },
  });
  const notesPromise = prisma.notesReport.findMany({
    include: {
      user: true,
      resource: {
        include: {
          userSubmitted: true,
        },
      },
    },
  });
  const solnsPromise = prisma.solutionReport.findMany({
    include: {
      user: true,
      resource: {
        include: {
          questionPaper: true,
          userSubmitted: true,
        },
      },
    },
  });

  const [cheatsheets, qnpapers, notes, solns] = await Promise.all([
    cheatsheetsPromise,
    qnpapersPromise,
    notesPromise,
    solnsPromise,
  ]);
  if (cheatsheets) {
    cheatsheets.map((report) => {
      resourceData.push({
        reportId: report.id,
        type: report.type,
        category: "Cheatsheets",
        createdAt: dateString(report.createdAt),
        filename: report.resource.name,
        uploaderId: report.resource.userSubmitted.id,
        uploaderName: report.resource.userSubmitted.name!,
        resourceId: report.resourceId,
        reporterId: report.userId,
        resolved: report.resolved,
        reporterName: report.user.name!,
        acadYear: report.resource.acadYear,
        semester: report.resource.semester,
        moduleCode: report.resource.moduleCode,
      });
    });
  }
  if (qnpapers) {
    qnpapers.map((report) => {
      resourceData.push({
        reportId: report.id,
        type: report.type,
        category: "Past Papers",
        createdAt: dateString(report.createdAt),
        filename: report.resource.name,
        uploaderId: report.resource.userSubmitted.id,
        uploaderName: report.resource.userSubmitted.name!,
        resourceId: report.resourceId,
        reporterId: report.userId,
        resolved: report.resolved,
        reporterName: report.user.name!,
        acadYear: report.resource.acadYear,
        semester: report.resource.semester,
        moduleCode: report.resource.moduleCode,
        examType: report.resource.type,
      });
    });
  }
  if (notes) {
    notes.map((report) => {
      resourceData.push({
        reportId: report.id,
        type: report.type,
        category: "Notes",
        createdAt: dateString(report.createdAt),
        filename: report.resource.name,
        uploaderId: report.resource.userSubmitted.id,
        uploaderName: report.resource.userSubmitted.name!,
        resourceId: report.resourceId,
        reporterId: report.userId,
        resolved: report.resolved,
        reporterName: report.user.name!,
        acadYear: report.resource.acadYear,
        semester: report.resource.semester,
        moduleCode: report.resource.moduleCode,
      });
    });
  }
  if (solns) {
    solns.map((report) => {
      solutionData.push({
        reportId: report.id,
        type: report.type,
        category: "Solutions",
        createdAt: dateString(report.createdAt),
        filename: report.resource.name,
        uploaderId: report.resource.userSubmitted.id,
        uploaderName: report.resource.userSubmitted.name!,
        resourceId: report.resourceId,
        reporterId: report.userId,
        resolved: report.resolved,
        reporterName: report.user.name!,
        acadYear: report.resource.questionPaper.acadYear,
        semester: report.resource.questionPaper.semester,
        moduleCode: report.resource.questionPaper.moduleCode,
      });
    });
  }

  // By default, sort by date (oldest on top)
  resourceData.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  solutionData.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
  commentData.sort((a, b) => {
    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });

  return (
    <DataTable
      // params={params}

      columns={columns}
      resourceData={resourceData}
      solutionData={solutionData}
      commentData={[]}
      moduleCodeOptions={JSON.stringify(await getModuleCodeOptions())}
      className="h-screen"
    />
  );
}
