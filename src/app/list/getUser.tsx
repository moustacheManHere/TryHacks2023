"use server"
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';

interface ApiResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: Item[];
}

interface NextApiResponse {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    items: ExpandedItem[];
}

interface Item {
    collectionId: string;
    collectionName: string;
    created: string;
    custID: string;
    email: string;
    id: string;
    updated: string; 
}

interface ExpandedItem {
    collectionId: string;
    collectionName: string;
    created: string; // You might want to use a Date type if you parse this string into a Date object
    custID: string;
    drugID: string;
    expand: {
        drugID: DrugInfo;
    };
    id: string;
    updated: string; // You might want to use a Date type if you parse this string into a Date object
}

interface drugList {
    id:string;
    name: string;
    description: string;
}

interface DrugInfo {
    collectionId: string;
    collectionName: string;
    created: string; 
    drugID: string;
    id: string;
    name: string;
    summary: string;
    updated: string; 
}

async function GetUser() {
    const user:User|null = await currentUser();
    if (user == null){
        return null
    }
    var id:string = user.id
    var res:ApiResponse|null = (await fetch(`https://mediassistdb.hop.sh/api/api/collections/customer/records?(custID="${id}")`).then(res => {return res.json()}))
    if (res == null){
        return 0
    }
    var userUniqueID = res.items[0].id
    var nextres:NextApiResponse|null = (await fetch(`https://mediassistdb.hop.sh/api/collections/custDrugs/records?filter=(custID=${userUniqueID})&expand=drugID`).then(res => {return res.json()}))
    if (nextres == null || nextres == undefined){
        return 0
    }
    var drugs:drugList[] = []
    for (var i=0; i<res.items.length;i++){
        var obj = {
            "id": nextres.items[i].expand.drugID.id,
            "name" : nextres.items[i].expand.drugID.name,
            "description" : nextres.items[i].expand.drugID.summary
        }
    }
    return drugs
}

export default GetUser