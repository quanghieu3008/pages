export default function searchContentAPI(text) {
    return new Promise((resolve, reject) => {
        const url = `http://5ff2c99828c3980017b189ba.mockapi.io/localhost3001/item/blogs?search=${text}`
        fetch(url, {
          method: "GET"
        })
          .then((response) => response.json())
          .then((res) => {
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
}
