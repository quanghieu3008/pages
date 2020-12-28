export default function updateAPI(player) {
    console.log(player,"test aPIIIIIIIIIIIIIIIII");
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/items/' + player.id;
        fetch(url, {
            method: 'PUT',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(player)
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

// export default function updateAPI(data){
//     // console.log(' dvcdcdcdcd.....',ace);
    
//     return new Promise((resolve,reject)=>{
        
//         const url ='http://localhost:3001/items';
//         fetch(url,{
//             method:'POST',
//             headers: {"Content-type":"application/json"},
//             body: JSON.stringify(data)

//         })
//         .then((response)=> response.json())
//         .then((res) =>{
//             resolve(res);
//         })
//         .catch((error)=> {
//             reject(error);
//         });
//     })
// }