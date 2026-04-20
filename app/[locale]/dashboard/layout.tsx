// Layout dashboard — auth guard géré par le middleware
// Les sous-layouts de chaque rôle gèrent leur propre bottom nav
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
