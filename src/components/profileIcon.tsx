"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import ButtonIcon from "@/components/buttonIcon"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useState } from "react"

const ProfileIcon = () => {

    const [open, setOpen] = useState<boolean>(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Avatar className="border-2 border-medical rounded-xl">
                    <AvatarImage src="https://media.licdn.com/dms/image/D5635AQG2ElrJynNjJw/profile-framedphoto-shrink_800_800/0/1687774125174?e=1697511600&v=beta&t=z6c86pRnAB2JUZ2jSJAitJg6FCBhC90_UlDaUb2ZVn4" alt="@MoustacheMan" />
                    <AvatarFallback>RAM</AvatarFallback>
                </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Profile</h4>
                        <p className="text-sm text-muted-foreground">
                            Set the dimensions for the layer.
                        </p>
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center gap-4 space-x-4 align-items">
                            <h2 className="font-semibold">Username</h2>
                            <p id="width">Moustache Man</p>
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxWidth">Max. width</Label>
                            <Input
                                id="maxWidth"
                                defaultValue="300px"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="height">Height</Label>
                            <Input
                                id="height"
                                defaultValue="25px"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <Label htmlFor="maxHeight">Max. height</Label>
                            <Input
                                id="maxHeight"
                                defaultValue="none"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <ButtonIcon className="justify-self-end" text="View Profile" onClick={e => setOpen(!open)} />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default ProfileIcon