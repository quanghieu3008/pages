import React, { useEffect, useState } from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import "../style/blog.css"
import callApiGet from '../fetchAPI/getAPI'
const handleClick = (datta) => {
  callApiGet(datta)
}
// const [data,setData]=useState([])
// const IndexPage = () => (

  

// useEffect(()=>{
//   data=callApiGet()
// }),
//   <Layout>
//     <SEO title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
//       <Image />
//     </div>
//     <Link to="/page-2/">Go to page 2</Link> <br />
//     <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
//     <div></div>
//     <Link to="/blog/">Go to "Using TypeScript"</Link>
//     <button onClick={handleClick} >onClick</button>
//   </Layout>
// )

// export default IndexPage
// useEffect(() => {
//   const fetchData = async () => {
//     const result = await axios(
//       'https://hn.algolia.com/api/v1/search?query=redux',
//     );
//     setData(result.data);
//   };
//   fetchData();
// }, []);
const IndexPage = () => {
//   const [users, setUsers] = useState([]);
//   useEffect(() => {
//     callApiGet()
//     .then(x => setUsers(x));
// }, []);
// console.log(users,"âsasasasasasasas");
  return (
   <Layout>
    <SEO title="Home" />
    <h1>Hi people</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link> <br />
    <Link to="/using-typescript/">Go to "Using TypeScript"</Link>
    <div></div>
    <Link to="/blog/">Go to "Using TypeScript"</Link>
    <button onClick={handleClick} >onClick</button>
  </Layout>
  );
};
 export default IndexPage