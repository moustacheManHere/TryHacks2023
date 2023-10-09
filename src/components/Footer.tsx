import Layout from '@/components/Layout'

const Footer = () => {
  return (
    <footer className='w-full border-t-2 border-solid border-dark dark:border-light font-medium text-lg
   sm:text-base'>
        <Layout className='py-8 flex items-center justify-center lg:flex-col lg:py-6'>
            <span className='text-dark dark:text-light'>&copy; {new Date().getFullYear()} MediAssist. All Rights Reserved.</span>
        </Layout>
   </footer>
  )
}

export default Footer
