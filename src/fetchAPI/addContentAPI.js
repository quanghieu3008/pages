export default function addContentAPI(data) {
    const { page, search, limit } = data
    return new Promise((resolve, reject) => {
        const url = `https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs?search=${search}&page=${page}&limit=${limit}`;
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

// 'https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs'