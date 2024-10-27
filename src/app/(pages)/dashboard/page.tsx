"use client";
import { useEffect, useState } from "react";
import { getUserSession } from "@/utils/supabase/authServer";
import { useRouter } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";
import LoadSpinner from "@/app/components/LoadSpinner";
import { Session } from "@supabase/auth-js";

const DashboardPage = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true);
    const checkSession = async () => {
      const userSession = await getUserSession();
      if (!userSession) {
        router.push("/login");
      } else {
        setLoad(false);
        setSession(userSession);
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full min-h-screen">Bienvenido, {session?.user.email}!
      <LoadSpinner state={load} />
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
