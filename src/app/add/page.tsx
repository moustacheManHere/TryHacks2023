"use client"
import { FC, FormEvent, useRef, useState } from 'react'
import Form from '@/app/add/Form'
import ProgressSpinner from '@/components/ProgressSpinner'
import UploadResult from '@/components/UploadResult'

const AddPage: FC = () => {
    // Input Reference
    const ref = useRef<HTMLInputElement>(null);

    const [data, setData] = useState<{ "Header": string, "Content"?: string }>({ "Header": "", "Content": "" });
    const [loading, setLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<boolean>(false);

    // Convert image file to byte string format
    const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });

    // API Call
    const image_to_text = async (byteString: string) => {
        const endpoint = "https://new-flask-app.hop.sh/upload";
        const body = {
            "image": byteString.split(',')[1]
        };

        // Call API
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        const response: {
            msg?: string,
            id?: number,
            name?: string
        } = await res.json();

        if (!res.ok) {
            const error = { "Header": `Error ${res.status}`, "Content": `This medicine is ${response['msg']}` }
            setData(error);
            throw new Error(response['msg']);
        } else {
            return response;
        }

    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        // Check if ref is not null
        if (ref.current?.files) {
            const file = ref.current?.files[0];
            if (file) {
                setLoading(true);
                setData({ "Header": "", "Content": "" });
                try {
                    // Convert image file to byte string format
                    setError(false);
                    const byteArray = await toBase64(file);
                    try {
                        const data = await image_to_text(byteArray);
                        setData({ "Header": `ID: ${data['id']}`, "Content": `This drug is called ${data['name']}` });
                        setLoading(false);
                    } catch (err) {
                        setError(true);
                        setLoading(null);
                    }
                } catch (err) {
                    setError(true);
                    setData({ "Header": "Error 400", "Content": "Error Processing File" });
                    setLoading(null);
                }
            } else {
                setError(true);
                setData({ "Header": "Error 400", "Content": "No file selected" });
                setLoading(null);
            }
            // Reset input
            ref.current.value = "";
        }
    }
    return (
        <div className="flex flex-col items-center justify-center w-full space-y-8 p-24">
            <div className="flex flex-col items-center space-y-3 mb-6">
                <h1 className="font-bold text-6xl text-medical-dark/90">File Upload</h1>
                <h2>Upload your files here!</h2>
            </div>
            <Form onSubmit={handleSubmit} inputRef={ref} />
            <div className="flex flex-col items-center justify-center">
                {loading !== null && <ProgressSpinner text={loading ? "Processing Image" : "Processed Image"} isLoading={loading} className="pb-4" />}
                <UploadResult error={error} text={data} display={data["Content"] !== ""} />
            </div>
        </div>

    )
}

export default AddPage
