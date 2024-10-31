import { Github } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from 'next/link';
import { useGlobalStore } from '@/app/store/useGlobalStore';

const Header = () => {
    const {  name } = useGlobalStore();
    return (
        <header className='flex justify-between items-center gap-3 w-full'>
            <div className='flex items-center gap-3'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='flex items-center gap-2'>
                        <Avatar>
                            <AvatarImage className='select-none outline-none' src="https://github.com/shadcn.png" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <p>{name}</p>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 ms-8 mt-2">
                        <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                Plantillas
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="https://github.com/codewithsebas/build-your-curriculum" className='w-full flex justify-between' target='_blank'>GitHub <Github size={17} className='text-black/40' /></Link>          
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}

export default Header