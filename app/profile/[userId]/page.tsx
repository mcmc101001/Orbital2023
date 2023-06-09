import UserResourcesSection from "@/components/UserResourcesSection";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProfileEditDialog from "@/components/ProfileEditDialog";
import { ResourceFiltersSorts } from "@/lib/content";
import { Separator } from "@/components/ui/Separator";

export default async function ProfilePageUser({
  params,
  searchParams,
}: {
  params: { userId: string };
  searchParams: ResourceFiltersSorts;
}) {
  const currentUser = await getCurrentUser();
  const isProfile = params.userId === currentUser?.id;

  const profileUser = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
  });
  if (!profileUser) {
    redirect("/404");
  }

  return (
    <div className="flex w-full p-20 text-slate-800 dark:text-slate-200">
      <div className="h-full w-1/3 pr-5">
        <section className="relative rounded-xl bg-slate-300 p-6 dark:bg-slate-700">
          <div className="flex">
            <Image
              src={profileUser.image!}
              width={75}
              height={75}
              alt="Profile pic"
            ></Image>
            {isProfile && (
              <div className="ml-auto">
                <ProfileEditDialog
                  userId={profileUser.id}
                  username={profileUser.name ?? "ERROR: name not found"}
                  bio={profileUser.bio}
                />
              </div>
            )}
          </div>
          <h1 className="mt-2 overflow-x-scroll whitespace-nowrap text-xl font-bold scrollbar-none">
            {profileUser.name}
          </h1>
          <div className="my-2">
            <h2 className="text-lg font-semibold">Bio</h2>
            <p className="max-h-[120px] overflow-y-auto scroll-smooth whitespace-break-spaces break-words scrollbar-thin scrollbar-track-slate-400 scrollbar-thumb-slate-100 dark:scrollbar-track-slate-600 dark:scrollbar-thumb-slate-900">
              {profileUser.bio ||
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse."}
            </p>
          </div>
        </section>
        <section className="mt-6 flex items-center justify-center bg-slate-400 text-center text-xl dark:bg-slate-600">
          Points or achievements
        </section>
      </div>
      <Separator
        className="h-[100vw-10rem] bg-slate-200 dark:bg-slate-800"
        orientation="vertical"
      />
      <section className="w-2/3 pl-5">
        <h1 className="mb-2 text-3xl font-semibold text-slate-800 dark:text-white">
          My resources
        </h1>
        {/* @ts-expect-error Server Component */}
        <UserResourcesSection
          filterModuleCode={searchParams.filterModuleCode}
          filterCategory={searchParams.filterCategory}
          filterSemester={searchParams.filterSemester}
          filterAcadYear={searchParams.filterAcadYear}
          filterExamType={searchParams.filterExamType}
          sort={searchParams.sort}
          isProfile={isProfile}
          profileUserId={profileUser.id}
        />
      </section>
    </div>
  );
}
