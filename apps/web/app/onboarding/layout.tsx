import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className="flex items-center justify-center h-screen">
      <div className="absolute w-screen h-screen z-0">
        <div className="border-l border-r h-screen w-[389px] absolute left-1/2 translate-x-[-50%] border-dashed" />
        <div className="border-t border-b w-screen h-[504px] absolute top-1/2 translate-y-[-50%] border-dashed" />
      </div>
      <div className="z-10">
        {children}
      </div>
    </main>
  );
}
