import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren<{}>) {
  return <div className="z-10">{children}</div>;
}
