"use client";

import Spline from "@splinetool/react-spline";

export default function Background() {
  return (
    <main className="fixed bottom-0 left-0 w-full h-full -z-40 pointer-events-none overflow-hidden">
      <div className="w-full h-full md:scale-110 lg:scale-120 xl:scale-135 2xl:scale-175 origin-center">
        <Spline scene="https://prod.spline.design/KrPwJzCfoWHUDryU/scene.splinecode" />
      </div>
    </main>
  );
}
