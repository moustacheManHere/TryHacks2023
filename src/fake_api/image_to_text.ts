export default function (file : File) {
    return new Promise<object>((resolve, reject) => {
        setTimeout(() => {
            resolve({'DrugName': 'Viagra', 'Dosage':'100mg', 'Food Interactions':'Take with or without food. If taken with a high-fat meal the medicine may take a little longer to start working.'})
        }, 1500)
    })
}
