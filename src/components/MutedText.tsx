"use client"
import React from 'react'
import {motion} from 'framer-motion'

const MutedText = ({text, className=""} : {text: string, className?:string}) => {
    const quote = {
        initial: {
            opacity: 0,
        },
        animate:{
            opacity:1,
            transition:{
                delay:0.3,
                staggerChildren:0.08
            }
        }
    }

  return (
    <div className="w-full mx-auto py-2 flex items-center justify-center text-center
    overflow-hidden">

        <motion.p className={`inline-block w-full text-dark/80 ${className}`} 
        variants={quote}
        initial="initial"
        animate="animate">
            {text}
        </motion.p>
    </div>
  )
}

export default MutedText
