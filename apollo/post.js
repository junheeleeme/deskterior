import { gql } from 'apollo-boost'
import { client } from './apollo'

export const getPost = async(id) => {

    const _query = gql`
    query getPost {
        posts(where: {id: ${Number(id)}}) {
            nodes {
                title
                postId
                featuredImage {
                    node {
                    altText
                    mediaItemUrl
                }
            }
            price {
                price
            }
            rocket_delivery {
                rocketDelivery
            }
            sale_price {
                salePrice
            }
            content
            model_no {
                modelNo
            }
            buylink {
                buyLink
            }
            tags {
                nodes {
                    name
                }
            }
            
            }
        }
    }
    `
    try{
        const getData = await client.query({ query : _query });
        const posts = getData.data.posts.nodes[0];
        return posts;
    }catch(err){
        console.log(err);
        return null;
    };
    
}

export default getPost