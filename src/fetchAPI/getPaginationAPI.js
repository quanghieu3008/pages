export default function callApiGetPagination(activePage) {
    const { page, search, limit } = activePage
    return new Promise((resolve, reject) => {
        const url = `https://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs?search=${search}&page=${page}&limit=${limit}`
        fetch(url, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((res) => {
                resolve(res)
                console.log(res, "data okeeeeeeeeeeeeee",activePage);
            })
            .catch((error) => {
                reject(error)
            })
    })
}