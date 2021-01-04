export default function updateUserAPI(player){
    console.log(player,"passsssssssssssssssssssss");
    return new Promise((resolve,reject)=>{
        const url ='http://localhost:3001/item/'+player.id;
        fetch(url,{
            method:'PUT',
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(player)
        })
        .then((response)=>response.json())
        .then((res)=>{
            resolve(res);
        })
        .catch((error)=>{
            reject(error);
        });
    })
}
