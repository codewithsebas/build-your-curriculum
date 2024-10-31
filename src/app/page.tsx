"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/") {
      router.push("/login");
    }
  }, [pathname, router]);
  if (pathname === "/") {
    return null;
  }
}
