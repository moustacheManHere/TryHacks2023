"use client";
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export const NavLink = ({ link, name }: { link: string, name: string }) => {

    const pathname = usePathname();

    return (
        <Link href={link} className={`mx-4 relative group ${pathname === link ? 'text-medical' : 'text-black'}`}>
            {name}
            <span className={`h-[1px] inline-block bg-medical absolute left-0 -bottom-0.5 
            group-hover:w-full transition-[width] ease duration-300 
            ${pathname === link ? 'w-full' : 'w-0'}`}>
                &nbsp;
            </span>
        </Link>
    )
}