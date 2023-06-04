import { ResourceType } from "@/lib/content";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ResourceSheetLauncher from "@/components/ResourceSheetLauncher";
import {
  CheatsheetVote,
  QuestionPaperVote,
  NotesVote,
  CheatsheetStatus,
  NotesStatus,
  QuestionPaperStatus,
  ExamType,
  Prisma,
} from "@prisma/client";
import { getCurrentUser } from "@/lib/session";
import Link from "next/link";
import DifficultyDisplayDialog from "@/components/DifficultyDisplayDialog";
import ResourceDeleteButton from "@/components/ResourceDeleteButton";
import ResourceStatusComponent from "@/components/ResourceStatusComponent";
import { Separator } from "@/components/ui/Separator";
import ClientDateTime from "@/components/ClientDateTime";
import { Suspense } from "react";
import { SolutionIncludedIndicator } from "./SolutionIncludedIndicator";
import ResourceAltStatusComponent from "@/components/ResourceAltStatusComponent";
import { ProfleVerifiedIndicator } from "./ProfileVerifiedIndicator";
import ResourceStatusComponentInLine from "./ResourceStatusComponentInLine";

/*************** DATA FETCHING CODE ****************/
export async function getCheatsheetVote(userId: string, resourceId: string) {
  const res = await prisma.cheatsheetVote.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getNotesVote(userId: string, resourceId: string) {
  const res = await prisma.notesVote.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getQuestionPaperVote(userId: string, resourceId: string) {
  const res = await prisma.questionPaperVote.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getCheatsheetStatus(userId: string, resourceId: string) {
  const res = await prisma.cheatsheetStatus.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getNotesStatus(userId: string, resourceId: string) {
  const res = await prisma.notesStatus.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getQuestionPaperStatus(
  userId: string,
  resourceId: string
) {
  const res = await prisma.questionPaperStatus.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

export async function getDifficulty(resourceId: string) {
  const res = prisma.questionPaperDifficulty.aggregate({
    where: {
      resourceId: resourceId,
    },
    _avg: {
      value: true,
    },
  });
  return res;
}

export async function getUserDifficulty(userId: string, resourceId: string) {
  const res = prisma.questionPaperDifficulty.findUnique({
    where: {
      userId_resourceId: {
        userId: userId,
        resourceId: resourceId,
      },
    },
  });
  return res;
}

interface ResourceItemProps {
  name: string;
  resourceId: string;
  userId: string;
  createdAt: Date;
  acadYear: string;
  semester: string;
  category: ResourceType;
  difficulty?: number;
  difficultyCount?: number;
  examType?: ExamType;
  solutionIncluded?: boolean;
  rating: number;
  deletable?: boolean;
  designNumber?: number;
}

export default async function ResourceItem({
  name,
  resourceId,
  userId,
  createdAt,
  acadYear,
  semester,
  difficulty,
  difficultyCount,
  examType,
  solutionIncluded,
  category,
  rating,
  deletable,
  designNumber,
}: ResourceItemProps) {
  const resourceUser = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  const currentUser = await getCurrentUser();

  let userVote: CheatsheetVote | NotesVote | QuestionPaperVote | null;
  let userStatus: CheatsheetStatus | NotesStatus | QuestionPaperStatus | null;
  let userDifficultyData: Prisma.PromiseReturnType<typeof getUserDifficulty>;
  let userDifficulty: number = 0;

  // If user is signed in, get user vote as well as user status

  if (category === "Cheatsheets") {
    if (currentUser) {
      userVote = await getCheatsheetVote(currentUser.id, resourceId);
      userStatus = await getCheatsheetStatus(currentUser.id, resourceId);
    } else {
      userVote = null;
      userStatus = null;
    }
  } else if (category === "Notes") {
    if (currentUser) {
      userVote = await getNotesVote(currentUser.id, resourceId);
      userStatus = await getNotesStatus(currentUser.id, resourceId);
    } else {
      userVote = null;
      userStatus = null;
    }
  } else if (category === "Past Papers") {
    if (currentUser) {
      // Parallel data fetching
      const userVotePromise = getQuestionPaperVote(currentUser.id, resourceId);
      const userStatusPromise = getQuestionPaperStatus(
        currentUser.id,
        resourceId
      );
      const userDifficultyPromise = getUserDifficulty(
        currentUser.id,
        resourceId
      );
      [userVote, userStatus, userDifficultyData] = await Promise.all([
        userVotePromise,
        userStatusPromise,
        userDifficultyPromise,
      ]);
      userDifficulty = userDifficultyData?.value || 0;
    } else {
      userVote = null;
      userStatus = null;
      userDifficulty = 0;
    }
  } else {
    redirect("/404");
  }

  return (
    <div className="min-h-24 flex flex-row items-center rounded-xl border border-slate-800 px-4 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-200 dark:hover:bg-slate-800">
      {currentUser && designNumber === 1 && (
        <ResourceStatusComponent
          category={category}
          resourceId={resourceId}
          currentUserId={currentUser.id}
          status={userStatus ? userStatus.status : null}
        />
      )}

      <div className="flex h-full w-full overflow-hidden">
        <Suspense>
          <ResourceSheetLauncher
            resourceId={resourceId}
            resourceUserId={resourceUser?.id!}
            title={name}
            currentUserId={currentUser ? currentUser.id : null}
            category={category}
            totalRating={rating}
            userRating={userVote !== null ? userVote.value : null}
            userDifficulty={userDifficulty}
            resourceStatus={userStatus ? userStatus.status : null}
            solutionIncluded={solutionIncluded}
          >
            <div className="ml-3 flex h-full flex-col gap-y-2 overflow-hidden pr-4">
              <div className="flex items-center gap-x-2 overflow-scroll whitespace-nowrap text-left font-semibold scrollbar-none">
                {name}
                {category === "Past Papers" && solutionIncluded && (
                  <SolutionIncludedIndicator />
                )}
                {currentUser && designNumber === 3 && (
                  <ResourceStatusComponentInLine resourceStatus={null} />
                )}
              </div>
              {currentUser && designNumber === 2 ? (
                <ResourceAltStatusComponent
                  category={category}
                  solnIncluded={!!solutionIncluded}
                />
              ) : (
                <p className="overflow-hidden overflow-x-scroll whitespace-nowrap text-left text-slate-600 scrollbar-none dark:text-slate-400">
                  <ClientDateTime datetime={createdAt} />
                </p>
              )}
            </div>
            <div className="ml-auto flex h-full flex-col gap-y-2">
              <p className="whitespace-nowrap text-end">
                {category !== "Notes" ? `${examType}, ` : ""}
                {`${acadYear} S${semester}`}
              </p>
              <p className="ml-auto w-max whitespace-nowrap text-end">
                <Link
                  href={`/profile/${resourceUser?.id}`}
                  className="group ml-auto block max-w-[180px] truncate text-slate-600 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-300"
                >
                  <span className="flex">
                    {resourceUser?.name}
                    {resourceUser?.verified && <ProfleVerifiedIndicator />}
                  </span>
                  <span className="mx-auto block h-0.5 max-w-0 bg-slate-700 transition-all duration-300 group-hover:max-w-full dark:bg-slate-300"></span>
                </Link>
              </p>
            </div>
          </ResourceSheetLauncher>
        </Suspense>
      </div>
      {category === "Past Papers" && (
        <div className="flex h-full items-center justify-center">
          <Separator
            className="mx-4 box-border h-3/4 bg-slate-800 dark:bg-slate-200"
            orientation="vertical"
          />
          <DifficultyDisplayDialog
            resourceId={resourceId}
            difficulty={difficulty as number}
            difficultyCount={difficultyCount as number}
          />
        </div>
      )}
      {deletable && currentUser?.id === userId && (
        <div className="flex h-full items-center justify-center">
          <Separator
            className="mx-4 box-border h-3/4 bg-slate-800 dark:bg-slate-200"
            orientation="vertical"
          />
          <ResourceDeleteButton
            currentUserId={currentUser.id}
            resourceId={resourceId}
            category={category}
          />
        </div>
      )}
    </div>
  );
}
