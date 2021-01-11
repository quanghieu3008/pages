export default function callApiGet(search){
    return new Promise((resolve,reject)=>{
        const url=`https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs?search=${search}`
        fetch(url,{
            method:'GET'
        })
        .then((response)=>response.json())
        .then((res)=>{
            resolve(res)
            console.log(res);
        })
        .catch((error)=>{
            reject(error)
        })
    })
}
// 'https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs'