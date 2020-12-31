export default function deleteContentAPI(id){
return new Promise((resolve,reject)=>{
       const url ='http://localhost:3001/information/'+id ;
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
