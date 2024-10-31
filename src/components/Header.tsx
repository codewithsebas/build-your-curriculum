import { ChevronDown, Github, LogOut } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from '@/utils/supabase/authServer';
import { useRouter } from 'next/navigation';
import useSession from '@/hooks/useSession';
import Link from 'next/link';

const Header = () => {
    const router = useRouter();
    const { session } = useSession();
    const handleSignOut = async () => {
        localStorage.removeItem("userRole");
        const success = await signOut();
        if (success) {
            router.push("/login");
        }
    };

    return (
        <header className='flex justify-between items-center gap-3 w-full'>
            <div className='flex items-center gap-3'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage className='select-none outline-none' src={session?.user.user_metadata.picture} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p className='text-lg px-2 text-black flex items-center gap-3'>{session?.user.user_metadata.full_name} <ChevronDown size={20} /></p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 me-10 mt-2">
                        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Perfil
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Plantillas
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="https://github.com/codewithsebas/build-your-curriculum" className='w-full flex justify-between' target='_blank'>GitHub <Github size={17} className='text-black/40' /></Link>
                            
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleSignOut}>
                            Cerrar sesión
                            <DropdownMenuShortcut> <LogOut size={17} className='text-black/60' /></DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Header