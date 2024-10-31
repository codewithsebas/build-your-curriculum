"use client"
import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/utils/supabase/authServer";
import Image from "next/image";

const LoginButton = () => {
  return <Button variant="outline" aria-busy="true"
    aria-label="Logout Button" className="rounded-full py-5 font-normal" onClick={signInWithGoogle}>
    <Image src="/google.svg" alt="Google" width={20} height={20} /> Continuar con Google
  </Button>
};

export default LoginButton;