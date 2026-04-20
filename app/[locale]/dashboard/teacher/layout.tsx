import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardBottomNav from '@/components/layout/DashboardBottomNav';

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[var(--background-soft)]">
      <DashboardSidebar role="teacher" userName="Prof. Alain Mbida" userEmail="a.mbida@pes.cm" />
      <div className="flex flex-col flex-1 min-h-screen md:ml-60">
        <DashboardHeader role="teacher" notifCount={5} userName="Prof. Alain Mbida" />
        <main className="flex-1 overflow-y-auto pb-nav md:pb-0">
          {children}
        </main>
      </div>
      <DashboardBottomNav role="teacher" badgeCounts={{ questions: 5 }} />
    </div>
  );
}
