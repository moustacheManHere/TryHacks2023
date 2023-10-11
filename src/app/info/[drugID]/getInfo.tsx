interface ServerResponse {
  summary: string;
  background: string;
  genName: string;
  foodInt: string;
}

async function getInfo(id:string|string[]|undefined):Promise<void|ServerResponse | undefined> {
    console.log(id)
  const info:void|ServerResponse|undefined = (await fetch(`https://mediassistapi.onrender.com/details/${id}`)
                        .then(res => {
                          
                            return res.json()
                          
                        }).then(
                            res => {
                                console.log(res);
                                return  (res)}
                        ))
  return info
}

export default async function Page(props:any) {

  const id = props.id;
  const info:void|ServerResponse | undefined = await getInfo(id.params.drugID)
  return (
    <div>
      {info === undefined || info === null ? 
        <>Oops that product does not exist bitch</> 
        : <>
            <h1>Name: {info.genName}</h1>
            <h1>Summary: {info.summary}</h1>
            <h1>Background: {info.background}</h1>
            <h1>Food Interactions: {info.foodInt}</h1>
        </>
        }

    </div>
  )
}
