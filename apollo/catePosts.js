import { gql } from 'apollo-boost'
import { client } from './apollo'

export const getPosts = async(slug) => {

    const _query = gql`
    query getPosts {
        posts(first:100 where: {categoryName: "${slug.toString()}"}) {
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
                slug
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
        const posts = getData.data.posts.nodes;
        return posts;
    }catch(err){
        console.log(err);
        return null;
    };
    
}

export default getPosts