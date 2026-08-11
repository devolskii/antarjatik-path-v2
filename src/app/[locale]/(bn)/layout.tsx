import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">{children}</div>
    </main>
  );
}
