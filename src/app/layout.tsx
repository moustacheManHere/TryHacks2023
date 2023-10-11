import { ReactNode } from 'react'
import { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ClerkProvider } from '@clerk/nextjs'
import '@/styles/globals.css'

export const metadata: Metadata = {
    title: 'MediAssist',
    description: 'A simple health care app',
    viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <ClerkProvider>
            <html lang="en">
                <head>
                    <link rel="icon" href="/favicon.ico" />
                </head>
                <body>
                    <main className="min-h-screen w-full">
                        <Navbar />
                        <div className="h-[75vh] w-full">
                            {children}
                        </div>
                        <Footer />
                    </main>
                </body>
            </html>
        </ClerkProvider>
    )
}
