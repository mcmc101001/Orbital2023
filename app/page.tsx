import Button from "@/components/ui/Button";
import { IFrame } from "@/components/ui/IFrame";
import * as motion from "@/lib/motion";
import Link from "next/link";

const SLIDE_IN_ANIMATION_VARIANTS = {
  left: { opacity: 0, x: "-20vw" },
  center: {
    opacity: 1,
    x: 0,
    transition: { type: "tween", ease: "easeInOut", duration: 0.75 },
  },
  right: { opacity: 0, x: "20vw" },
};

const FADE_DOWN_ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: -10 },
  show: { opacity: 1, y: 0, transition: { type: "spring", duration: 1 } },
};

export default async function Home() {
  return (
    <main
      className="flex h-screen flex-col items-center overflow-x-hidden overflow-y-scroll scroll-smooth text-slate-800
          scrollbar-track-transparent scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 
          dark:text-slate-200 dark:scrollbar-thumb-slate-800 dark:hover:scrollbar-thumb-slate-700"
      style={{ scrollbarGutter: "stable" }}
    >
      <section className="flex h-screen max-w-4xl flex-col items-center justify-center gap-y-8 py-56 text-center">
        <motion.h1
          initial="left"
          whileInView="center"
          viewport={{ once: true }}
          variants={SLIDE_IN_ANIMATION_VARIANTS}
          className="text-7xl font-bold"
        >
          Redefining Revision
        </motion.h1>
        <motion.p
          initial="right"
          whileInView="center"
          viewport={{ once: true }}
          variants={SLIDE_IN_ANIMATION_VARIANTS}
          className="text-lg leading-normal text-slate-600 dark:text-slate-400"
        >
          A one stop solution for all your revision needs, StudyStash is home to
          all the resources you would need, powered by users such as you.
        </motion.p>
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Button size="lg" className="h-14 w-full text-xl font-semibold">
            <Link className="w-full" href="/database">
              Try it now
            </Link>
          </Button>
        </motion.div>
      </section>
      <section className="flex h-screen flex-col items-center justify-center gap-y-6 py-56 text-center">
        <IFrame
          className="h-[50vh] w-[50vw]"
          src="https://www.youtube.com/embed/9-R_JgcvzaA"
        />
      </section>
      <section className="flex h-screen max-w-6xl flex-col items-center justify-center gap-y-6 py-56 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            show: {
              transition: {
                delayChildren: 0.3,
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <motion.h1
            variants={FADE_DOWN_ANIMATION_VARIANTS}
            className="text-7xl font-bold"
          >
            Features
          </motion.h1>
          <ul className="mb-2 list-disc">
            <motion.li
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mt-4 text-left text-lg leading-normal text-slate-600 dark:text-slate-400"
            >
              Gain access to all your revision needs, be it cheatsheets, notes,
              or past papers and solutions!
            </motion.li>
            <motion.li
              variants={FADE_DOWN_ANIMATION_VARIANTS}
              className="mt-4 text-left text-lg leading-normal text-slate-600 dark:text-slate-400"
            >
              Contribute resources and discussion!
            </motion.li>
          </ul>
        </motion.div>
      </section>
      <section className="pb-56"></section>
    </main>
  );
}
