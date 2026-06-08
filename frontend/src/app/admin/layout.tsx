import { AdminAuthProvider } from "@/contexts/AdminAuthContext";

export const metadata = {
  title: "Admin | INKOTEA",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
