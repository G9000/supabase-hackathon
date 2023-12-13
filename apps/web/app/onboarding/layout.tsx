import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return (
    <main className="flex items-center justify-center h-screen">
      {children}
    </main>
  );
}
