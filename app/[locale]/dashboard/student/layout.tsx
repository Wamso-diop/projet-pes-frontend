import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardBottomNav from '@/components/layout/DashboardBottomNav';

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background-soft)]">
      <DashboardSidebar role="student" userName="Lucas Tchinda" userEmail="lucas.t@gmail.com" />
      <div className="flex flex-col flex-1 min-h-screen md:ml-60">
        <DashboardHeader role="student" notifCount={3} userName="Lucas Tchinda" />
        <main className="flex-1 overflow-y-auto pb-nav md:pb-0">
          {children}
        </main>
      </div>
      <DashboardBottomNav role="student" badgeCounts={{ questions: 3 }} />
    </div>
  );
}
