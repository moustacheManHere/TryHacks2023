"use client"
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const AddDrugButton = ({error, onClick} : {error: boolean, onClick: React.MouseEventHandler<HTMLElement>}) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        onClick;
        setTimeout(() => {
            setIsClicked(true);
        }, 1500)
    }
    return (
        <Button variant="medical" size="icon" className={`${error ? 'hidden' : 'display'}`} onClick={handleClick}>
            <div className="flex flex-col justify-center items-center">
                <span className={`bg-white h-0.5 rounded-sm p-0.5 transition-all duration-300 ease-out ${isClicked ? "w-6 -rotate-45 translate-y-[0.1rem] translate-x-[0.2rem]" : "w-5 translate-y-[0.2rem]"}`}></span>
                <span className={`bg-white h-0.5 rounded-sm p-0.5 transition-all duration-300 ease-out ${isClicked ? "w-3 -rotate-[135deg] translate-y-[0.1rem] -translate-x-[0.5rem]" : "w-5 rotate-90"}`}></span>
            </div>
        </Button>
    )
}

export default AddDrugButton