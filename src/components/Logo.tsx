import Image from 'next/image'
import Link from 'next/link'

const Logo = ({className} : {className?:string}) => {
  return (
    <Link href='/'><Image src="/MediAssist.png" alt="MediAssist Logo" width={100} height={50} className={`${className}`} priority /></Link>
  )
}

export default Logo