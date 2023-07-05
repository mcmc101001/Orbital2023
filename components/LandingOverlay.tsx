"use client";

import { useScroll, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import * as motion from "@/lib/motion";

const DEFAULT_SCALE = 450;

export default function LandingOverlay({
  children,
}: {
  children: React.ReactNode;
}) {
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    container: targetRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setScale(DEFAULT_SCALE * (1 + 3.1 * scrollYProgress.get()));
  });

  return (
    <main
      ref={targetRef}
      className="h-screen w-screen snap-y snap-mandatory overflow-y-scroll scroll-smooth text-slate-800
          scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-300 
          hover:scrollbar-thumb-slate-400 dark:text-slate-200 dark:scrollbar-thumb-slate-800 dark:hover:scrollbar-thumb-slate-700"
      style={{ scrollbarGutter: "stable" }}
    >
      <div className="pointer-events-none absolute z-10 flex h-full w-full items-center justify-center">
        <svg
          style={{ scale: 0.5 }}
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          height={scale + "vh"}
          viewBox="0 0 280.000000 251.000000"
          preserveAspectRatio="xMidYMid meet"
          className="absolute fill-fuchsia-800 opacity-10 dark:fill-blue-300"
        >
          <g transform="translate(0.000000,251.000000) scale(0.100000,-0.100000)">
            <path
              d="M1284 2437 c-49 -30 -179 -112 -289 -185 -110 -72 -285 -186 -390
  -253 -586 -380 -595 -386 -595 -418 0 -27 10 -37 91 -91 49 -34 88 -67 86 -73
  -2 -7 -28 -29 -58 -50 -153 -105 -154 -115 -30 -198 47 -31 87 -61 89 -67 2
  -6 -18 -25 -43 -44 -25 -18 -65 -47 -88 -63 -47 -35 -59 -72 -30 -97 10 -8
  153 -103 318 -210 165 -107 435 -282 600 -390 335 -218 421 -268 456 -268 13
  0 53 20 89 44 36 23 218 141 405 261 393 252 681 442 792 521 114 82 112 89
  -50 201 -29 20 -45 38 -41 46 3 8 36 36 75 62 81 55 102 80 89 105 -5 9 -45
  45 -90 79 -94 73 -95 65 22 147 99 70 101 86 21 146 -100 74 -334 228 -347
  228 -7 0 -38 19 -68 43 -31 23 -125 86 -210 140 -84 54 -270 174 -413 267
  -143 93 -269 170 -281 170 -11 0 -60 -24 -110 -53z m362 -215 c126 -81 272
  -175 324 -209 377 -242 639 -420 639 -433 1 -18 -104 -90 -130 -90 -18 0 -249
  147 -910 578 -86 56 -165 102 -176 102 -24 0 -247 -141 -870 -548 -110 -73
  -210 -132 -221 -132 -37 0 -148 88 -132 104 8 7 781 511 995 648 120 76 210
  128 226 128 16 0 109 -54 255 -148z m-100 -256 c71 -47 260 -169 419 -272 563
  -364 645 -419 645 -435 0 -9 -24 -33 -54 -54 -41 -28 -62 -36 -84 -33 -16 2
  -103 53 -193 112 -680 448 -854 556 -887 556 -35 0 -61 -16 -676 -414 -81 -53
  -156 -96 -165 -96 -29 0 -126 65 -129 86 -2 15 13 30 60 61 55 35 658 426 823
  534 33 21 72 39 86 39 16 0 76 -33 155 -84z m234 -474 c184 -121 336 -226 338
  -235 3 -14 -35 -41 -283 -200 -44 -28 -152 -98 -240 -156 -218 -143 -184 -147
  -482 50 -128 85 -281 186 -340 224 -60 39 -108 76 -108 84 0 12 631 432 699
  465 38 18 4 37 416 -232z m-1245 -286 c110 -72 285 -185 388 -251 103 -66 244
  -157 313 -202 79 -53 134 -83 152 -83 17 0 71 29 142 74 63 41 156 101 205
  132 50 32 178 116 287 186 108 70 203 128 212 128 17 0 121 -64 132 -81 11
  -19 -33 -52 -321 -237 -154 -98 -361 -232 -460 -296 -117 -76 -187 -116 -200
  -113 -11 2 -150 88 -310 192 -159 103 -427 275 -593 383 -167 107 -306 201
  -309 209 -7 19 13 41 72 74 31 18 57 26 70 23 11 -4 110 -66 220 -138z m136
  -408 c655 -428 688 -448 719 -448 29 0 153 75 532 323 482 316 532 347 558
  347 30 0 130 -65 130 -84 0 -7 -57 -51 -128 -98 -127 -86 -216 -143 -692 -449
  -140 -90 -284 -183 -320 -206 -36 -24 -72 -43 -80 -43 -8 0 -79 42 -157 93
  -78 50 -285 184 -460 297 -550 355 -598 388 -601 404 -4 19 115 99 139 93 8
  -2 171 -105 360 -229z"
            />
          </g>
        </svg>
      </div>
      {children}
    </main>
  );
}
