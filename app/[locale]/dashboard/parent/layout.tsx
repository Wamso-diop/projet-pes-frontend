import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardBottomNav from '@/components/layout/DashboardBottomNav';

export default function ParentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background-soft)]">
      <DashboardSidebar role="parent" userName="Marie Nkomo" userEmail="marie.n@gmail.com" />
      <div className="flex flex-col flex-1 min-h-screen md:ml-60">
        <DashboardHeader role="parent" notifCount={2} userName="Marie Nkomo" />
        <main className="flex-1 overflow-y-auto pb-nav md:pb-0">
          {children}
        </main>
      </div>
      <DashboardBottomNav role="parent" />
    </div>
  );
}
