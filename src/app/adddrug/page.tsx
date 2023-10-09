"use client";
import React from 'react'
import Form  from '@/app/adddrug/Form'
import { FormEvent, useRef, useState } from 'react'
import image_to_text from '@/fake_api/image_to_text'
import ProgressSpinner from '@/components/ProgressSpinner'

const page = () => {
    // Input Reference
    const ref = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<object>({});
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string>("");

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        // Check if ref is not null
        if (ref.current?.files) {
            const file = ref.current?.files[0];
            if (file) {
                try  {
                    setError("");
                    setLoading(true);
                    const data = await image_to_text(file);
                    setData(data);
                    setLoading(false);
                } catch (err) {
                    setLoading(false);
                    setError("Error processing file");
                    setData({});
                }
            } else {
                setError("No file selected");
                setData({});
            }
            // Reset input
            ref.current.value = "";
        }
    }
  return (
    <div className="flex flex-col items-center justify-center w-full h-72 space-y-8">
        <Form onSubmit={handleSubmit} inputRef={ref} />
        <div className="flex flex-col items-center justify-center">
            {loading!== null && <ProgressSpinner text={loading ? "Processing Image" : "Processed Image"} isLoading={loading} />}
            {error && <p>{error}</p>}
            {data && Object.keys(data).length > 0  && <p>{JSON.stringify(data)}</p>}
        </div>
    </div>
   
  )
}

export default page