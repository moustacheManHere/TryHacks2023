import { ChevronRightIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type buttonIconProps  = {
    text: string;
    onClick: React.MouseEventHandler<HTMLElement> | undefined;
    className?: string;
}

const ButtonIcon = ({text, onClick, className}: buttonIconProps) => {
    return (
        <Link href="/profile">
            <div className="flex justify-end">
                <Button variant="outline" className={`w-32 ${className}`} size="icon" onClick={onClick}>
                    <div className="flex items-center space-x-2">
                        <ChevronRightIcon className="h-4 w-4" />
                        {text}
                    </div>
                </Button>
            </div>
        </Link>
    )
}

export default ButtonIcon