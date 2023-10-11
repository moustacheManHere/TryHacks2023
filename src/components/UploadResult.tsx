import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"

import { Tick, Cross } from "@/components/SVGIcon"

type UploadProps = {
    error: boolean,
    text: {"Header"?:string, "Content"?:string},
    display: boolean,
    className?: string
}

const UploadResult = ({ error, text, display, className }: UploadProps) => {
    return (
        <div className={`${display ? "visible" : "hidden"}`}>
            <Alert>
                <div className={`flex ${className}`}>
                    <div className="flex flex-col justify-center p-3">
                        {error ? <Cross /> : <Tick />}
                    </div>
        
                    <div>
                        <AlertTitle>{text.Header}</AlertTitle>
                        <AlertDescription>
                            {text.Content}
                        </AlertDescription>
                    </div>
                </div>
            </Alert>
        </div>
    )
}

export default UploadResult