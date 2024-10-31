import { Button } from '@/components/ui/button';
import { signOut } from '@/utils/supabase/authServer'
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        localStorage.removeItem("userRole");
        const success = await signOut();
        if (success) {
            router.push("/login");
        }
    };
    return <Button aria-busy="true"
        aria-label="Login Button" className='rounded-full py-3 font-normal' onClick={handleSignOut}>
        <LogOut /> Cerrar sesión
    </Button>
}

export default LogoutButton