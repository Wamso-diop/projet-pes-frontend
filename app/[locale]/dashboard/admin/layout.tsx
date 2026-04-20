import AdminSidebar from '@/components/dashboard/admin/AdminSidebar';
import AdminHeader from '@/components/dashboard/admin/AdminHeader';
import DashboardBottomNav from '@/components/layout/DashboardBottomNav';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background-soft)]">
      {/* Sidebar — desktop uniquement */}
      <AdminSidebar />

      {/* Contenu principal */}
      <div className="flex flex-col flex-1 min-h-screen md:ml-60">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto pb-nav md:pb-0">
          {children}
        </main>
      </div>

      {/* Bottom nav — mobile uniquement */}
      <DashboardBottomNav role="admin" />
    </div>
  );
}
