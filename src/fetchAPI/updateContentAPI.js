export default function updateAPI(player){
    return new Promise((resolve,reject)=>{
        const url ='https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs/'+player.id;
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
