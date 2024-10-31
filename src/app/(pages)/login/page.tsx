"use client";
import { useEffect } from "react";
import { getUserSession } from "@/utils/supabase/authServer";
import { useRouter } from "next/navigation";
import LoginButton from "@/components/LoginButton";

const LoginPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getUserSession();
      if (session) {
        router.push("/dashboard");
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="flex flex-col gap-5 items-center justify-center w-full min-h-screen">
      <LoginButton />
    </div>
  );
};

export default LoginPage;
