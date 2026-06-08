import { AdminAuthProvider } from "@/contexts/AdminAuthContext";
import { AdminDeleteConfirmProvider } from "@/features/admin/AdminDeleteConfirmProvider";
import { AdminToastProvider } from "@/features/admin/AdminToastProvider";

export const metadata = {
  title: "Admin | INKOTEA",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminToastProvider>
        <AdminDeleteConfirmProvider>{children}</AdminDeleteConfirmProvider>
      </AdminToastProvider>
    </AdminAuthProvider>
  );
}
