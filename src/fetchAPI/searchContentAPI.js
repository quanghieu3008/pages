export default function searchContentAPI(text) {
    return new Promise((resolve, reject) => {
        const url = `http://localhost:3001/information?q=${text}`
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
