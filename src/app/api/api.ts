import PocketBase from 'pocketbase';

const pb = new PocketBase('https://mediassistdb.hop.sh');

export const insertDrugs = async (drugID: string, name: string, summary: string) => {
    const data = {
        "drugID": drugID,
        "name": name,
        "summary": summary
    };

    const record = await pb.collection('drugs').create(data);
}

export const insertCustDrugs = async (custID: string, drugID: string) => {
    const data = {
        "custID": custID,
        "drugID": drugID
    };

    const record = await pb.collection('custdrugs').create(data);
}

export const getDrugDetails = async (drugID: string) => {
    const endpoint = "https://new-flask-app.hop.sh/details";
    const id = drugID;

    // Call API
    const res = await fetch(`${endpoint}/${id}`, {
        method: "GET",
    });

    const response: {
        background: string,
        foodInt: string,
        genName: string,
        summary: string
    } | number = await res.json();

    if (typeof response === "number") {
        throw new Error("No drug found");
    } else {
        return response;
    }
}