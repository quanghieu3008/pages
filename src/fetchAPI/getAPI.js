export default function callApiGet(){
    return new Promise((resolve,reject)=>{
        const url='http://localhost:3001/items'
        fetch(url,{
            method:'GET'
        })
        .then((response)=>response.json())
        .then((res)=>{
            console.log(res,"hey::::::::::::::::::");
            resolve(res)
            console.log(res);
        })
        .catch((error)=>{
            reject(error)
        })
    })
}