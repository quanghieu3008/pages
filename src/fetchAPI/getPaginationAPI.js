export default function callApiGetPagination(activePage){
    return new Promise((resolve,reject)=>{
        const url=`https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs?page=${activePage}&limit=3`
        fetch(url,{
            method:'GET'
        })
        .then((response)=>response.json())
        .then((res)=>{
            resolve(res)
            console.log(res,"data okeeeeeeeeeeeeee");
        })
        .catch((error)=>{
            reject(error)
        })
    })
}