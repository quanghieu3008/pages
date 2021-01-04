export default function deleteContentAPI(id){
return new Promise((resolve,reject)=>{
       const url ='http://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs/'+id ;
        fetch(url,{
            method:'DELETE',
       })
        .then((response)=> response.json())
        .then((res) =>{
            resolve(res);
        })
        .catch((error)=> {
            reject(error);
        });
    });
}
