import ResourceTab from "@/components/ResourceTab";
import { getSpecificModuleInfo } from "@/lib/nusmods";
import { ResourceOptions } from "@/lib/content";
import { getCurrentUser } from "@/lib/session";
import ModuleStar from "@/components/ModuleStar";
import { prisma } from "@/lib/prisma";
import ContributeButton from "@/components/ContributeButton";

// export const generateStaticParams = async () => {
//   const moduleList = await getModuleList();
//   const paths = moduleList.map((module) => {
//     moduleCode: module.moduleCode
//   })

//   return {
//     paths,
//     fallback: false,
//   }
// };

export default async function Layout({
  params: { moduleCode },
  children,
}: {
  params: { moduleCode: string };
  children: React.ReactNode;
}) {
  const moduleInfo = await getSpecificModuleInfo(moduleCode);
  const user = await getCurrentUser();

  let starred = null;
  if (user) {
    starred = await prisma.starredModules.findUnique({
      where: {
        userId_moduleCode: {
          userId: user.id,
          moduleCode: moduleCode,
        },
      },
    });
  }

  return (
    // set to be div for framer motion to work
    <div className="h-full overflow-hidden">
      <div className="flex w-full flex-row items-center justify-between">
        <div>
          <h1 className="flex flex-row items-center justify-start gap-x-2 text-4xl font-bold text-slate-800 dark:text-slate-200">
            {moduleInfo.moduleCode}
            <span>
              {user && (
                <ModuleStar
                  moduleCode={moduleCode}
                  userId={user.id}
                  starred={!!starred}
                />
              )}
            </span>
          </h1>
          <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
            {moduleInfo.title}
          </h2>
        </div>
        <ContributeButton />
      </div>
      <ResourceTab moduleCode={moduleCode} resourceOptions={ResourceOptions} />
      {children}
    </div>
  );
}
