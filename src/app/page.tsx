import type { AppProps } from 'next/app'
import '@/styles/globals.css'

export default function App({ pageProps }: AppProps) {
    return (
        <main className='flex w-full flex-col items-center justify-center' >
            <h1 className='text-4xl font-bold'>Hello World</h1>
        </main>
)}