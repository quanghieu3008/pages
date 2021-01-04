export default function callApiGet(){
    return new Promise((resolve,reject)=>{
        const url='http://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs'
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