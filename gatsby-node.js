const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
    console.log("run");
    const { createNodeField } = actions
    if (node.internal.type === `MarkdownRemark`) {
        const slug = createFilePath({ node, getNode, basePath: `pages` })
        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })
    }
}


// exports.createPages = async function ({ actions, graphql }) {
//     console.log("chạy");
//     const { data } = await graphql(`
//       query {
//         allMarkdownRemark {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//             }
//           }
//         }
//       }
//     `)
//     data.allMarkdownRemark.edges.forEach(edge => {
//       const slug = edge.node.fields.slug
//       actions.createPage({
//         path: slug,
//         component: require.resolve(`./src/pages/blog.js`),
//         context: { slug: slug },
//       })
//     })
//   }