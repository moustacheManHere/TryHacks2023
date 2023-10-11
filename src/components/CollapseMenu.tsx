"use client";
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Food } from "@/components/SVGIcon"
import {
    Alert,
    AlertDescription,
    AlertTitle,
} from "@/components/ui/alert"
import { prettifyText } from "@/app/api/api";
import { DownIcon } from "@/components/SVGIcon"

const CollapseMenu = ({ items }: { items: string }) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <Collapsible
            open={isOpen}
            onOpenChange={setIsOpen}
            className="w-1/3 space-y-2 p-3"
        >
            <div className="flex items-center space-x-4 px-4">
                <h4 className="text-sm font-semibold">
                    {items.split("\n").length} Interactions With Food
                </h4>
                <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                        <DownIcon />
                        <span className="sr-only">Toggle</span>
                    </Button>
                </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="space-y-2">
                {items.split("\n").map((item: string, index: number) => (
                    <div className="w-full">
                        <Alert>
                            <div className="flex justify-between items-center">
                                <div className='flex'>
                                    <div className="flex flex-col justify-center p-3">
                                        <Food />
                                    </div>
                                    <div>
                                        <AlertTitle>Food Interactions {index+1}</AlertTitle>
                                        <AlertDescription>
                                            {prettifyText(item)}
                                        </AlertDescription>
                                    </div>
                                </div>
                            </div>
                        </Alert>
                    </div>
                ))}
            </CollapsibleContent>
        </Collapsible>
    )
}

export default CollapseMenu