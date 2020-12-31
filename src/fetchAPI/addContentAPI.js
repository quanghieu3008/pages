export default function addContentAPI(data) {
    return new Promise((resolve, reject) => {
        const url = 'http://localhost:3001/information';
        fetch(url, {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        })
            .then((response) => {
                response.json()
            })
            .then((res) => {
                resolve(res);
            })
            .catch((error) => {
                reject(error);
            });
    })
}
