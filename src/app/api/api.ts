import PocketBase from 'pocketbase';

const pb = new PocketBase('https://mediassistdb.hop.sh');

export const getDrugPID = async (drugID: string) => {
    const record = await pb.collection('drugs').getFirstListItem(`drugID="${drugID}"`);
    return record
}

export const getUserPID = async (custID: string) => {
    const record = await pb.collection('customer').getFirstListItem(`custID="${custID}"`, {
        expand: 'id'
    });
    return record
}

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

    const record = await pb.collection('custDrugs').create(data);
}

export const getCustDrugs = async (custID: string, drugID: string) => {
    const record = await pb.collection('custDrugs').getFirstListItem(`custID="${custID}" && drugID="${drugID}"`);
    return record
}

export const getAllDrugs = async (custID: string) => {
    const records = await pb.collection('custDrugs').getFullList({
        filter: `custID="${custID}"`,
        expand: 'drugID',
        sort: 'drugID'
    });

    if (records.length === 0 || records === undefined) {
        throw new Error("No drugs found");
    }

    return records
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

export const prettifyText = (text: string) => {
    if (!text) {
        return text;
    }
    text = text.replace(/\.\d+/g, '.');
    text = text.replace(/\d+(?=,)/g, '');
    text = text.replace(/\,+(?=,)/g, '');
    text = text.replace(/,\d+\./g, '.');
    text = text.replace(/([A-Z])(\d+)([a-z])/g, '\$1\$2 \$3');
    text = text.replace(/(\d+)([a-zA-Z])/g, ' \$2');
    text = text.replace(/([a-z])(\d+)/g, '\$1');

    // Adds space before every uppercase character and trim off the leading and trailing spaces
    text = text.replace(/([A-Z]+)/g, ' $1').trim();

    return text;
}
