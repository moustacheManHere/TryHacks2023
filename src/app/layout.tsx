import { ReactNode } from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'MediAssist',
    description: 'A simple health care app',
    viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body>
                <main className="min-h-screen w-full">
                    <Navbar />
                    {children}
                    <Footer />
                </main>
            </body>
        </html>
    )
}
