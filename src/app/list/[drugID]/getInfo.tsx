interface ServerResponse {
    summary: string;
    background: string;
    genName: string;
    foodInt: string;
}

import { prettifyText } from "@/app/api/api";
import { Separator } from "@/components/ui/separator";
import CollapseMenu from "@/components/CollapseMenu";
import AnimatedText from "@/components/AnimatedText";
import MutedText from "@/components/MutedText";

async function getInfo(id: string | string[] | undefined): Promise<void | ServerResponse | undefined | number> {
    const info: void | ServerResponse | undefined = (await fetch(`https://mediassistapi.onrender.com/details/${id}`)
        .then(res => {

            return res.json()

        }).then(
            res => {
                return (res)
            }
        ))
    return info
}

export default async function Page(props: any) {

    const id = props.id;
    const info: void | ServerResponse | undefined | number = await getInfo(id.params.drugID);

    return (
        <div>
            {info === undefined || info === null || typeof info === "number" ?
                <div className="flex justify-center p-5">Oops that product does not exist!</div>
                :
                <div className="p-24 pt-16 h-full w-full">
                    <AnimatedText text={prettifyText(info.genName)} highlight={[prettifyText(info.genName).split(' ')[0]]} className="underline" />
                    <MutedText text={prettifyText(info.summary)} className="text-[#5d5d5d] font-medium" />
                    <Separator />
                    <div className="p-7">
                        <h1 className="font-bold underline text-2xl pb-2 text-medical-dark/90">Background</h1>
                        <h2>{prettifyText(info.background)}</h2>
                    </div>
                    <CollapseMenu items={info.foodInt} />
                </div>
            }
        </div>
    )
}
