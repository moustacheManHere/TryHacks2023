"use server"
import { currentUser } from '@clerk/nextjs';
import { User } from '@clerk/nextjs/server';
import { getAllDrugs, prettifyText } from '../api/api';

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
    uid:string;
    drugID: string;
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
    var uid:ApiResponse|null = (await fetch(`https://mediassistdb.hop.sh/api/collections/customer/records?filter=(custID="${id}")`).then(res => {return res.json()}))
    if (uid === null){
        return 0
    }
    var userUniqueID = uid.items[0].id
    // var nextres:NextApiResponse|null = (await fetch(`https://mediassistdb.hop.sh/api/collections/custDrugs/records?filter=(custID="${userUniqueID}")&expand=drugID`).then(res => {return res.json()}))

    let res;
    try {
        res = await getAllDrugs(userUniqueID);
    } catch (err) {
        return 0;
    }
    
    if (res === null || res === undefined){
        return 0
    }
    var drugs:drugList[] = []
    for (var i=0; i<res.length;i++)  {
        const drugItem = res[i].expand
        let obj = {
            "uid": "",
            "drugID": "",
            "name" : "",
            "description" : ""
        }
        if (drugItem) {
            const name = prettifyText(drugItem.drugID.name);
            const summary = prettifyText(drugItem.drugID.summary);
            obj = {
                "uid": drugItem.drugID.id,
                "drugID": drugItem.drugID.drugID,
                "name" : name,
                "description" : summary
            }
        }
        drugs.push(obj)
    }
    return drugs
    
}

export default GetUser