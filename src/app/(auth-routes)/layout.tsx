import { ReactNode } from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

interface AuthLayoutProps {
  children: ReactNode;
}

export default async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await auth();
  if (session?.user) {
    return redirect("/");
  }

  return <>{children}</>;
}
