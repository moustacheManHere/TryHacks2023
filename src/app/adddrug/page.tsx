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

    // Convert image file to byte string format
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    const handleSubmit = async(e: FormEvent) => {
        e.preventDefault();
        // Check if ref is not null
        if (ref.current?.files) {
            const file = ref.current?.files[0];
            if (file) {
                setLoading(true);
                try {
                    // Convert image file to byte string format
                    setError("");
                    const byteArray = await toBase64(file);
                    console.log(byteArray);
                    try  {
                        const data = await image_to_text(byteArray);
                        setData(data);
                        setLoading(false);
                    } catch (err) {
                        setError("Error processing file");
                        setData({});
                        setLoading(null);
                    }
                } catch (err) {
                    setError("Error processing file");
                    setData({});
                    setLoading(null);
                }
            } else {
                setError("No file selected");
                setData({});
                setLoading(null);
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

