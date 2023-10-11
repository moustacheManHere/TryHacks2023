import { ReactNode } from 'react'

type propsType = {
    children: ReactNode,
    className: string
}

const Layout = ({children, className=""}: propsType) => {
  return (
    <div className={`w-full h-full inline-block z-0 bg-light dark:bg-dark p-12 ${className}`}>
        {children}
    </div>
  )
}

export default Layout
