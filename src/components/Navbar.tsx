import Logo from "./Logo"
import Link from 'next/link'
import { NavLink } from "./NavLink"
import { UserButton, auth } from '@clerk/nextjs'
import { SignInComponent, SignUpComponent, SignOutComponent } from "./AuthComponents"
import { Sign } from "crypto"

const Navbar = () => {
    const { userId } = auth();

    const links: Array<{ name: string, url: string }> = [
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
                <div className="flex items-center">
                    {!userId ? (
                         <>
                            <SignInComponent />
                            <SignUpComponent />
                        </>
                    ):(
                        <Link href="/profile" className="mx-4 relative group text-black">Profile</Link>
                    )}
                    <UserButton afterSignOutUrl='/' />
                </div>
            </div>
            <div className="absolute left-[50%] top-6 lg:top-4 translate-x-[-50%]">
                <Logo />
            </div>

        </header>
    )
}



export default Navbar