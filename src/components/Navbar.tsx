"use client"
import ProfileIcon from "./profileIcon"
import Logo from "./Logo"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Navbar = () => {

    const NavLink = ({ link, name }: {link: string, name: string}) => {

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

    const links: Array<{name: string, url: string}> = [
        {
            name: 'Home',
            url: '/'
        },
        {
            name: 'Add',
            url: '/adddrug',
        },
        {
            name: 'Info',
            url: '/druginfo',
        },
        {
            name: 'List',
            url: '/listdrugs'
        }
    ]

    return (
        <header className='w-full font-medium px-32 py-8 flex items-center justify-between relative z-10'>
            <div className="w-full flex justify-between items-center">
                <nav>
                    {links.map((item, i) => (
                        <NavLink link={item.url} key={i} name={item.name}></NavLink>
                    ))}
                </nav>
                <ProfileIcon />
            </div>
            <div className="absolute left-[50%] top-6 lg:top-4 translate-x-[-50%]">
                <Logo />
            </div>

        </header>
    )
}



export default Navbar