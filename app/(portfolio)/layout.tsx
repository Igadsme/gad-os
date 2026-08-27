import { AppShell } from "@/components/layout/app-shell";

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell>{children}</AppShell>;
}
