import { ReactNode } from "react";

export default function UserLayout({ children }: { children: ReactNode }) {
  return <section className="p-6">{children}</section>;
}
