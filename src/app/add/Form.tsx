"use client";

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { FormEvent, RefObject, useRef } from 'react'

type FormProps = {
    onSubmit: (e: FormEvent) => void;
    inputRef: RefObject<HTMLInputElement>;
    className?: string;
}

const Form = ({onSubmit, inputRef, ...className} : FormProps ) => {
  return (
    <>
        <form onSubmit={onSubmit} className={`flex w-full max-w-sm items-center space-x-3  ${className}`}>
            <Input accept="image/png, image/jpeg" placeholder="File" type="file" ref={inputRef} />
            <Button>Submit</Button>
        </form>
    </>
   
  )
}

export default Form