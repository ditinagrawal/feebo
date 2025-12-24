import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppHeader } from "@/modules/dashboard/components/app-header";
import { AppSidebar } from "@/modules/dashboard/components/app-sidebar";
import { Modal } from "@/modules/dashboard/components/modals";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <AppHeader />
        <div className="bg-muted/40 flex-1 rounded-2xl p-4">
          <Modal />
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
