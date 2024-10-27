import { Button } from '@/components/ui/button';
import { signOut } from '@/utils/supabase/authServer'
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react'

const LogoutButton = () => {
    const router = useRouter();

    const handleSignOut = async () => {
        const success = await signOut();
        if (success) {
            router.push("/login");
        }
    };
    return <Button variant="outline" aria-busy="true"
        aria-label="Login Button" className='rounded-full py-3 font-normal' onClick={handleSignOut}>
        <LogOut /> Cerrar sesión
    </Button>
}

export default LogoutButton