"use client"
import type { AppProps } from 'next/app'
import AnimatedText from '@/components/AnimatedText'
import MutedText from '@/components/MutedText'
import { Healthcare } from '@/components/healthcaresvg'
import '@/styles/globals.css'

export default function App() {
    return (
        <main className='flex w-full flex-col items-center justify-center' >
            <main className="flex items-start text-dark w-full min-h-[90vh]">
                <div className="w-full h-full inline-block z-0 bg-light p-32">
                    <div className="flex items-center justify-between w-full">
                        <div className='w-1/2'>
                            <Healthcare />
                        </div>
                        <div className='w-1/2 flex flex-col items-center self-center'>
                            <AnimatedText text={"We provide medical services that you can trust!"} highlight={["medical", "trust!"]}/>
                            <MutedText text={"Sign Up for an account today!"} />
                        </div>
                    </div>
                </div>
            </main>
        </main>
)}